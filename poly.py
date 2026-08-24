"""sphinx-polyversion config: one website out of every version line.

Run with ``uv run sphinx-polyversion poly.py build/html`` (add ``-l`` to
preview the current checkout only, with a mocked version list).
"""

import re
import sys
from datetime import datetime
from pathlib import Path

from sphinx_polyversion import DefaultDriver, apply_overrides
from sphinx_polyversion.environment import Environment
from sphinx_polyversion.git import Git, GitRef, GitRefType, file_predicate
from sphinx_polyversion.sphinx import SphinxBuilder

#: Version lines live on mutable branches: ``vMAJOR.MINOR`` once released,
#: ``MAJOR.MINOR-rc`` while the next release is being drafted. No tags.
BRANCH_REGEX = r"^v?(?P<major>\d+)\.(?P<minor>\d+)(?P<rc>-rc)?$"
TAG_REGEX = r"^$"

#: One subdirectory per major line (``v0/``, ``v1/``) holding its newest
#: branch, so links stay stable across minor releases, plus redirects at
#: the root for the unversioned URLs published before this layout.
OUTPUT_DIR = "build/html"

#: Doc source inside each revision. conf.py stays at the repo root and is
#: shared by every version: sphinx runs against this checkout's conf.py
#: and templates while the .rst files come from the revision being built.
SOURCE_DIR = "docs/standard"

#: Extra arguments for sphinx-build.
SPHINX_ARGS = ""

#: Used only for local builds (``-l``): renders the switcher without git.
MOCK_DATA = {
    "revisions": [
        GitRef("1.0-rc", "", "", GitRefType.BRANCH, datetime.fromtimestamp(2)),
        GitRef("v0.7", "", "", GitRefType.BRANCH, datetime.fromtimestamp(1)),
    ],
    "current": GitRef("v0.7", "", "", GitRefType.BRANCH, datetime.fromtimestamp(1)),
}

MOCK = False
SEQUENTIAL = False

apply_overrides(globals())

root = Git.root(Path(__file__).parent)
src = Path(SOURCE_DIR)
version_pattern = re.compile(BRANCH_REGEX)

REDIRECT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>publiccode.yml Standard</title>
<link rel="canonical" href="{target}">
<meta http-equiv="refresh" content="0; url={target}">
<script>location.replace("{target}" + location.hash);</script>
</head>
<body>
<p>Moved to <a href="{target}">{target}</a>.</p>
</body>
</html>
"""


def parse(name):
    match = version_pattern.fullmatch(name)
    return int(match["major"]), int(match["minor"]), match["rc"] is None


def rank(rev):
    """Newest major first, then a release before its candidate, then newest minor."""
    major, minor, stable = parse(rev.name)
    return major, stable, minor


def line(rev):
    return f"v{parse(rev.name)[0]}"


class Lines(Git):
    """Build one branch per major line: the newest release, or the candidate if none."""

    async def retrieve(self, root):
        best = {}
        for ref in await super().retrieve(root):
            key = line(ref)
            if key not in best or rank(ref) > rank(best[key]):
                best[key] = ref
        return tuple(best.values())


def catalog(revisions):
    """Plain dicts for the templates, newest line first."""
    versions = [
        {"name": rev.name, "dir": line(rev), "prerelease": not parse(rev.name)[2]}
        for rev in sorted(revisions, key=rank, reverse=True)
    ]
    stable = [v for v in versions if not v["prerelease"]]
    latest = stable[0] if stable else None
    for v in versions:
        v["latest"] = v is latest
    return {"versions": versions, "latest": latest, "default": latest or versions[0]}


def page_data(driver, rev, env):
    data = catalog(driver.targets)
    data["current"] = next(v for v in data["versions"] if v["name"] == rev.name)
    return data


def root_data(driver):
    return catalog(driver.targets)


def write_redirects(out, default):
    """Keep the unversioned URLs alive: the root and every page of the default
    version redirect into its directory, fragment included."""
    for page in (out / default).rglob("*.html"):
        rel = page.relative_to(out / default)
        target = "../" * (len(rel.parts) - 1) + f"{default}/{rel.as_posix()}"
        if rel.as_posix() == "index.html":
            target = f"{default}/"
        stub = out / rel
        stub.parent.mkdir(parents=True, exist_ok=True)
        stub.write_text(REDIRECT.format(target=target))


class Driver(DefaultDriver):
    def build_failed(self, rev, exc_info):
        super().build_failed(rev, exc_info)
        # A broken version must fail the run, not publish a partial website.
        raise exc_info[1]

    async def build_root(self):
        if not self.targets:
            sys.exit(
                "no version branches found: poly.py builds the local branches "
                "matching BRANCH_REGEX, create them first "
                "(e.g. git branch v0.7 origin/v0.7)"
            )
        await super().build_root()
        default = "local" if MOCK else catalog(self.targets)["default"]["dir"]
        write_redirects(self.output_dir, default)


# All version lines share the same doc toolchain, so reuse the active
# environment instead of provisioning one per build.
Driver(
    root,
    OUTPUT_DIR,
    vcs=Lines(
        branch_regex=BRANCH_REGEX,
        tag_regex=TAG_REGEX,
        predicate=file_predicate([src]),
    ),
    builder=SphinxBuilder(src, args=["-c", str(root), *SPHINX_ARGS.split()]),
    env=Environment.factory(),
    namer=line,
    data_factory=page_data,
    root_data_factory=root_data,
    template_dir=root / "templates",
    mock=MOCK_DATA,
).run(MOCK, SEQUENTIAL)
