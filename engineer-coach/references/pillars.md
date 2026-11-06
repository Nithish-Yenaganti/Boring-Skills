# The Six Pillars — what top 1% looks like, and the mistakes that keep people average

Each mistake has a pattern id (used with `coach.py mistake --pattern <id>`), the signal that reveals it, why it costs them, and the fix. When you spot one, quote the signal back to the user.

## 1. Ownership & impact (`ownership`)
**Top 1%:** owns a problem end to end — defines it, ships it, measures it, follows up. Chooses work by business impact. Can state their last 3 wins as numbers.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `tasks-not-outcomes` | "I did tickets X, Y, Z"; updates list activity | Managers promote impact, not effort; invisible value | Rewrite as: problem → action → measured result. "Cut checkout errors 3%→0.4%, ~$40k/mo" |
| `waits-for-tickets` | "I'm waiting for my lead to assign something" | Caps you at executor level forever | Bring one problem + proposed fix to your lead each sprint |
| `no-baseline-metric` | Shipped a perf/reliability change, can't say how much it helped | Unmeasured work can't be claimed | Capture the "before" number *before* writing code |
| `abandons-after-ship` | Merged and moved on; doesn't know if it worked in prod | Ownership ends at outcome, not merge | Calendar a 1-week and 1-month check on every launch |
| `low-impact-work` | Weeks on internal polish nobody asked for | Opportunity cost | Ask: "Who would notice if this didn't ship?" If no one — drop it |
| `scattered-focus` | Multiple half-done efforts; abandons missions | Nothing compounds | One mission at a time; park the rest |

## 2. Deep expertise + AI-native leverage (`leverage`)
**Top 1%:** the go-to person for one hard area (T-shaped), and uses AI to multiply output 3–10x while still understanding every line they ship.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `tutorial-hopping` | Third course this quarter, no project finished | Consumption feels like progress but isn't | Finish one build that uses the course material, then stop |
| `no-specialty` | "I do a bit of everything" at 3+ years | Generalists are replaceable; experts get pulled in | Pick one area tied to the company's hardest problem; go deep for 6–12 months |
| `ai-avoidance` | Writes boilerplate, tests, migrations by hand | Falling behind peers' throughput | Use an AI agent for one full task per day; measure time saved |
| `ai-autopilot` | Can't explain code they submitted; AI bugs reach review | Destroys trust faster than slowness | Rule: never ship a line you can't explain. Read, test, then commit |

## 3. CS fundamentals (`fundamentals`)
**Top 1%:** understands one layer below the abstraction they use — DB internals, networking, OS, concurrency, failure modes. Debugs to root cause.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `cargo-cult` | "We add this index/retry/flag because that's how it's done" | Breaks the moment conditions change | For each tool you depend on, explain how it works in 5 sentences; read its source for one feature |
| `shallow-debugging` | Fix = restart / add retry / bump timeout; same bug returns | Symptoms come back; you never level up | Write a 5-whys for every incident you touch; reproduce before fixing |
| `no-tests` | Source changes without tests (see scan_repo) | Regressions; reviewers lose trust | Test the bug before fixing it; red → green |

## 4. Judgment & taste (`judgment`)
**Top 1%:** knows what *not* to build. Simplifies. Presents tradeoffs. Trusted with ambiguity because their calls keep being right.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `overengineering` | Microservices/queues/abstractions for a 100-user feature | Slows everyone, more failure modes | Design for 10x current load, not 1000x; YAGNI until data says otherwise |
| `no-tradeoffs` | Proposal has one option | Reviewers can't trust the choice | Always 2–3 options + "why not" for each, including "do nothing" |
| `says-yes-to-everything` | Overcommitted, missing dates | Reliability is reputation | "Yes, and that means X slips — which do you prefer?" |
| `rewrite-urge` | "This code is bad, let's rewrite it" | Rewrites usually fail and lose hidden knowledge | Incremental strangler: improve the worst 20% with tests first |
| `giant-changes` | PRs > 500 lines | Unreviewable → bugs + slow merges | Stack small PRs; each one shippable and reviewable in 15 min |

## 5. Writing & communication (`communication`)
**Top 1%:** writes docs that get adopted. Leads with the point. Explains tradeoffs to non-engineers. Writing is the staff-engineer multiplier.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `buries-the-lede` | The ask/decision is in paragraph 4 | Busy readers never get there | BLUF: first sentence = conclusion or ask |
| `vague-commits` | "fix", "update", "wip" (see scan_repo) | History becomes useless; reviewers guess | Subject = what changed; body = why. "Retry S3 upload on 503 (was dropping 2% of files)" |
| `no-design-doc` | Big work started with no written plan | Wrong direction discovered late | 1-page doc before >1 week of work: problem, options, decision, risks |
| `jargon-to-nontech` | PM/exec confused after explanation | Can't influence beyond engineering | Explain by user impact and cost; one analogy; no acronyms |
| `silent-blocker` | Blocked for days without telling anyone | Missed dates look like incompetence | Raise any blocker > 4 hours with a proposed unblock |

## 6. Building in public (`public`)
**Top 1%:** people outside the team know their work — open source, posts, talks, projects real users use. In SF, reputation travels through networks.

| id | Signal | Why it hurts | Fix |
|---|---|---|---|
| `invisible-work` | Great internal work, no one outside the team knows | Opportunities go to the visible | Turn every major win into an internal demo or external post |
| `never-ships-side-projects` | GitHub full of unfinished repos with 0 users | Unfinished = didn't happen | Scope to something shippable in 2 weeks; get 10 real users |
| `perfectionism` | Draft post sitting for months | Ideas go stale; no feedback loop | Publish at 80%. Edit after feedback |

## How pillars connect
Ownership without communication → invisible impact. Leverage without fundamentals → AI autopilot. Judgment grows from fundamentals plus shipped outcomes. Building in public amplifies all the others. When choosing the next mission, look for the pillar that's *blocking* the others.
