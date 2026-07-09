---
name: job-search-browser
description: Use this skill when the user wants to find jobs, internships, new-grad roles, contract roles, remote roles, or company career opportunities using a live browser session, especially when listings must be verified directly on Ashby, Greenhouse, Lever, LinkedIn, or company career pages.
---

# Job Search Browser

Use this skill to find real, current job listings by browsing live pages instead of relying on stale search snippets or memory.

## Core Requirements

- Search live sources for current listings; do not rely on memory for job availability.
- Never fabricate a company, title, URL, posting date, salary, location, or open status.
- Prefer direct company career pages and applicant tracking systems over aggregators.
- Include only listings that were opened and verified during the current session.
- Respect login, CAPTCHA, bot-check, and paywall limits; do not bypass access controls.
- Keep resume and profile details private; use them only for search targeting and brief match notes.

## Workflow

1. Look for a resume in the current project directory up to three levels deep using filenames containing `resume` or `cv` with common extensions such as `.pdf`, `.docx`, `.md`, or `.txt`.
2. If one resume is found, read it and extract target roles, seniority, skills, tools, experience, education signals, and industry context.
3. If multiple resumes are found, ask which one to use. If none are found, ask for a path or pasted summary, but allow the user to proceed without one.
4. Gather only missing search criteria that materially affect results: role, location or remote preference, job type, companies to prioritize, and constraints to avoid.
5. Get the current date and time before searching and include it in the final report.
6. Use an available browser tool to search live job sources and open candidate listings.
7. Verify each returned listing by opening the specific job page and checking that it is live, relevant, and has an active apply flow or clear application instructions.
8. Return verified results with source links, match notes, and limitations.

## Browser Sources

Prioritize these sources:

- Ashby: `jobs.ashbyhq.com`
- Greenhouse: `job-boards.greenhouse.io`
- Lever: `jobs.lever.co`
- LinkedIn Jobs when the user has access or public pages are sufficient
- Company career pages and applicant tracking systems such as Workday, SmartRecruiters, and iCIMS

For named companies, start with their direct careers pages or known ATS boards. For broad searches, use targeted searches that combine role, location, job type, seniority, and two or three relevant skills.

## Verification Checklist

For every listing returned, confirm:

- The page opened to a specific job posting, not a generic careers page or search result.
- The company name, role title, and location match the page.
- The posting appears open and has an apply button, application form, or current application instructions.
- The posting date or recency is captured when visible.
- The direct URL points to the job posting itself.

Skip expired pages, duplicate reposts, listicles, generic search pages, inaccessible pages, and any result that cannot be verified in the browser.

## Output Format

Include:

- Search timestamp.
- Search criteria used.
- Resume source used, or `not provided`.
- Number of verified listings returned.
- For each listing: title, company, location, source, posted date if visible, direct apply URL, and concise match notes.
- Caveats for login-limited sites, CAPTCHA, sparse results, unavailable dates, or broadened criteria.

After the results, offer a useful next step such as checking specific companies, broadening the search, ranking listings, tailoring a resume, or drafting an application note.

## Edge Cases

- If no verified listings are found, say so plainly, broaden once if reasonable, and report the search limits.
- If LinkedIn requires login and the user is not logged in, use public sources and note the limitation.
- If a CAPTCHA or bot-check appears, stop on that site and ask the user to handle it manually.
- If criteria conflict, clarify before searching.
