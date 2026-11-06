#!/usr/bin/env python3
"""State manager for the engineer-coach skill.

Keeps one active mission at a time, check-ins, a parking lot for
distractions, and a log of recurring mistakes. State is a single JSON
file at $ENGINEER_COACH_HOME/state.json (default ~/.engineer-coach).
"""

import argparse
import json
import os
import sys
from collections import Counter
from datetime import date, datetime, timedelta
from pathlib import Path

HOME = Path(os.environ.get("ENGINEER_COACH_HOME", Path.home() / ".engineer-coach"))
STATE_FILE = HOME / "state.json"

PILLARS = ["ownership", "leverage", "fundamentals", "judgment", "communication", "public"]

# Known mistake patterns, keyed by id -> (pillar, description).
# Mirrors references/pillars.md; custom ids are allowed with --pillar.
PATTERNS = {
    "tasks-not-outcomes": ("ownership", "Describes activity instead of impact"),
    "waits-for-tickets": ("ownership", "Waits to be assigned instead of finding problems"),
    "no-baseline-metric": ("ownership", "Ships without measuring before/after"),
    "abandons-after-ship": ("ownership", "Stops caring once merged; no follow-through"),
    "low-impact-work": ("ownership", "Polishes work nobody needs"),
    "tutorial-hopping": ("leverage", "Starts courses/frameworks, never goes deep"),
    "no-specialty": ("leverage", "No area where they are the go-to person"),
    "ai-avoidance": ("leverage", "Not using AI tools to multiply output"),
    "ai-autopilot": ("leverage", "Accepts AI output without understanding/verifying"),
    "cargo-cult": ("fundamentals", "Uses tools without knowing how they work"),
    "shallow-debugging": ("fundamentals", "Patches symptoms; never finds root cause"),
    "no-tests": ("fundamentals", "Changes code without tests"),
    "overengineering": ("judgment", "Builds for imagined scale/requirements"),
    "no-tradeoffs": ("judgment", "Presents one option; no alternatives considered"),
    "says-yes-to-everything": ("judgment", "Can't say no; scope balloons"),
    "rewrite-urge": ("judgment", "Wants to rewrite instead of improve"),
    "giant-changes": ("judgment", "Ships huge PRs/commits that can't be reviewed"),
    "buries-the-lede": ("communication", "Key point/ask is hidden at the end"),
    "vague-commits": ("communication", "Commit/PR messages don't explain why"),
    "no-design-doc": ("communication", "Starts big work without writing it down"),
    "jargon-to-nontech": ("communication", "Can't explain to non-engineers"),
    "silent-blocker": ("communication", "Sits on blockers instead of raising them"),
    "invisible-work": ("public", "Great work nobody outside the team knows about"),
    "never-ships-side-projects": ("public", "Side projects never reach real users"),
    "perfectionism": ("public", "Won't publish until it's perfect"),
    "scattered-focus": ("ownership", "Switches missions / starts new things mid-course"),
}


def today():
    return date.today().isoformat()


def load():
    if not STATE_FILE.exists():
        return {"profile": None, "mission": None, "history": [], "parking_lot": [],
                "checkins": [], "mistakes": [], "weekly_reviews": []}
    return json.loads(STATE_FILE.read_text())


def save(state):
    HOME.mkdir(parents=True, exist_ok=True)
    tmp = STATE_FILE.with_suffix(".tmp")
    tmp.write_text(json.dumps(state, indent=2))
    tmp.replace(STATE_FILE)


def die(msg):
    print(f"REFUSED: {msg}")
    sys.exit(1)


def require_mission(state):
    if not state["mission"]:
        die("No active mission. Choose one first (mission start).")
    return state["mission"]


def days_between(a, b):
    return (date.fromisoformat(b) - date.fromisoformat(a)).days


def mission_progress(m):
    total = len(m["milestones"])
    done = sum(1 for x in m["milestones"] if x["done"])
    elapsed = days_between(m["started"], today())
    span = max(days_between(m["started"], m["deadline"]), 1)
    return done, total, elapsed, span


