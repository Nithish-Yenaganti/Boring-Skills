---
name: job-search
description: >
  Use this skill whenever a user wants to search for jobs, internships, or career opportunities.
  Trigger when the user mentions: finding a job, job search, looking for work, internship hunt,
  career opportunities, job listings, hiring, roles available, post-grad jobs, remote jobs,
  contract work, or anything related to finding employment. Always use this skill even if the
  user gives only a job title or partial info — gather the rest through questions.
---

# Job Search Skill

Help users find **real, currently active** job listings tailored to their role, experience, and preferences. Never fabricate listings. Never return stale or unverified results.

---

## Step 1: Gather Job Search Criteria

Before searching, collect these details interactively. Ask only what you don't already have:

| Field | What to ask |
|-------|-------------|
| **Job Role / Title** | What role or title are they targeting? (e.g. "Software Engineer", "Product Designer") |
| **Job Type** | Full-time, Part-time, Contract/Freelance, Internship, Post-grad, Remote, On-site, Hybrid |
| **Years of Experience** | Entry-level (0–2 yrs), Mid-level (3–5 yrs), Senior (6+ yrs), Student/Internship |
| **Location** | City, state, country — or "Remote" |
| **Industry** (optional) | e.g. Tech, Finance, Healthcare, Startups |
| **Resume** (optional) | Ask: *"You can paste your resume or a summary for more tailored results (optional)."* |

If the user provides a resume or resume summary, extract:
- Key skills and technologies
- Past job titles and seniority level
- Education level (relevant for internships/post-grad)
- Industries worked in

Use extracted resume data to **refine search queries** and **filter relevance** of results.

---

## Step 2: Get the Current Date and Time

Before searching, always retrieve the current date and time (with seconds) to:
1. Anchor the search to today's date
2. Filter out stale postings
3. Note the search timestamp in your response

Use this format in your response:
> 🕐 Search performed: **[Weekday, Month DD, YYYY at HH:MM:SS TZ]**

---

## Step 3: Search for Jobs

> ⚠️ **Critical**: Search results and snippets alone are NOT sufficient. You must call `web_fetch` on every candidate URL to confirm the job is still live before including it. See Verification Rules below.

### Sources to Search (in priority order)
1. **LinkedIn Jobs** — `site:linkedin.com/jobs`
2. **Indeed** — `site:indeed.com`
3. **Glassdoor** — `site:glassdoor.com/job-listing`
4. **Greenhouse** — `site:job-boards.greenhouse.io` (use `job-boards.greenhouse.io`, NOT `boards.greenhouse.io`)
5. **Simplify** — `site:simplify.jobs` (good mirror for verifying Ashby/Greenhouse roles)
6. **Handshake** — ⚠️ Do NOT search or verify via web_fetch. Provide as a browse-yourself link only (requires user login)
7. **Company career pages** — Direct searches like `[Company] careers [role]`

> ⚠️ **Do NOT use `site:jobs.ashbyhq.com` as a primary search source.** Ashby requires JavaScript and cannot be verified via web_fetch. See platform rules below.

### Search Query Strategy

Run **multiple targeted searches** using combinations like:
```
"[Job Title]" "[Job Type]" site:linkedin.com/jobs [Location] 2025 OR 2026
"[Job Title]" "[Experience Level]" site:job-boards.greenhouse.io
"[Job Title]" internship site:joinhandshake.com [Year]
"[Job Title]" "[Location]" site:simplify.jobs
```

If resume data is available, add **key skills** to queries:
```
"[Job Title]" "[Skill1]" "[Skill2]" site:indeed.com [Location]
```

---

### Verification Rules — STRICT (Mandatory web_fetch step)

For **every** result from search before returning it to the user, you MUST:

1. **Call `web_fetch` on each URL** — fetch the actual page and read the response.
2. **Confirm all three of the following are true** before keeping a listing:
   - ✅ The specific **job title** appears in the fetched page's `<h1>` or `<title>` tag
   - ✅ The word **"Apply"** appears on the page near the job title (not just anywhere)
   - ✅ The **job description body** is readable (not a generic company page or login wall)
   - If ANY of these three are missing or uncertain → **discard immediately**
3. **Confirm the posting date** — only keep jobs posted within the last **60 days** (30 days preferred). If no date is visible, use your best judgment; if uncertain, discard.

---

### Platform-Specific Verification Rules

#### Greenhouse (`job-boards.greenhouse.io`)
- ✅ Use `job-boards.greenhouse.io` URLs (not `boards.greenhouse.io` — those are embeds that block fetching)
- ❌ **A redirect to `job-boards.greenhouse.io/company?error=true` means the job is CLOSED** — discard immediately, even if the page shows other open jobs
- ❌ A page that loads but shows the company's full job list (not the specific role) = job is closed, discard
- ✅ Only keep if the fetched page title is exactly "Job Application for [Role] at [Company]" and Apply button is present

