---
name: job-search
description: Use this skill when the user wants help finding jobs, internships, new-grad roles, contract work, remote roles, or company career opportunities, including searching current listings, narrowing search criteria, comparing roles, or tailoring a search from a resume or target role.
---

# Job Search

Use this skill to find real, current job opportunities and present only listings that can be verified from live sources.

## Core Requirements

- Never fabricate a job title, company, location, posting date, salary, application link, or availability status.
- Search the web for current listings; do not rely on memory for job availability.
- Prefer direct employer or applicant tracking system postings over aggregators.
- Do not return a listing unless the page is reachable and appears open at the time of review.
- If posting date cannot be confirmed, either skip the listing or clearly label the date as unverified.
- Keep user privacy intact: do not expose resume text, contact details, or personal history beyond what is needed for match notes.

## Workflow

1. Gather the minimum search criteria: target role, location or remote preference, job type, experience level, and must-have constraints.
2. Ask concise follow-up questions only for missing criteria that materially change the search.
3. If the user provides a resume or profile summary, extract role titles, seniority, skills, industries, education signals, and constraints for search targeting.
4. Browse current job sources using targeted queries and direct job boards.
5. Open candidate listings and verify company, role title, location, application link, posting recency when available, and open status.
6. Return a concise list of verified opportunities with a search timestamp, source links, match notes, and caveats.

## Search Sources

Prefer sources in this order:

- Company career pages and applicant tracking systems such as Greenhouse, Lever, Ashby, Workday, and SmartRecruiters.
- LinkedIn Jobs, Indeed, Glassdoor, Wellfound, Handshake, and school career platforms when relevant.
- Specialized boards for the user's field, such as remote, startup, nonprofit, academic, design, data, or engineering boards.

Use multiple targeted searches that combine role title, seniority, location, remote preference, job type, and two or three relevant skills.

## Verification Checklist

For each returned listing, verify:

- The URL opens to a job-specific posting.
- The company name and job title match the page.
- The location or remote policy is visible or reasonably inferable from the posting.
- The posting is currently open, with an apply button or active application flow.
- The posting date or recency is captured when the source provides it.

Skip expired pages, listicles, duplicate reposts, vague aggregator summaries, and pages that require unsupported login access to verify basic details.

## Output Format

Include:

- Search timestamp and criteria used.
- Number of verified listings returned.
- For each listing: title, company, location, job type if available, posted date if available, direct apply link, and brief match notes.
- Caveats for unavailable posting dates, login-limited boards, sparse results, or broadened criteria.

After results, offer a useful next step such as narrowing the search, finding more listings, ranking roles, or tailoring a resume or cover letter to a selected posting.

## Edge Cases

- If no verified listings are found, say so and suggest specific ways to broaden the search.
- If the user gives only a vague request, ask for role, location, and job type before searching.
- If criteria conflict, clarify before searching.
- For internships and new-grad roles, prioritize Handshake, university career pages, early-career programs, and postings that explicitly mention student, intern, graduate, or entry-level eligibility.
