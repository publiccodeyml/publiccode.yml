"""Every page and anchor the website publishes for a release must keep
working in the current specification of that version, on the same page
or through the redirect that replaces a page."""

import asyncio
import io
import json
import re
import runpy
import subprocess
import sys
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from sphinx_polyversion import DefaultDriver
from sphinx_polyversion.git import GitRefType


ROOT = Path(__file__).resolve().parents[1]

with patch("sphinx_polyversion.apply_overrides"), patch.object(DefaultDriver, "run"):
    config = runpy.run_path(str(ROOT / "poly.py"))

# The numbered ids of index entries and of duplicate labels shift
# whenever one is added, and no link relies on them.
ANCHOR = re.compile(r'<[a-z]+ [^>]*\bid="(?!index-\d+"|id\d+")([^"]+)"')

# Sphinx regenerates these on every build, with no anchors of their own.
GENERATED = {"genindex.html", "search.html"}

# Runs the script of a redirect page once per anchor and prints where
# each one leads.
FOLLOW = """
const [script, hashes] = process.argv.slice(1);
console.log(JSON.stringify(JSON.parse(hashes).map((hash) => {
  let target;
  new Function("location", script)({hash, replace(url) { target = url; }});
  return target;
})));
"""


def build(source, output):
    subprocess.run(
        [sys.executable, "-m", "sphinx", "-q", "-b", "html", "-c", str(ROOT),
         str(source), str(output)],
        check=True, capture_output=True,
    )


def anchors(output):
    return {
        page.relative_to(output).as_posix(): set(ANCHOR.findall(page.read_text()))
        for page in output.rglob("*.html")
        if not page.relative_to(output).parts[0].startswith("_")
        and page.name not in GENERATED
    }


def follow(stub, hashes):
    script = re.search(r"<script>(.*)</script>", stub.read_text(), re.S).group(1)
    result = subprocess.run(
        ["node", "-e", FOLLOW, script, json.dumps(hashes)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(result.stdout)


class PublishedUrlTests(unittest.TestCase):
    def test_release_urls_resolve_in_the_current_specification(self):
        releases = [
            rev for rev in asyncio.run(config["vcs"].retrieve(ROOT))
            if rev.type_ == GitRefType.TAG
        ]
        self.assertTrue(releases, "no vX.Y.Z release tag, run git fetch --tags")
        for rev in releases:
            version = config["line"](rev)
            with self.subTest(release=rev.name), tempfile.TemporaryDirectory() as tmp:
                tmp = Path(tmp)
                path = asyncio.run(config["source"](ROOT, rev))
                archive = subprocess.run(
                    ["git", "archive", rev.obj, path],
                    cwd=ROOT, capture_output=True, check=True,
                ).stdout
                with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
                    tar.extractall(tmp / "release", filter="data")
                build(tmp / "release" / path, tmp / "published")
                build(ROOT / "spec" / version, tmp / "current")

                published = anchors(tmp / "published")
                current = anchors(tmp / "current")
                config["write_moved_pages"](tmp / "current")

                broken = []
                for page, ids in sorted(published.items()):
                    if page in current:
                        broken += [f"{page}#{id}" for id in sorted(ids - current[page])]
                        continue
                    stub = tmp / "current" / page
                    if not stub.exists():
                        broken.append(page)
                        continue
                    hashes = ["", *(f"#{id}" for id in sorted(ids))]
                    for hash, target in zip(hashes, follow(stub, hashes)):
                        target_page, _, target_id = target.partition("#")
                        if target_page not in current or (
                            target_id and target_id not in current[target_page]
                        ):
                            broken.append(f"{page}{hash} -> {target}")
                self.assertEqual(broken, [])


if __name__ == "__main__":
    unittest.main()
