---
name: bug-scout
description: Use this skill when the user wants to scan an open-source repository for a real bug, risk, or issue that is new and not already reported, discussed, fixed, or covered by an existing GitHub issue or pull request.
---

# Bug Scout

Use this skill to find credible, non-duplicate bugs or risks in open-source repositories.

The default job is discovery and verification, not implementation. Do not edit files, open issues, or open pull requests unless the user explicitly asks after reviewing the finding.

## Core Requirements

- Return only findings classified as `new and verified not duplicate`.
- Do not force a weak finding. If no new issue is found, say that clearly.
- A valid finding must have local technical evidence and GitHub duplicate verification.
- If GitHub issue or pull request search is unavailable, do not claim the finding is new. Mark it as `not verified`.
- Reject candidates that appear already reported, already fixed, actively discussed, or covered by an open or closed pull request.
- Prefer small, concrete, reproducible bugs over broad code quality opinions.

## Workflow

1. Inspect local repository context:
   - README and project documentation
   - CONTRIBUTING or maintainer guidance
   - package, build, dependency, and test configuration
   - CI configuration
   - issue and pull request templates
   - relevant source files and recent changes when available
2. Identify candidate bugs or risks using local evidence:
   - failing or suspicious behavior
   - fragile edge cases
   - missing validation
   - stale docs that cause incorrect usage
   - TODO/FIXME comments with real user impact
   - test gaps tied to likely breakage
   - suspicious logic, error handling, state handling, or dependency usage
3. For every candidate, search GitHub issues and pull requests before treating it as new.
4. Search duplicate signals:
   - affected file path
   - function, class, component, command, or option name
   - error text or log output
   - feature area
   - reproduction terms
   - dependency name
   - likely user-facing symptom
5. Check open and closed issues and pull requests.
6. Classify each candidate:
   - `new and verified not duplicate`
   - `duplicate likely`
   - `already fixed`
   - `actively discussed`
   - `not verified`
7. Return only `new and verified not duplicate` findings.
8. Ask before implementing any fix.

## Output Format

For each valid finding, include:

- Finding title
- Classification: `new and verified not duplicate`
- Evidence from local code, behavior, docs, or tests
- Why it is likely a real bug or risk
- Duplicate-check summary with searches performed and issues or pull requests checked
- Why existing issues or pull requests do not cover it
- Suggested reproduction or validation
- Proposed fix direction
- Recommendation: create an issue first or proceed to a pull request

If no valid finding remains after duplicate checks, say:

```text
No new verified issue found. I found candidates, but they were duplicates, already fixed, actively discussed, or not verifiable from available GitHub context.
```

## Safety Rules

- Do not edit files by default.
- Do not open GitHub issues or pull requests automatically.
- Do not claim novelty without searching existing issues and pull requests.
- Do not present guesses as confirmed bugs.
- Do not use vague phrasing such as "might be worth improving" as a finding.
- If the repo has contribution rules, follow them over this skill's defaults.
