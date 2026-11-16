"""Legacy unversioned URLs must keep pointing to v0 documentation."""

import runpy
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from sphinx_polyversion import DefaultDriver


with patch("sphinx_polyversion.apply_overrides"), patch.object(DefaultDriver, "run"):
    config = runpy.run_path(str(Path(__file__).resolve().parents[1] / "poly.py"))
write_redirects = config["write_redirects"]


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


if __name__ == "__main__":
    unittest.main()
