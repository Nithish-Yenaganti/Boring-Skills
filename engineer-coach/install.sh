#!/usr/bin/env bash
# Install engineer-coach into other coding agents' skill folders by symlink,
# so every agent shares one copy of the skill and one coaching state file.
#
#   ./install.sh                 # user-level: Claude Code + .agents (Codex & others)
#   ./install.sh --project DIR   # project-level: DIR/.agents/skills and DIR/.github/skills
#   ./install.sh --dir PATH      # any other agent's skills folder
#   ./install.sh --agents-md DIR # append a pointer to DIR/AGENTS.md (agents without skill support)
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NAME="engineer-coach"

link() {
  local parent="$1" dest="$1/$NAME"
  mkdir -p "$parent"
  if [ "$(cd "$parent" && pwd -P)/$NAME" = "$(cd "$SRC" && pwd -P)" ]; then
    echo "skip   $dest (this is the source)"
  elif [ -L "$dest" ]; then
    ln -sfn "$SRC" "$dest" && echo "update $dest"
  elif [ -e "$dest" ]; then
    echo "skip   $dest (exists and is not a symlink - remove it first)"
  else
    ln -s "$SRC" "$dest" && echo "link   $dest -> $SRC"
  fi
}

agents_md() {
  local file="$1/AGENTS.md"
  if grep -qs "engineer-coach" "$file"; then
    echo "skip   $file (already mentions engineer-coach)"
    return
  fi
  cat >> "$file" <<EOF

## Engineer coach
When the user asks for career coaching, a check-in, a weekly review, feedback on their
engineering habits, or wants to start something new while a growth mission is active,
read and follow $SRC/SKILL.md (its scripts are in $SRC/scripts/).
EOF
  echo "append $file"
}

if [ $# -eq 0 ]; then
  link "$HOME/.claude/skills"
  link "$HOME/.agents/skills"
  exit 0
fi

while [ $# -gt 0 ]; do
  case "$1" in
    --project)   link "$2/.agents/skills"; link "$2/.github/skills"; shift 2 ;;
    --dir)       link "$2"; shift 2 ;;
    --agents-md) agents_md "$2"; shift 2 ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done
