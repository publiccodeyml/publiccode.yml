"""Legacy URLs must keep pointing to the page now holding their content."""

import re
import runpy
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from sphinx_polyversion import DefaultDriver


with patch("sphinx_polyversion.apply_overrides"), patch.object(DefaultDriver, "run"):
    config = runpy.run_path(str(Path(__file__).resolve().parents[1] / "poly.py"))
write_redirects = config["write_redirects"]
write_moved_pages = config["write_moved_pages"]

OLD_PAGES = ("schema.core", "categories-list", "scope-list", "aliases-list")


class RedirectTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.out = Path(self.tmp.name)

    def page(self, path):
        page = self.out / path
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text("original page")

    def assert_target(self, path, target):
        stub = (self.out / path).read_text()
        self.assertIn(f'<link rel="canonical" href="{target}">', stub)
        self.assertIn(f'content="0; url={target}"', stub)
        self.assertIn(
            f'location.replace("{target}" + location.search + location.hash)', stub
        )

    def test_legacy_urls_stay_on_v0_after_v1_release(self):
        for path in (
            "v1/index.html", "v1/schema.core.html", "v1/new.html",
            "v0/index.html", "v0/schema.core.html", "v0/schema.it.html",
            "v0/country.html",
        ):
            self.page(path)
        write_redirects(self.out)
        self.assert_target("index.html", "v0/")
        self.assert_target("schema.core.html", "v0/schema.core.html")
        self.assert_target("schema.it.html", "v0/schema.it.html")
        self.assert_target("country.html", "v0/country.html")
        self.assertFalse((self.out / "new.html").exists())
        self.assertEqual((self.out / "v0/schema.it.html").read_text(), "original page")
        self.assertEqual((self.out / "v1/index.html").read_text(), "original page")

    def test_local_preview_and_nested_pages(self):
        self.page("local/index.html")
        self.page("local/nested/page.html")
        write_redirects(self.out, "local")
        self.assert_target("index.html", "local/")
        self.assert_target("nested/page.html", "../local/nested/page.html")

    def follow(self, path, anchor=""):
        """The URL the redirect at path sends a browser to, run in node."""
        script = re.search(
            r"<script>(.*)</script>", (self.out / path).read_text(), re.S
        ).group(1)
        harness = (
            "const location = {hash: process.argv[1],"
            " replace(url) { console.log(url); }};\n" + script
        )
        result = subprocess.run(
            ["node", "-e", harness, anchor], capture_output=True, text=True
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        return result.stdout.strip()

    def test_versions_with_the_new_layout_redirect_the_old_pages(self):
        self.page("v1/index.html")
        for page in ("index", *OLD_PAGES):
            self.page(f"v0/{page}.html")
        write_moved_pages(self.out / "v1")
        write_moved_pages(self.out / "v0")
        for page in OLD_PAGES:
            self.assertEqual((self.out / f"v0/{page}.html").read_text(), "original page")
        for page, target in (
            ("schema.core.html", "index.html"),
            ("categories-list.html", "vocabularies.html#categories"),
            ("scope-list.html", "vocabularies.html#scopes"),
            ("aliases-list.html", "vocabularies.html#aliases"),
        ):
            with self.subTest(page=page):
                stub = (self.out / "v1" / page).read_text()
                self.assertIn(f'<link rel="canonical" href="{target}">', stub)
                self.assertIn(f'content="0; url={target}"', stub)
                self.assertEqual(self.follow(f"v1/{page}"), target)
                if page != "schema.core.html":
                    self.assertEqual(self.follow(f"v1/{page}", "#valid-tags"), target)

    def test_old_key_and_type_anchors_find_their_new_place(self):
        self.page("v0/index.html")
        write_moved_pages(self.out / "v0")
        for anchor, target in (
            ("#top-level-keys-and-sections", "index.html#specification"),
            ("#key-name", "index.html#name"),
            ("#section-organisation", "index.html#organisation"),
            ("#key-organisation-uri", "index.html#organisation-uri"),
            ("#key-dependson-open-deprecated", "index.html#dependson-open-deprecated"),
            ("#encoding", "index.html#encoding"),
            ("#special-data-formats", "types.html"),
            ("#organisation", "types/organisation.html"),
            ("#contact", "types/contact.html"),
            ("#contractor", "types/contractor.html"),
            ("#dependency", "types/dependency.html"),
            ("#complex-versioning", "types/dependency.html#complex-versioning"),
            ("#dates", "types/date.html"),
            ("#constructor", "index.html#constructor"),
        ):
            with self.subTest(anchor=anchor):
                self.assertEqual(self.follow("v0/schema.core.html", anchor), target)

    def test_unversioned_urls_of_moved_pages_still_resolve(self):
        self.page("v0/index.html")
        write_moved_pages(self.out / "v0")
        write_redirects(self.out)
        self.assert_target("schema.core.html", "v0/schema.core.html")
        self.assert_target("categories-list.html", "v0/categories-list.html")


if __name__ == "__main__":
    unittest.main()
