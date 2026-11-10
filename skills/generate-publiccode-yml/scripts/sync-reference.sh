#!/usr/bin/env bash
# Sync the skill's reference material from the Standard's source of truth.
# Run after any change to docs/standard/ (or after bumping to a new
# release tag) so the skill always documents the released Standard.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SRC="$REPO_ROOT/docs/standard"
DST="$REPO_ROOT/skills/publiccode/reference"

for f in schema.core.rst categories-list.rst scope-list.rst aliases-list.rst; do
  cp "$SRC/$f" "$DST/$f"
done

cp "$SRC/example/publiccode.minimal.yml" "$DST/examples/publiccode.minimal.yml"
cp "$SRC/example/publiccode.yml"         "$DST/examples/publiccode.yml"

echo "Reference material synced from docs/standard (revision $(git -C "$REPO_ROOT" rev-parse --short HEAD))."
