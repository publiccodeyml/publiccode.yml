"""sphinx-polyversion config: one website out of every version line.

Run with ``uv run sphinx-polyversion poly.py build/html`` (add ``-l`` to
preview the current checkout only, with a mocked version list).
"""

import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path, PurePath

from sphinx_polyversion import DefaultDriver, apply_overrides
from sphinx_polyversion.environment import Environment
from sphinx_polyversion.git import Git, GitRef, GitRefType, file_exists
from sphinx_polyversion.sphinx import SphinxBuilder

#: Releases are ``vMAJOR.MINOR.PATCH`` tags. A major version with no
#: release yet is a draft, built from the checkout (main on the website)
#: and named ``MAJOR.0-rc``.
TAG_REGEX = r"^v(?P<major>\d+)\.(?P<minor>\d+)\.(?P<patch>\d+)$"

#: Branches are never built, the drafts come from the checkout.
BRANCH_REGEX = r"(?!)"

#: One subdirectory per major line (``v0/``, ``v1/``) holding its newest
#: release, so links stay stable across minor releases, plus redirects at
#: the root for the unversioned URLs published before this layout.
OUTPUT_DIR = "build/html"

#: Each major version keeps its doc source in ``spec/vMAJOR``. Releases
#: tagged before that layout have it in ``docs/standard``. conf.py stays
#: at the repo root and is shared by every version: sphinx runs against
#: this checkout's conf.py and templates while the .rst files come from
#: the revision being built.
SPEC_ROOT = "spec"
LEGACY_SOURCE_DIR = "docs/standard"

#: Extra arguments for sphinx-build.
SPHINX_ARGS = ""

#: Used only for local builds (``-l``): renders the switcher without git
#: and builds the checkout's draft.
MOCK_DATA = {
    "revisions": [
        GitRef("1.0-rc", "", "", GitRefType.BRANCH, datetime.fromtimestamp(2)),
        GitRef("v0.8.0", "", "", GitRefType.TAG, datetime.fromtimestamp(1)),
    ],
    "current": GitRef("1.0-rc", "", "", GitRefType.BRANCH, datetime.fromtimestamp(2)),
}

MOCK = False
SEQUENTIAL = False

apply_overrides(globals())

root = Git.root(Path(__file__).parent)
version_pattern = re.compile(
    r"^v?(?P<major>\d+)\.(?P<minor>\d+)(?:\.(?P<patch>\d+))?(?P<rc>-rc)?$"
)

#: Pages published before a version took the layout of version 1, with
#: the page now holding their content. Each maps to its target and, for
#: a page whose anchors stay meaningful, the anchors that moved
#: elsewhere. schema.core.html also held the types, which now have pages
#: of their own. Its key anchors need no entry: the redirect drops the
#: key- and section- prefixes of the old "Key ``name``" headings.
MOVED_PAGES = {
    "schema.core.html": ("index.html", {
        "core": "index.html#specification",
        "the-standard": "index.html#specification",
        "top-level-keys-and-sections": "index.html#specification",
        "special-data-formats": "types.html",
        "dependency": "types/dependency.html",
        "complex-versioning": "types/dependency.html#complex-versioning",
        "contact": "types/contact.html",
        "organisation": "types/organisation.html",
        "contractor": "types/contractor.html",
        "dates": "types/date.html",
    }),
    "categories-list.html": ("vocabularies.html#categories", None),
    "scope-list.html": ("vocabularies.html#scopes", None),
    "aliases-list.html": ("vocabularies.html#aliases", None),
}

