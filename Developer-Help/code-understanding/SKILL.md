---
name: code-understanding
description: Explain code changes and technical decisions for learning using What, Why, If skipped, and Real-life example, with exactly three sentences per part. Use when the user wants to understand code, learn the concept behind a change, or understand why an implementation decision was made.
---

# Code Understanding

Help the user understand each code change or technical decision through four parts, with exactly three sentences in each part. Use plain language and explain unfamiliar terms when introducing them.

## Ground the explanation

Read the supplied code, diff, or decision context before explaining it. When relevant code is accessible, inspect the smallest useful scope; when it is missing, ask for the necessary context or clearly label a hypothetical example. Distinguish observed behavior from inferred intent, and do not claim a proposed change has already been made.

Cover each distinct change or decision within the requested scope. Group edits that implement the same concept, but explain independent decisions separately. Explain rather than modify code unless implementation is also requested.

## Required format

Give each change or decision a short descriptive title, followed by these four labeled paragraphs. Each paragraph must contain exactly three complete sentences; labels and titles do not count as sentences.

**What:** Describe what changed or was chosen. Name the underlying coding concept and explain it simply. Describe its effect on the program's behavior or structure.

**Why:** Explain the problem or goal. Explain why this approach fits the available context, labeling inferred reasoning as such. State the main tradeoff or relevant alternative without inventing benefits or decision history.

**If skipped:** Explain what happens if the change is omitted or the decision is not adopted, making the baseline clear. Give a concrete consequence with appropriate uncertainty. State when skipping it could be reasonable, or why it would not be reasonable under the stated requirements.

**Real-life example:** Introduce a familiar everyday situation that illustrates this specific change or decision. Explicitly connect the people, objects, or actions in that situation to the relevant parts of the code. Explain how the situation illustrates the benefit or tradeoff, noting an analogy's limitation when it would otherwise mislead.

## Example

### Debouncing a search box

**What:** The search box now waits until typing pauses before sending a request. This is called debouncing, which restarts a short timer whenever another keystroke arrives. A request is sent when that timer finishes without another keystroke.

**Why:** Sending a request for every keystroke can create unnecessary server work. Debouncing reduces those requests while still searching automatically after a pause. The tradeoff is a short delay before the search begins.

**If skipped:** Without debouncing, a search box wired to request on every input change sends a request for each keystroke. Typing a five-letter word could therefore produce five requests instead of one after the final pause. Skipping debouncing can be reasonable when searching a small local list is cheap and immediate feedback matters more.

**Real-life example:** Imagine a waiter who waits for you to pause before passing your order to the kitchen. Your spoken additions represent keystrokes, the waiter's brief wait represents the timer, and passing the order represents sending the request. This avoids sending every fragment separately, although a long pause could still cause an order to be sent before you finish.

## Check before responding

Check that each change or decision has all four parts and that every part contains exactly three complete sentences. Remove filler added merely to reach the sentence count; use the space for concrete behavior, reasoning, consequences, and an accurate analogy. Do not exaggerate risks or imply that every change is necessary, and do not add unrequested quizzes or extra lessons.
