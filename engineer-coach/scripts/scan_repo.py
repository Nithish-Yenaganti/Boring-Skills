#!/usr/bin/env python3
"""Scan a git repo's history for an author's engineering-habit mistakes.

Usage: scan_repo.py <repo> [--author NAME_OR_EMAIL] [--days 60]

Findings are tagged with mistake-pattern ids from engineer-coach's
references/pillars.md. They are evidence to discuss, not verdicts.
"""

import argparse
import re
import subprocess
import sys
from collections import Counter

VAGUE = re.compile(r"^(fix(es|ed)?|wip|update[sd]?|changes?|stuff|misc|minor|tweaks?|"
                   r"cleanup|refactor|test|temp|asdf|\.+|done|final|small fix)\b[\s.!]*$", re.I)
TEST_PATH = re.compile(r"(^|/)(tests?|__tests__|spec)(/|$)|(_test|\.test|\.spec|_spec)\.\w+$|(^|/)test_[^/]+$")
SRC_EXT = re.compile(r"\.(py|js|jsx|ts|tsx|go|rs|java|kt|rb|php|c|cc|cpp|h|hpp|cs|swift|scala)$")
GENERATED = re.compile(r"(lock|\.lock|\.min\.\w+|\.snap|generated|vendor/|node_modules/|dist/|\.pb\.)", re.I)
GIANT_LINES = 500


def git(repo, *args):
    r = subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"git error: {r.stderr.strip()}")
    return r.stdout


def parse_log(repo, author, days):
    args = ["log", f"--since={days}.days", "--no-merges", "--numstat",
            "--format=@@%H%x1f%an <%ae>%x1f%ad%x1f%s", "--date=short"]
    if author:
        args.append(f"--author={author}")
    commits, cur = [], None
    for line in git(repo, *args).splitlines():
        if line.startswith("@@"):
            h, who, d, subj = line[2:].split("\x1f", 3)
            cur = {"hash": h[:8], "author": who, "date": d, "subject": subj, "files": []}
            commits.append(cur)
        elif line.strip() and cur:
            added, deleted, path = line.split("\t", 2)
            n = 0 if added == "-" else int(added) + int(deleted)
            cur["files"].append((path, n))
    return commits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("repo")
    ap.add_argument("--author")
    ap.add_argument("--days", type=int, default=60)
    a = ap.parse_args()

    commits = parse_log(a.repo, a.author, a.days)
    if not commits:
        print(f"No commits in the last {a.days} days" + (f" by '{a.author}'" if a.author else "") + ".")
        return

    vague, giant, untested = [], [], []
    churn = Counter()
    for c in commits:
        real = [(p, n) for p, n in c["files"] if not GENERATED.search(p)]
        size = sum(n for _, n in real)
        if VAGUE.match(c["subject"].strip()) or len(c["subject"].strip()) < 12:
            vague.append(c)
        if size > GIANT_LINES:
            giant.append((c, size))
        src = [p for p, _ in real if SRC_EXT.search(p) and not TEST_PATH.search(p)]
        tests = [p for p, _ in real if TEST_PATH.search(p)]
        if src and not tests and sum(n for p, n in real if p in src) >= 20:
            untested.append(c)
        for p, _ in real:
            churn[p] += 1

    n = len(commits)
    sizes = sorted(sum(x for _, x in c["files"]) for c in commits)
    print(f"Scanned {n} commits over {a.days} days"
          + (f" by '{a.author}'" if a.author else "") + f". Median change size: {sizes[n // 2]} lines.\n")

    def section(title, pattern, items, fmt, pct):
        flag = "!!" if pct >= 25 else "ok" if pct < 10 else " !"
        print(f"[{flag}] {title}: {len(items)}/{n} ({pct:.0f}%)  -> pattern: {pattern}")
        for it in items[:5]:
            print("      " + fmt(it))
        print()

    section("Vague commit messages", "vague-commits", vague,
            lambda c: f"{c['hash']} {c['date']} \"{c['subject']}\"", 100 * len(vague) / n)
    section(f"Giant commits (>{GIANT_LINES} lines, excl. generated)", "giant-changes", giant,
            lambda t: f"{t[0]['hash']} {t[0]['date']} {t[1]} lines \"{t[0]['subject']}\"",
            100 * len(giant) / n)
    section("Source changes (20+ lines) with no test changes", "no-tests", untested,
            lambda c: f"{c['hash']} {c['date']} \"{c['subject']}\"", 100 * len(untested) / n)

    hot = [(p, k) for p, k in churn.most_common(5) if k >= max(4, n // 5)]
    if hot:
        print("Churn hotspots (same file changed repeatedly -> possible shallow-debugging "
              "or missing design; ask why):")
        for p, k in hot:
            print(f"      {k:>3}x {p}")
        print()

    print("Legend: !! = habit worth fixing now, ! = watch, ok = fine. "
          "Discuss each with the engineer before logging it as a mistake.")


if __name__ == "__main__":
    main()
