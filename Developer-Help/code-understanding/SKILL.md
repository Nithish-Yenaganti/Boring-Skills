---
name: code-understanding
description: Explain code changes and technical decisions for learning using What, Why, If skipped, and Real-life example, with exactly one sentence per part. Use when the user wants to understand code, learn the concept behind a change, or understand why an implementation decision was made.
---

# Code Understanding

Help the user understand each code change or technical decision through four parts, with exactly one sentence in each part. Use plain language and explain unfamiliar terms when introducing them.

## Ground the explanation

Read the supplied code, diff, or decision context before explaining it. When relevant code is accessible, inspect the smallest useful scope; when it is missing, ask for the necessary context or clearly label a hypothetical example. Distinguish observed behavior from inferred intent, and do not claim a proposed change has already been made.

Cover each distinct change or decision within the requested scope. Group edits that implement the same concept, but explain independent decisions separately. Explain rather than modify code unless implementation is also requested.

## Required format

Give each change or decision a short descriptive title, followed by four labeled lines with exactly one complete sentence per line; labels and titles do not count as sentences.

**What:** Describe the change or choice and its effect, naming the concept when useful.

**Why:** Explain the main reason this approach fits, including a tradeoff only when it materially helps understanding.

**If skipped:** State the concrete consequence of omitting it, or when skipping it is reasonable, with appropriate uncertainty.

**Real-life example:** Use a familiar everyday analogy that clearly connects to how this specific change or decision works.

## Example

### Debouncing a search box

**What:** We added debouncing so the search box waits for a pause in typing before sending a request.

**Why:** This reduces unnecessary requests at the cost of a short delay before searching.

**If skipped:** A search box that requests on every input change sends a request for each keystroke, which may be acceptable for cheap local searches.

**Real-life example:** Like a waiter waiting for a pause before sending your order to the kitchen, debouncing waits for a typing pause before sending the search request.

## Check before responding

Check that each change or decision has all four parts and that every part contains exactly one complete sentence. Keep each sentence concise rather than packing multiple explanations into a long sentence. Preserve factual grounding and an accurate analogy without exaggerating risks, implying every change is necessary, or adding unrequested quizzes or extra lessons.
