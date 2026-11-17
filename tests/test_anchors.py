"""Cross references must use stable heading permalinks."""

import subprocess
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class Links(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.sections = []
        self.links = []
        self.references = []
        self.current_link = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section":
            self.sections.append(attrs.get("id"))
        if tag == "a":
            self.current_link = attrs.get("href")
            self.links.append((attrs.get("class", ""), self.current_link))
        if tag == "span" and "std-ref" in attrs.get("class", "").split():
            self.references.append(self.current_link)


class AnchorTests(unittest.TestCase):
    def test_required_and_optional_keys_share_section_links(self):
        for marker in (" *(required)*", ""):
            with self.subTest(marker=marker), tempfile.TemporaryDirectory() as tmp:
                source = Path(tmp) / "source"
                output = Path(tmp) / "html"
                source.mkdir()
                heading = "``url``" + marker
                (source / "index.rst").write_text(
                    "Anchor checks\n=============\n\n"
                    ":ref:`url-key` and :ref:`URL <url-key>`.\n\n"
                    ":ref:`date-type` and :ref:`Date <date-type>`.\n\n"
                    ".. _url-key:\n\n"
                    f"{heading}\n{'-' * len(heading)}\n\n"
                    "Repository URL.\n\n"
                    ".. _date-type:\n\n"
                    "Date\n----\n\nCalendar date.\n"
                )
                result = subprocess.run(
                    [sys.executable, "-m", "sphinx", "-W", "--keep-going",
                     "-b", "html", "-c", str(ROOT), str(source), str(output)],
                    capture_output=True, text=True,
                )
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                page = Links((output / "index.html").read_text())
                for anchor in ("url", "date"):
                    self.assertIn(anchor, page.sections)
                    self.assertIn(("headerlink", f"#{anchor}"), page.links)
                    self.assertEqual(page.references.count(f"#{anchor}"), 2)


if __name__ == "__main__":
    unittest.main()