#### Ashby (`jobs.ashbyhq.com`)
- ❌ **Never verify Ashby links via web_fetch** — Ashby requires JavaScript and always returns a shell page saying "You need to enable JavaScript", which is unverifiable
- ❌ **Never include an Ashby link as a primary result** based on web_fetch alone
- ✅ Only include an Ashby role if a **third-party mirror** (Simplify.jobs, LinkedIn, Indeed) independently confirms the role is live with a fetch date within 7 days
- ✅ When including an Ashby role, link to the mirror confirmation page, not the Ashby URL directly, OR warn the user explicitly that the link requires manual browser verification

#### LinkedIn (`linkedin.com/jobs`)
- ❌ LinkedIn requires login — web_fetch will hit a wall or get limited content
- ✅ Use LinkedIn search snippets as **secondary confirmation only**, never as primary verification
- ✅ Provide LinkedIn search URLs (not individual job URLs) so the user can browse themselves

#### Handshake (`joinhandshake.com`)
- ❌ **Never verify Handshake links via web_fetch** — Handshake requires login and returns a login wall or stripped page, making job status unverifiable
- ❌ **Never include a specific Handshake job URL** as a verified result
- ✅ Only use Handshake as a **browse-yourself link** in the Live Search Links section, so the user can search while logged into their own account
- ✅ Format: `https://joinhandshake.com/jobs/?job_type=INTERNSHIP&category=Software+Engineering`

#### Simplify (`simplify.jobs`)
- ✅ Good mirror for Greenhouse and Ashby roles — often shows if a role is active
- ✅ Can be used as secondary confirmation for Ashby links
- ⚠️ Check the "Posted" date on Simplify — if older than 60 days, treat with caution

---

### Seasonal Logic for Internships

When searching for internships, apply these date-based rules:

| Internship Season | Discard After |
|------------------|--------------|
| Summer (May–Aug) | June 1 of that year |
| Fall (Sep–Dec)   | September 1 of that year |
| Winter/Spring (Jan–Apr) | January 1 of that year |

If today's date is past the discard threshold for a seasonal internship, skip it — even if the listing hasn't been removed.

---

### General Discard Rules

- ❌ **Never fabricate** a job listing, company, or URL
- ❌ **Never return** articles, blog posts, aggregator summaries, or "top companies hiring" listicles
- ❌ **Never include a listing you did not web_fetch** — search snippets alone are not enough
- ❌ **Never include a listing where fetch returned a generic company page, error page, or JS-only shell**
- ❌ **Never include a role that requires 3+ years of experience** when user asked for entry-level/internship
- ⚠️ If a link cannot be fully verified, **skip it silently** — do not show it with a caveat

**After web_fetch filtering**, if fewer than 3 listings survive:
- Run additional searches to find more candidates, then verify those too
- Only stop when you have at least 3 verified listings OR you have exhausted reasonable search queries
- If you truly cannot find 3 verified listings, say so honestly and provide live search links the user can browse themselves

---

## Step 4: Format and Return Results

Return results in this format:

---

### 🔍 Job Search Results
🕐 Search performed: **[Date and Time with seconds]**
📋 Showing **[N] verified active listings** for: *[Role]* | *[Job Type]* | *[Location]*

---

**1. [Job Title] — [Company Name]**
- 📍 Location: [City, State / Remote]
- 🕐 Posted: [Date or "X days ago"]
- 💼 Type: [Full-time / Part-time / Contract / Internship]
- 🔗 Apply: [Direct link to job posting]
- 📝 Match notes: *(if resume provided)* Why this fits — e.g. "Matches your Python + ML background"

---

*(repeat for each listing)*

---

### ⚠️ Important Notes
- All listings verified as of [timestamp]
- Job availability can change — always confirm the Apply button is visible before spending time on an application
- [Any caveats about limited results for the query]

---

### 🔎 Live Search Links
Always provide 2–3 live search URLs the user can click to browse current listings themselves:
- LinkedIn: `https://www.linkedin.com/jobs/search/?keywords=[role]&location=[city]&f_JT=I&f_E=1&sortBy=DD`
- GitHub tracker (updated daily): `https://github.com/speedyapply/2026-SWE-College-Jobs/blob/main/INTERN_USA.md`
- Indeed: `https://www.indeed.com/jobs?q=[role]+intern&l=[city]`

---

## Step 5: Offer Follow-Up

After returning results, offer:
- 🔄 "Search more boards or narrow by a specific company?"
- 📄 "Want me to tailor your resume to any of these listings?"
- 🔔 "Want tips on how to apply for any of these roles?"

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| No verified results found | Say so clearly; provide live search links; suggest broadening role title, location, or job type |
| Resume provided but no strong match | Note the gap; still return best-available listings |
| Internship + location = very limited | Provide Handshake browse link (user must be logged in); provide Indeed/LinkedIn live search links; mention it's competitive |
| Post-grad roles | Prioritize Handshake, LinkedIn early-career filters, and new-grad programs |
| User only gives a vague query ("find me a job") | Ask for role, type, and location before searching |
| Conflicting signals (e.g. "remote" + "NYC only") | Clarify before searching |
| Ashby links can't be verified | Use Simplify.jobs mirror or warn user to manually check in browser |
| Greenhouse redirect to ?error=true | Job is closed — discard, do not show user |
| Summer internship searched after June 1 | Focus on Fall cycle roles instead; tell user why |
