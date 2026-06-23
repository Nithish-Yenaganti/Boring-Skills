#!/bin/sh
set -eu

SOURCE_REPO="https://github.com/Nithish-Yenaganti/Boring-Skills"
RAW_BASE="https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main"

usage() {
  cat <<'EOF'
Usage:
  install.sh [--dir SKILLS_DIR] [skill-name|all]

Examples:
  install.sh --dir "$HOME/.codex/skills" three-sentence
  install.sh --dir /path/to/agent/skills all

Stable skills:
  hard-feedback
  three-sentence
  promptme
  job-search
  onepage-resume

Notes:
  This installer does not clone the repository.
  It copies raw SKILL.md files into <skills-dir>/<skill-name>/SKILL.md.
EOF
}

TARGET_DIR="${SKILLS_DIR:-}"
REQUESTED_SKILL="all"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dir)
      if [ "$#" -lt 2 ]; then
        echo "Error: --dir requires a path." >&2
        exit 1
      fi
      TARGET_DIR="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    all|hard-feedback|three-sentence|promptme|job-search|onepage-resume)
      REQUESTED_SKILL="$1"
      shift
      ;;
    *)
      echo "Error: unknown skill or option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

detect_target_dir() {
  if [ -n "$TARGET_DIR" ]; then
    return
  fi

  if [ -n "${CODEX_HOME:-}" ] && [ -d "$CODEX_HOME/skills" ]; then
    TARGET_DIR="$CODEX_HOME/skills"
    return
  fi

  if [ -n "${CLAUDE_HOME:-}" ] && [ -d "$CLAUDE_HOME/skills" ]; then
    TARGET_DIR="$CLAUDE_HOME/skills"
    return
  fi

  if [ -d "$HOME/.codex/skills" ]; then
    TARGET_DIR="$HOME/.codex/skills"
    return
  fi

  if [ -d "$HOME/.claude/skills" ]; then
    TARGET_DIR="$HOME/.claude/skills"
    return
  fi
}

fetch_url() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$1"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -qO- "$1"
    return
  fi

  echo "Error: curl or wget is required." >&2
  exit 1
}

skill_path() {
  case "$1" in
    hard-feedback) echo "Everyday-Help/hard-feedback/SKILL.md" ;;
    three-sentence) echo "Everyday-Help/three-sentence/SKILL.md" ;;
    promptme) echo "Everyday-Help/promptme/SKILL.md" ;;
    job-search) echo "Career-Help/job-search/SKILL.md" ;;
    onepage-resume) echo "Career-Help/onepage-resume/SKILL.md" ;;
    *)
      echo "Error: unsupported skill: $1" >&2
      exit 1
      ;;
  esac
}

install_skill() {
  SKILL_NAME="$1"
  REMOTE_PATH="$(skill_path "$SKILL_NAME")"
  DEST_DIR="$TARGET_DIR/$SKILL_NAME"
  DEST_FILE="$DEST_DIR/SKILL.md"
  TMP_FILE="$DEST_FILE.tmp"

  mkdir -p "$DEST_DIR"
  if ! fetch_url "$RAW_BASE/$REMOTE_PATH" > "$TMP_FILE"; then
    rm -f "$TMP_FILE"
    echo "Error: failed to download $SKILL_NAME from $SOURCE_REPO." >&2
    exit 1
  fi

  if [ ! -s "$TMP_FILE" ]; then
    rm -f "$TMP_FILE"
    echo "Error: downloaded SKILL.md for $SKILL_NAME is empty." >&2
    exit 1
  fi

  if ! grep -q "^name: $SKILL_NAME\$" "$TMP_FILE"; then
    rm -f "$TMP_FILE"
    echo "Error: downloaded file did not validate as $SKILL_NAME." >&2
    exit 1
  fi

  mv "$TMP_FILE" "$DEST_FILE"
  echo "Installed $SKILL_NAME -> $DEST_FILE"
}

detect_target_dir

if [ -z "$TARGET_DIR" ]; then
  echo "Error: could not detect your agent skills directory." >&2
  echo "Run again with: install.sh --dir /path/to/agent/skills [skill-name|all]" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"

case "$REQUESTED_SKILL" in
  all)
    install_skill hard-feedback
    install_skill three-sentence
    install_skill promptme
    install_skill job-search
    install_skill onepage-resume
    ;;
  *)
    install_skill "$REQUESTED_SKILL"
    ;;
esac

echo "Source: $SOURCE_REPO"