def pace_label(m):
    done, total, elapsed, span = mission_progress(m)
    if total == 0:
        return "NO MILESTONES - add 3-6"
    time_pct = elapsed / span
    work_pct = done / total
    if elapsed > span:
        return "OVERDUE"
    if work_pct + 0.15 >= time_pct:
        return "on track"
    if work_pct + 0.35 >= time_pct:
        return "at risk"
    return "off track"


def recurring(state, threshold=3):
    counts = Counter(x["pattern"] for x in state["mistakes"])
    return [(p, c) for p, c in counts.most_common() if c >= threshold]


# ---------- commands ----------

def cmd_init(a, s):
    s["profile"] = {"role": a.role, "years": a.years, "stack": a.stack,
                    "goal": a.goal, "hours_per_week": a.hours, "created": today()}
    save(s)
    print("Profile saved.")


def cmd_status(a, s):
    if not s["profile"]:
        print("NO PROFILE - run onboarding (coach.py init).")
        return
    p = s["profile"]
    m = s["mission"]
    if a.brief:
        if m:
            done, total, _, _ = mission_progress(m)
            nxt = next((x["text"] for x in m["milestones"] if not x["done"]), "-")
            print(f"[coach] Mission: {m['title']} | {done}/{total} | {pace_label(m)} | next: {nxt}")
        else:
            print("[coach] No active mission - pick one before starting anything new.")
        return
    print(f"Profile: {p['role']}, {p['years']}y, {p['stack']} -> goal: {p['goal']} ({p['hours_per_week']}h/wk)")
    if m:
        done, total, elapsed, span = mission_progress(m)
        print(f"\nACTIVE MISSION [{m['pillar']}]: {m['title']}")
        print(f"  Outcome:  {m['outcome']}")
        print(f"  Why:      {m['why']}")
        print(f"  Day {elapsed}/{span} (deadline {m['deadline']}) | milestones {done}/{total} | {pace_label(m)}")
        for i, x in enumerate(m["milestones"], 1):
            print(f"   {i}. [{'x' if x['done'] else ' '}] {x['text']}")
        if m["not_doing"]:
            print("  NOT doing: " + "; ".join(m["not_doing"]))
    else:
        print("\nNo active mission.")
    if s["checkins"]:
        last = s["checkins"][-1]["date"]
        gap = days_between(last, today())
        print(f"\nLast check-in: {last} ({gap}d ago){'  <- overdue' if gap > 3 else ''}")
    else:
        print("\nNo check-ins yet.")
    last_wr = s["weekly_reviews"][-1] if s["weekly_reviews"] else None
    if m and (not last_wr or days_between(last_wr, today()) >= 7):
        print("Weekly review due.")
    rec = recurring(s)
    if rec:
        print("Recurring mistakes (habits to break): " +
              ", ".join(f"{p} x{c}" for p, c in rec))
    if s["parking_lot"]:
        print(f"Parking lot: {len(s['parking_lot'])} idea(s) waiting for mission end.")
    print(f"Completed missions: {sum(1 for h in s['history'] if h['status'] == 'done')}, "
          f"abandoned: {sum(1 for h in s['history'] if h['status'] == 'abandoned')}")


