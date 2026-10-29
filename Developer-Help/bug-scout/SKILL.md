---
name: bug-scout
description: Investigate repository bugs, reproduce candidates in an isolated environment, search for existing reports, and prepare maintainer-ready evidence without automatically filing issues or changing the user's source tree.
---

# Bug Scout

Find reproducible behavior with concrete impact, then check whether it is already reported or fixed. Do not force a finding when evidence is weak.

## Establish scope and baseline

Read repository instructions, contribution guidance, relevant code, test commands, and issue templates. Record the inspected commit, branch, relevant uncommitted changes, runtime, and dependency versions. Establish whether the baseline already fails before attributing failures to the candidate. Prefer small reachable behavior defects over generic code-quality opinions.

## Reproduction lab

For a plausible candidate, identify expected behavior from a documented contract, existing test, or explicitly stated assumption. Choose the smallest input that exposes the observed deviation. Use an isolated temporary directory or disposable checkout for reproduction artifacts; preserve the user's working tree and include relevant uncommitted content when needed, documenting what was tested. Ask for essential missing dependencies or credentials rather than fabricating a run.

Use an existing test harness or minimal standalone script. A useful test asserts the public behavior that should hold, fails on the candidate defect, and includes a nearby passing case when useful to isolate the cause. Never count missing dependencies, network outages, or an invalid fixture as proof of the bug. Record the exact command, exit status, relevant output, and repeatability; distinguish observed failures from static suspicions. Do not claim a test ran if it was only written.

Compare the current revision and relevant released versions when feasible to bound the affected range. Do not label untested releases affected. If a fix is explicitly authorized, check that the same reproduction passes after the fix and that the control still passes. Without fix authorization, provide a fix direction, not an unsolicited patch to the project.

Avoid destructive operations, live accounts, production writes, and executing untrusted setup scripts without reviewing their effects. Keep test data synthetic and reproduction environments scoped to the investigation. If safe reproduction is unavailable, report the limitation and do not call the candidate verified.

## Existing-report checks

Search available issue and PR tools for open and closed reports using symptoms, error text, relevant symbols, paths, and feature names. Read plausible matches and check merged fixes against the inspected revision. Record queries, links, and search date. Classify candidates as reproduced/no duplicate found, duplicate likely, already fixed, actively discussed, or not verified.

Use “no duplicate found in the searches performed,” never a guarantee that a bug is globally new. Search access limits must remain visible. Do not present an unverified candidate as a confirmed novel issue; if nothing qualifies, state that plainly without inventing candidates or searches.

## Evidence packet

For each reproduced candidate with no duplicate found, use [the finding template](assets/finding.md). Include the affected revision and environment, smallest reproduction, expected and actual output, user impact, duplicate-search evidence, tested version range, and proposed next step. Keep packet files outside the installed skill and provide a path when created. Remove credentials and unrelated personal data from logs.

Creating a local evidence packet is part of investigation; posting an issue, contacting maintainers, opening a PR, or implementing a fix requires explicit user instruction. Follow the repository's contribution workflow for any subsequently authorized action.