REDIRECT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>publiccode.yml Standard</title>
<link rel="canonical" href="{target}">
<meta http-equiv="refresh" content="0; url={target}">
<script>{script}</script>
</head>
<body>
<p>Moved to <a href="{target}">{target}</a>.</p>
</body>
</html>
"""


def redirect(target, script=None):
    if script is None:
        script = f'location.replace("{target}" + location.search + location.hash);'
    return REDIRECT.format(target=target, script=script)


def moved_page(target, anchors):
    if anchors is None:
        return redirect(target, f"location.replace({json.dumps(target)});")
    return redirect(target, (
        "var anchor = location.hash.slice(1);\n"
        f"var moved = {json.dumps(anchors)};\n"
        "location.replace(moved.hasOwnProperty(anchor) ? moved[anchor] :\n"
        f"  {json.dumps(target)} + "
        '(anchor && "#" + anchor.replace(/^(?:key|section)-/, "")));'
    ))


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


async def source(repo, rev):
    """The directory holding the doc source of rev, or None."""
    for path in (f"{SPEC_ROOT}/{line(rev)}", LEGACY_SOURCE_DIR):
        if await file_exists(repo, rev, PurePath(path)):
            return path
    return None


async def has_source(repo, rev):
    return await source(repo, rev) is not None


def git(repo, *args):
    return subprocess.run(
        ["git", *args], cwd=repo, check=True, capture_output=True, text=True
    ).stdout


def drafts(repo):
    """One draft per spec/vMAJOR directory of the checked out commit."""
    commit = git(repo, "rev-parse", "HEAD").strip()
    date = datetime.fromisoformat(git(repo, "log", "-1", "--format=%cI", commit).strip())
    for path in git(repo, "ls-tree", "-d", "--name-only", commit, f"{SPEC_ROOT}/").split():
        match = re.fullmatch(rf"{SPEC_ROOT}/v(\d+)", path)
        if match:
            yield GitRef(f"{match[1]}.0-rc", commit, "HEAD", GitRefType.BRANCH, date)


class Lines(Git):
    """Build one revision per major line: the newest release tag, or a
    draft from the checkout while the major has no release."""

    async def retrieve(self, root):
        best = {}
        for ref in await super().retrieve(root):
            key = line(ref)
            if key not in best or rank(ref) > rank(best[key]):
                best[key] = ref
        for draft in drafts(root):
            best.setdefault(line(draft), draft)
        return tuple(best.values())


class Builders(dict):
    """One sphinx builder per doc source directory, made on first use."""

    def __missing__(self, path):
        builder = self[path] = SphinxBuilder(
            Path(path), args=["-c", str(root), *SPHINX_ARGS.split()]
        )
        return builder


async def select_source(rev, paths):
    # A local build (-l) copies the working tree: its revisions are mocks
    # with no git object to look into.
    if MOCK:
        return f"{SPEC_ROOT}/{line(rev)}"
    return await source(root, rev)


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


def write_redirects(out, version="v0"):
    """Keep legacy unversioned URLs pointing to the v0 documentation."""
    for page in (out / version).rglob("*.html"):
        rel = page.relative_to(out / version)
        target = "../" * (len(rel.parts) - 1) + f"{version}/{rel.as_posix()}"
        if rel.as_posix() == "index.html":
            target = f"{version}/"
        stub = out / rel
        stub.parent.mkdir(parents=True, exist_ok=True)
        stub.write_text(redirect(target))


def write_moved_pages(version_dir):
    """Redirect the pages a built version no longer has, so the links
    published before the version 1 layout keep working."""
    for page, (target, anchors) in MOVED_PAGES.items():
        stub = version_dir / page
        if not stub.exists():
            stub.write_text(moved_page(target, anchors))


class Driver(DefaultDriver):
    def build_failed(self, rev, exc_info):
        super().build_failed(rev, exc_info)
        # A broken version must fail the run, not publish a partial website.
        raise exc_info[1]

    async def build_root(self):
        if not self.targets:
            sys.exit(
                "no versions found: poly.py builds the local vX.Y.Z tags and "
                f"the {SPEC_ROOT}/vN directories of the checkout. Run "
                "git fetch --tags"
            )
        data = catalog(self.targets)
        if not MOCK and data["default"]["prerelease"]:
            sys.exit(
                "no release tag matched: the site root would point at a "
                "pre-release draft. Run git fetch --tags to get the vX.Y.Z "
                "release tags."
            )
        await super().build_root()
        for version in ["local"] if MOCK else [v["dir"] for v in data["versions"]]:
            write_moved_pages(self.output_dir / version)
        write_redirects(self.output_dir, "local" if MOCK else "v0")


vcs = Lines(branch_regex=BRANCH_REGEX, tag_regex=TAG_REGEX, predicate=has_source)

# All version lines share the same doc toolchain, so reuse the active
# environment instead of provisioning one per build.
Driver(
    root,
    OUTPUT_DIR,
    vcs=vcs,
    builder=Builders(),
    selector=select_source,
    env=Environment.factory(),
    namer=line,
    data_factory=page_data,
    root_data_factory=root_data,
    template_dir=root / "templates",
    mock=MOCK_DATA,
).run(MOCK, SEQUENTIAL)
