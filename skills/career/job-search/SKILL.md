---
name: job-search
description: Find and verify current job opportunities, match them to user-provided experience, and track new opportunities and application progress across searches when requested.
---

# Job Search

Return opportunities supported by live evidence and explain why they fit. Never invent a role, posting date, eligibility requirement, salary, or application status.

## Establish the search

Use the user's role, location or remote eligibility, experience, and job type. Ask only for missing constraints that materially change the search. Salary, work authorization, availability, and resume details are optional unless essential to the user's stated criteria; do not infer them. Use the current date and user's timezone when available, without requiring a particular clock tool or timestamp precision.

Extract skills and experience only from provided materials. Separate required qualifications, preferred qualifications, and unknowns; do not present an invented numerical fit score. Do not send private resume contents to search engines; use only necessary role and skill terms.

## Find and verify

Search with available connectors, web tools, or a browser; no particular tool name is required. Prefer employer career pages and their applicant tracking systems. Use aggregators to discover candidates, then seek a canonical employer listing. Render JavaScript-dependent pages with an available browser when needed; do not bypass login or access restrictions.

Before calling a listing verified, inspect the specific role, employer, readable description, and application route, and check for closed-role notices or redirects to a generic listing page. A search snippet, mirror, or visible Apply label alone does not prove the employer still accepts applications. If verification is blocked, exclude it from verified results and explain the coverage limitation; include unverified leads separately only if requested.

Record the source URL, verification date, observed availability, and posted date when present. Mark missing dates unknown; never substitute first-seen or verification time for the posted date. Respect explicit freshness filters, but do not reject an otherwise active role solely because its posting date is absent unless the user's filter requires it. Use stated application deadlines and start dates rather than universal seasonal cutoffs. Report remote geographic restrictions and required qualifications explicitly.

Deduplicate by employer requisition ID where available, then canonical URL, then employer/title/location. Different requisition IDs may be distinct jobs; retain ambiguity rather than merging solely by title. Mirrors of the same requisition should not count as additional matches.

## Track across searches

Use [the opportunity tracker](assets/opportunities.csv) when ongoing tracking is requested. Save it to a user-selected workspace location, never inside this installed skill. If no location is established, ask where to keep the tracker while continuing the current search. For Git workspaces, keep personal search and application records untracked unless the user intends to share them. Read the existing tracker before every update and preserve user notes and statuses.

Track stable identity, first-seen and last-verified dates, observed availability, application status, and resume-grounded match notes separately. Mark a listing new only if its identity was not present in the prior tracker; the first run establishes a baseline. Lack of search visibility does not mean closed. Mark closure only from evidence and keep the historical record.

Application states such as applied, interviewing, rejected, or offer come from the user's report or authorized evidence, never from an inference that a link was opened. Record the source of each status change. Do not apply, contact employers, or create background monitoring without the user's explicit instruction. If using CSV, use a CSV writer, preserve quoting and Unicode, and neutralize spreadsheet-formula prefixes in external text fields before spreadsheet export.

## Deliver a useful shortlist

Prioritize hard constraints, then source-backed relevant experience, rather than keyword counts. For each result include role/company, location and eligibility limits, direct application URL, posting date or unknown, verification time, and a short fit/gap explanation. When a tracker exists, distinguish new matches, previously seen matches, and verified closures.

If results are sparse, broaden only within the user's constraints or propose the smallest useful relaxation. Never pad the list with unverified jobs. Summarize what was checked and what remains unknown. Search runs occur on request; persistence does not imply background monitoring.