def cmd_mission(a, s):
    if a.action == "start":
        if s["mission"]:
            m = s["mission"]
            die(f"Mission already active: '{m['title']}' ({pace_label(m)}). "
                "Finish it (mission done --evidence) or abandon it with a reason "
                "(mission abandon --reason). New ideas go to the parking lot (park).")
        if a.pillar not in PILLARS:
            die(f"pillar must be one of {PILLARS}")
        for f in ("title", "outcome", "why", "deadline"):
            if not getattr(a, f):
                die(f"--{f} is required")
        if len(a.not_doing or []) < 2:
            die("Give at least 2 --not-doing items. Deciding what to skip is part of the mission.")
        if days_between(today(), a.deadline) < 7:
            die("Deadline must be at least a week out.")
        s["mission"] = {"title": a.title, "pillar": a.pillar, "outcome": a.outcome,
                        "why": a.why, "deadline": a.deadline, "started": today(),
                        "not_doing": a.not_doing, "milestones": []}
        save(s)
        print(f"Mission started: {a.title}. Now add 3-6 milestones.")
    elif a.action == "done":
        m = require_mission(s)
        if not a.evidence or len(a.evidence) < 15:
            die("Provide --evidence of the OUTCOME (link, metric, merged PR, published post).")
        open_ms = [x["text"] for x in m["milestones"] if not x["done"]]
        if open_ms and not a.force:
            die(f"{len(open_ms)} milestone(s) still open: {open_ms}. Finish them or pass --force "
                "if the outcome was reached another way.")
        m.update(status="done", ended=today(), evidence=a.evidence)
        s["history"].append(m)
        s["mission"] = None
        save(s)
        print(f"Mission complete in {days_between(m['started'], today())} days. Debrief, then review parking lot.")
    elif a.action == "abandon":
        m = require_mission(s)
        if not a.reason or len(a.reason) < 20:
            die("Abandoning needs a real --reason (20+ chars). Is this a genuine change, or the hard middle?")
        m.update(status="abandoned", ended=today(), reason=a.reason)
        s["history"].append(m)
        s["mission"] = None
        s["mistakes"].append({"date": today(), "pattern": "scattered-focus",
                              "pillar": "ownership", "note": f"Abandoned '{m['title']}': {a.reason}"})
        save(s)
        n = sum(1 for h in s["history"] if h["status"] == "abandoned")
        print(f"Mission abandoned (total abandoned: {n}). Logged as scattered-focus; "
              "fine if the reason is real, a pattern if it repeats.")


def cmd_milestone(a, s):
    m = require_mission(s)
    if a.action == "add":
        if len(m["milestones"]) >= 8:
            die("8 milestones max - the mission is too big. Cut scope.")
        m["milestones"].append({"text": a.value, "done": False})
        print(f"Milestone {len(m['milestones'])} added.")
    elif a.action == "done":
        i = int(a.value) - 1
        if not 0 <= i < len(m["milestones"]):
            die("No such milestone number.")
        m["milestones"][i].update(done=True, done_at=today())
        done, total, _, _ = mission_progress(m)
        print(f"Milestone done ({done}/{total}).")
    save(s)


def cmd_checkin(a, s):
    require_mission(s)
    s["checkins"].append({"date": today(), "did": a.did, "next": a.next,
                          "blocked": a.blocked, "focus": a.focus})
    save(s)
    print("Check-in saved.")
    recent = [c["focus"] for c in s["checkins"][-3:] if c.get("focus")]
    if len(recent) == 3 and all(f <= 2 for f in recent):
        print("DRIFT WARNING: focus <=2 for 3 check-ins in a row. The mission is slipping - "
              "cut scope, fix the blocker, or decide explicitly to abandon.")
    if a.blocked:
        same = [c for c in s["checkins"][-4:-1] if c.get("blocked")]
        if len(same) >= 2:
            print("BLOCKER WARNING: blocked in several recent check-ins. Escalate it today - "
                  "sitting on blockers is a pattern (silent-blocker).")


def cmd_park(a, s):
    s["parking_lot"].append({"idea": a.idea, "added": today(),
                             "during": s["mission"]["title"] if s["mission"] else None})
    save(s)
    print(f"Parked. {len(s['parking_lot'])} idea(s) waiting. Back to the mission.")


def cmd_parked(a, s):
    if a.clear is not None:
        removed = s["parking_lot"].pop(a.clear - 1)
        save(s)
        print(f"Removed: {removed['idea']}")
        return
    if not s["parking_lot"]:
        print("Parking lot empty.")
    for i, p in enumerate(s["parking_lot"], 1):
        print(f"{i}. {p['idea']} (parked {p['added']})")


