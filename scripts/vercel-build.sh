#!/bin/sh
set -e

env | grep '^UV_' || true

# The image exports UV_ variables that poison any uv it runs:
# pin our own uv, interpreter location and download policy.
unset UV_PYTHON_DOWNLOADS_JSON_URL UV_PYTHON_INSTALL_MIRROR
export UV_PYTHON_INSTALL_DIR=.uv-python
export UV_PYTHON_DOWNLOADS=automatic
export UV_PYTHON_PREFERENCE=managed
export LC_ALL=C.UTF-8

# CLI deploys upload the files with no .git and no VERCEL_GIT_ vars:
# bootstrap a repo and commit the upload, poly.py builds the drafts
# from HEAD. Commit before the uv install writes .uv/ and .uv-python/
# into the tree.
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  git init -q .
  git add -A
  git -c user.name=vercel -c user.email=vercel@localhost \
    -c commit.gpgsign=false commit -q --no-verify -m 'CLI deploy'
fi

curl -LsSf https://astral.sh/uv/0.12.5/install.sh |
  UV_INSTALL_DIR=.uv UV_NO_MODIFY_PATH=1 sh

# The clone has no tags: get the releases, the drafts come from HEAD.
git fetch --depth=1 \
  "https://github.com/${VERCEL_GIT_REPO_OWNER:-publiccodeyml}/${VERCEL_GIT_REPO_SLUG:-publiccode.yml}.git" \
  '+refs/tags/v*:refs/tags/v*'

./.uv/uv run sphinx-polyversion poly.py build/html
