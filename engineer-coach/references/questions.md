# Question bank — interview the user, don't make them write essays

Every mode gathers what it needs through short rounds of questions. Most are pick-from-a-list; only facts the user alone knows (a link, a number, their own description of what they shipped) are typed.

## How to ask

- **Tool:** if your agent has a structured-question tool (Claude Code: `AskUserQuestion` — up to 4 questions per call, 2–4 options each, "Other" is added automatically so they can always type), use it. Otherwise print a numbered list with lettered options and say they can answer compactly, e.g. `1b 2a`.
- **Build options from state.** Use their real milestone names, real recurring mistakes, real parked ideas — not generic placeholders. Run `coach.py status` first.
- **Recommended first.** When you have a view, put it as the first option and mark it "(Recommended)" with a one-line reason in the description.
- **Don't ask what you know.** If state or their message already answers a question, skip it.
- **Typed answers: one at a time, one line each.** Ask them only after the choices, and only when the choice made them necessary (e.g. "Made progress" → "In one line, what did you do?").
- **Max 2 rounds of choices per mode** before you give them something back. Interviews that drag feel like forms.

---

## Onboard

**Round 1 — where you are (single choice)**
1. Level — Junior (0–2y) / Mid (2–5y) / Senior (5–8y) / Staff+ (8y+)
2. Target — Senior at big tech / Staff engineer / AI lab or AI startup / Founder or early-stage
3. Honest growth hours per week — 2–3h / 4–6h / 7–10h / 10h+
4. Current work — Backend / Frontend / Full-stack / Infra, data, or ML

**Round 2 — patterns (multi-select)**
5. Which sound like you? — I start things and don't finish / Busy but can't name my impact / I avoid writing docs or speaking up / My work is invisible outside my team
6. Which feel weakest? — Debugging to root cause / Designing systems & tradeoffs / Using AI tools well / Knowing what not to build

**Typed (one line each)**
7. What did you ship in the last 3 months, and what changed because of it?
8. Your stack (languages, frameworks, databases)?
9. What have you started and abandoned before?

**Reading the answers**

| Answer | Signal |
|---|---|
| Q7 lists tasks, no result or number | `tasks-not-outcomes` → strong case for an **ownership** mission |
| Q5 "don't finish" or long Q9 | `scattered-focus` / `tutorial-hopping` → first mission 4 weeks max |
| Q5 "invisible" | `invisible-work` → **public** or **communication** |
| Q6 "AI tools" + AI target | **leverage** |
| Q6 "debugging" | `shallow-debugging` → **fundamentals** |
| Q6 "designing" / "what not to build" | **judgment** |
| Q3 = 2–3h | shrink scope; ambition must fit the hours |

Log only mistakes the answers clearly show, and tell them which ones and why.

---

## Choose mission

**Round 1**
1. Which mission? — 2–3 tailored missions from `missions.md`, recommended first; the description says the outcome and why it fits them. (Use option previews, if your tool has them, to show each mission's milestones.)
2. Deadline — 4 weeks / 6 weeks / 8 weeks (recommend 4 for a first mission or ≤3h/week)

**Round 2**
3. NOT doing (multi-select, pick at least 2) — 4 tempting distractions specific to them (from onboarding answers and parking lot)
4. Milestones — show your proposed 3–6 → Looks right / Make it smaller / Swap one out

Then record with `mission start` and `milestone add`. No typing needed unless they pick "Other".

---

## Check-in

**Round 1**
1. Since last time? — Finished "<current milestone>" / Made progress on it / Got blocked / Didn't work on the mission
2. How much of your growth time went to the mission? — Nearly all (5) / Most (4) / About half (3) / Little or none (1–2)

**Follow-ups, only as triggered**
- Made progress / Finished → typed: "In one line, what did you do?" (check it for `tasks-not-outcomes`)
- Got blocked → choice: Waiting on someone / Don't know how / No time / Goal is unclear → then coach the specific unblock (waiting → escalate today; don't know how → smallest next experiment; no time → cut scope; unclear → rewrite the milestone)
- Didn't work on it → choice: Work was crazy / Got pulled into something else / Lost motivation / Mission feels wrong → "something else" goes to **Focus guard**; "feels wrong" → offer to re-scope or abandon

**Close** — propose the one next action and ask: Commit to this / Make it smaller / Different action. Record with `checkin --did --next --focus`.

---

## Review

1. What should I review? (skip if they already shared it) — PR or diff / Design doc / Status update or promo writeup / Scan my git habits
2. For the git scan: whose commits? — Mine (I'll use your git email) / Whole team / Specific author (typed)

After giving findings:
3. Which of these are real habits worth tracking? (multi-select of the mistake patterns you found) → log only the selected ones.

---

## Focus guard

Show the mission, progress, and NOT-doing list first. Then:

1. What do you want to do with "<new idea>"? — Park it until this mission ends (Recommended) / It's required by my job, not a growth goal / It's more important — abandon current mission
   - Park → `park`, back to the mission's next action.
   - Required by job → fine, it's not a mission; no change.
   - Abandon → question 2.
2. Why switch? — Job or team changed / Current mission was the wrong goal / I lost interest / Other
   - "Lost interest" → say plainly this is usually the hard middle, and offer "Make the mission smaller instead" as an option before confirming.
   - Otherwise → `mission abandon --reason`, then **Choose mission**.

---

## Weekly review

Show the `weekly` summary and your one-word verdict first. Then:

1. Next week's adjustment — keep pace / cut scope / move deadline / push harder (recommend one based on pace)
2. Habit to fix this week — the top 1–3 recurring mistakes from state, recommended first

---

## Debrief

1. What's your evidence? — Merged PR or link / Metric before→after / Published post or talk / Reviewer or manager approval
   → typed: "Paste the link or numbers." (one line)
2. What worked best? (multi-select) — Small milestones / The NOT-doing list / Regular check-ins / Getting feedback early
3. Next mission — top parked ideas + 1–2 recommended missions → goes to **Choose mission**
