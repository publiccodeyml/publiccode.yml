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

#: Releases are ``vMAJOR.MINOR.PATCH`` tags. The next release is drafted
#: on a mutable ``MAJOR.MINOR-rc`` branch until it gets tagged.
BRANCH_REGEX = r"^(?P<major>\d+)\.(?P<minor>\d+)-rc$"
TAG_REGEX = r"^v(?P<major>\d+)\.(?P<minor>\d+)\.(?P<patch>\d+)$"

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
        GitRef("v0.7.0", "", "", GitRefType.TAG, datetime.fromtimestamp(1)),
    ],
    "current": GitRef("v0.7.0", "", "", GitRefType.TAG, datetime.fromtimestamp(1)),
}

MOCK = False
SEQUENTIAL = False

apply_overrides(globals())

root = Git.root(Path(__file__).parent)
src = Path(SOURCE_DIR)
version_pattern = re.compile(
    r"^v?(?P<major>\d+)\.(?P<minor>\d+)(?:\.(?P<patch>\d+))?(?P<rc>-rc)?$"
)

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
    return (
        int(match["major"]),
        int(match["minor"]),
        int(match["patch"] or 0),
        match["rc"] is None,
    )


def rank(rev):
    """Newest major first, then a release before its candidate, then newest
    minor and patch."""
    major, minor, patch, stable = parse(rev.name)
    return major, stable, minor, patch


def line(rev):
    return f"v{parse(rev.name)[0]}"


class Lines(Git):
    """Build one revision per major line: the newest release tag, or the
    draft branch if none."""

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
        {"name": rev.name, "dir": line(rev), "prerelease": not parse(rev.name)[3]}
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
                "no versions found: poly.py builds the local vX.Y.Z tags and "
                "X.Y-rc branches. Run git fetch --tags and create the draft "
                "branches (e.g. git branch 1.0-rc origin/1.0-rc)"
            )
        data = catalog(self.targets)
        if not MOCK and data["default"]["prerelease"]:
            sys.exit(
                "no release tag matched: the site root would point at a "
                "pre-release draft. Run git fetch --tags to get the vX.Y.Z "
                "release tags."
            )
        await super().build_root()
        write_redirects(self.output_dir, "local" if MOCK else data["default"]["dir"])


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
