"""The website publishes each major version from its newest release tag,
or as a draft from the checkout while the major has no release."""

import asyncio
import runpy
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from sphinx_polyversion import DefaultDriver
from sphinx_polyversion.git import GitRefType


with patch("sphinx_polyversion.apply_overrides"), patch.object(DefaultDriver, "run"):
    config = runpy.run_path(str(Path(__file__).resolve().parents[1] / "poly.py"))
vcs = config["vcs"]
source = config["source"]
catalog = config["catalog"]
line = config["line"]


class VersionTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.repo = Path(tmp.name)
        self.git("init", "-q")

        # Releases up to v0.8.0 keep the specification in docs/standard,
        # like the old 1.0-rc draft branch.
        self.commit("docs/standard/index.rst", "v0.7")
        self.git("tag", "v0.7.0")
        self.commit("docs/standard/index.rst", "v0.8")
        self.git("tag", "v0.8.0")
        self.git("branch", "1.0-rc")

        (self.repo / "spec").mkdir()
        self.git("mv", "docs/standard", "spec/v0")
        self.commit("spec/v1/index.rst", "v1 draft")

    def git(self, *args):
        return subprocess.run(
            ["git", "-c", "user.name=Test", "-c", "user.email=test@example.org",
             "-c", "commit.gpgsign=false", "-c", "tag.gpgsign=false", *args],
            cwd=self.repo, check=True, capture_output=True, text=True,
        ).stdout.strip()

    def commit(self, path, text):
        file = self.repo / path
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(text)
        self.git("add", "-A")
        self.git("commit", "-q", "-m", text)

    def lines(self):
        revisions = asyncio.run(vcs.retrieve(self.repo))
        return {line(rev): rev for rev in revisions}

    def source_of(self, rev):
        return asyncio.run(source(self.repo, rev))

    def test_unreleased_major_is_a_draft_from_the_checkout(self):
        lines = self.lines()
        self.assertEqual(sorted(lines), ["v0", "v1"])

        self.assertEqual(lines["v0"].name, "v0.8.0")
        self.assertEqual(lines["v0"].type_, GitRefType.TAG)
        self.assertEqual(self.source_of(lines["v0"]), "docs/standard")

        self.assertEqual(lines["v1"].name, "1.0-rc")
        self.assertEqual(lines["v1"].obj, self.git("rev-parse", "HEAD"))
        self.assertEqual(self.source_of(lines["v1"]), "spec/v1")

        data = catalog(lines.values())
        self.assertEqual(data["latest"]["name"], "v0.8.0")
        self.assertEqual(data["default"]["name"], "v0.8.0")
        self.assertTrue(next(v for v in data["versions"] if v["dir"] == "v1")["prerelease"])

    def test_release_tag_replaces_the_draft(self):
        self.git("tag", "v1.0.0")
        lines = self.lines()

        self.assertEqual(lines["v1"].name, "v1.0.0")
        self.assertEqual(lines["v1"].type_, GitRefType.TAG)
        self.assertEqual(self.source_of(lines["v1"]), "spec/v1")

        data = catalog(lines.values())
        self.assertEqual(data["latest"]["name"], "v1.0.0")
        self.assertFalse(any(v["prerelease"] for v in data["versions"]))

    def test_release_after_the_move_reads_its_version_folder(self):
        self.commit("spec/v0/index.rst", "v0.8 fix")
        self.git("tag", "v0.8.1")
        lines = self.lines()

        self.assertEqual(lines["v0"].name, "v0.8.1")
        self.assertEqual(self.source_of(lines["v0"]), "spec/v0")
        self.assertEqual(lines["v1"].name, "1.0-rc")

    def test_new_major_folder_becomes_a_draft(self):
        self.commit("spec/v2/index.rst", "v2 draft")
        lines = self.lines()

        self.assertEqual(lines["v2"].name, "2.0-rc")
        self.assertEqual(self.source_of(lines["v2"]), "spec/v2")
        self.assertEqual(lines["v1"].name, "1.0-rc")


if __name__ == "__main__":
    unittest.main()
