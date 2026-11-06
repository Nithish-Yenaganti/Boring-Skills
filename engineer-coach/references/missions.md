# Mission templates

Adapt these to the user's actual job, stack, and goal — they're starting points, not a menu to read aloud. A good mission produces evidence someone else can see. Pick the pillar that's the biggest gap for their goal (see "How pillars connect" in pillars.md).

Choosing by goal:
- **Senior at big tech** → ownership, communication, judgment
- **Staff** → communication (design docs), judgment, ownership at org scope
- **AI lab / AI startup** → leverage (AI-native), fundamentals, public
- **Startup / founder** → ownership, public, leverage

---

## ownership — "Own one measurable win" (4–6 weeks)
**Outcome:** a problem you found (not one you were assigned), shipped and measured, with before→after numbers your manager acknowledges.
Milestones:
1. List 5 pain points from incidents, support tickets, slow dashboards, or teammate complaints; estimate impact of each.
2. Pick one; write a 1-page problem statement with baseline metric; get your lead's buy-in.
3. Ship the smallest version that moves the metric.
4. Measure after 1 week; write it up in impact-statement form.
5. Present it (team meeting / demo / written update).
**NOT doing:** new side projects; framework courses; volunteering for unrelated tickets.

## leverage — "Become AI-native" (4 weeks)
**Outcome:** a documented 3x+ speedup on a real recurring workflow, plus one shipped LLM-powered feature or tool with an eval.
Milestones:
1. Time yourself on 3 recurring tasks (tests, migrations, reviews) as a baseline.
2. Do each with an AI coding agent for a week; log time and defects caught.
3. Build one small LLM feature/tool (agent, RAG, tool use) solving a real team problem.
4. Write an eval set (20+ cases) and show the pass rate.
5. Share the workflow with your team.
**NOT doing:** collecting AI tools; prompt-engineering courses; shipping AI code you can't explain.

## leverage — "Claim a specialty" (6–8 weeks)
**Outcome:** you're the person teammates ask about X — evidence: 3+ people came to you, or you wrote the team's reference doc on it.
Milestones: pick the area tied to the team's hardest problem → read the core source/docs → fix 2 real bugs in it → write the internal guide → give a 20-min talk.
**NOT doing:** a second specialty; unrelated tutorials.

## fundamentals — "One layer down" (6 weeks)
**Outcome:** explain and demonstrate how one core dependency works internally (e.g. Postgres query planning & indexes, HTTP/TCP, the event loop, Kubernetes scheduling), applied to fix or speed up something real at work.
Milestones:
1. Choose the dependency that causes your team the most pain.
2. Read the relevant DDIA chapter + official internals docs; write a 1-page explainer.
3. Read the source for one feature; trace a request through it.
4. Reproduce a real production issue locally; root-cause it with a 5-whys.
5. Ship the fix with a measured improvement.
**NOT doing:** learning a new language; a broad "CS refresher" course; LeetCode grinding (unless interviewing).

## judgment — "Simplify something" (4 weeks)
**Outcome:** delete or simplify a piece of the system (code, service, process) with measurable benefit — fewer lines, faster builds, fewer pages — and no regressions.
Milestones: find the most-complained-about complexity → write options incl. "do nothing" with tradeoffs → get agreement → land it in small, tested PRs → report results.
**NOT doing:** a full rewrite; adding new abstractions; gold-plating.

## communication — "Ship a design doc that gets adopted" (4–6 weeks)
**Outcome:** a design doc reviewed by senior/staff engineers, approved, and implemented.
Milestones:
1. Pick upcoming work that's >2 weeks of effort.
2. Draft using the design-doc rubric; score yourself.
3. Get 2 reviewers; address every comment in writing.
4. Decision recorded; implementation started.
5. Retro: what feedback did you get, and which mistake patterns showed up?
**NOT doing:** coding before the doc is approved; writing more than 3 pages.
Daily habit during this mission: every commit message explains *why*; every status update leads with the outcome.

## public — "Ship it publicly" (4–6 weeks)
**Outcome:** one public artifact real people use or read — a published technical post, a merged contribution to a well-known OSS project, or a tool with 10+ real users.
Milestones:
1. Pick the topic from work you've actually done (your best mission so far is ideal).
2. Draft in a week; publish at 80%.
3. Share it in 3 places where the right people are (HN, relevant Discord/Slack, X/LinkedIn, an SF meetup).
4. Respond to every comment; capture feedback.
5. Second, shorter piece or follow-up release within 2 weeks.
**NOT doing:** redesigning your personal site; starting a second project; waiting for perfection.

---

## Mission rules (enforced by coach.py)
- One active mission. A new one is refused until the current one is done (with evidence) or abandoned (with a reason).
- At least 2 not-doing items. At most 8 milestones. Deadline at least a week out.
- Abandonments are logged as `scattered-focus` — fine once for a real reason, a pattern if repeated.