def cmd_mistake(a, s):
    pillar = a.pillar or PATTERNS.get(a.pattern, (None,))[0]
    if not pillar:
        die(f"Unknown pattern '{a.pattern}' - pass --pillar for custom patterns. "
            f"Known: {', '.join(PATTERNS)}")
    s["mistakes"].append({"date": today(), "pattern": a.pattern, "pillar": pillar, "note": a.note})
    save(s)
    n = sum(1 for x in s["mistakes"] if x["pattern"] == a.pattern)
    tag = "  <- RECURRING: this is now a habit; make fixing it the priority." if n >= 3 else ""
    print(f"Logged {a.pattern} (seen {n}x).{tag}")


def cmd_mistakes(a, s):
    if not s["mistakes"]:
        print("No mistakes logged yet.")
        return
    counts = Counter(x["pattern"] for x in s["mistakes"])
    for pat, c in counts.most_common():
        desc = PATTERNS.get(pat, ("", "custom"))[1]
        last = [x for x in s["mistakes"] if x["pattern"] == pat][-1]
        print(f"{c:>3}x {pat:<26} {desc}  (last {last['date']}: {last['note'] or '-'})")


def cmd_weekly(a, s):
    m = require_mission(s)
    since = (date.today() - timedelta(days=7)).isoformat()
    week = [c for c in s["checkins"] if c["date"] >= since]
    done, total, elapsed, span = mission_progress(m)
    print(f"WEEKLY REVIEW - {m['title']} (day {elapsed}/{span}, {done}/{total} milestones, {pace_label(m)})")
    print(f"Check-ins this week: {len(week)}")
    for c in week:
        print(f"  {c['date']} focus={c.get('focus') or '?'} did: {c['did']}"
              + (f" | BLOCKED: {c['blocked']}" if c.get("blocked") else ""))
    fs = [c["focus"] for c in week if c.get("focus")]
    if fs:
        print(f"Avg focus: {sum(fs) / len(fs):.1f}/5")
    wk_m = [x for x in s["mistakes"] if x["date"] >= since]
    if wk_m:
        print("Mistakes this week: " + ", ".join(Counter(x["pattern"] for x in wk_m)))
    rec = recurring(s)
    if rec:
        print("Recurring (priority): " + ", ".join(f"{p} x{c}" for p, c in rec))
    ms_week = [x["text"] for x in m["milestones"] if x.get("done_at", "") >= since]
    print("Milestones closed this week: " + ("; ".join(ms_week) if ms_week else "none"))
    s["weekly_reviews"].append(today())
    save(s)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("init")
    p.add_argument("--role", required=True)
    p.add_argument("--years", type=float, required=True)
    p.add_argument("--stack", required=True)
    p.add_argument("--goal", required=True)
    p.add_argument("--hours", type=float, required=True, help="growth hours per week")

    p = sub.add_parser("status")
    p.add_argument("--brief", action="store_true", help="one line, for hooks/prompts")

    p = sub.add_parser("mission")
    p.add_argument("action", choices=["start", "done", "abandon"])
    p.add_argument("--title")
    p.add_argument("--pillar")
    p.add_argument("--outcome")
    p.add_argument("--why")
    p.add_argument("--deadline", help="YYYY-MM-DD")
    p.add_argument("--not-doing", action="append", dest="not_doing")
    p.add_argument("--evidence")
    p.add_argument("--reason")
    p.add_argument("--force", action="store_true")

    p = sub.add_parser("milestone")
    p.add_argument("action", choices=["add", "done"])
    p.add_argument("value", help="text to add, or milestone number to complete")

    p = sub.add_parser("checkin")
    p.add_argument("--did", required=True)
    p.add_argument("--next", required=True)
    p.add_argument("--blocked")
    p.add_argument("--focus", type=int, choices=range(1, 6))

    p = sub.add_parser("park")
    p.add_argument("idea")

    p = sub.add_parser("parked")
    p.add_argument("--clear", type=int, help="remove idea by number")

    p = sub.add_parser("mistake")
    p.add_argument("--pattern", required=True)
    p.add_argument("--pillar", choices=PILLARS)
    p.add_argument("--note", default="")

    sub.add_parser("mistakes")
    sub.add_parser("weekly")

    a = ap.parse_args()
    s = load()
    globals()[f"cmd_{a.cmd}"](a, s)


if __name__ == "__main__":
    main()
