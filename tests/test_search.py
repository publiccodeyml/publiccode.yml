"""The site search must lead to a key when a reader types its name."""

import json
import re
import subprocess
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

# The pages that define keys, per specification version.
KEY_PAGES = {
    "v0": ("index", "country"),
    "v1": ("index",),
}

KEY_HEADING = re.compile(r"^(?:(?:Key|Section) )?(\S+)(?: \(required\)| \(deprecated\))?$")


class KeyHeadings(HTMLParser):
    """Collect the key headings and the index anchors right above them."""

    def __init__(self, html):
        super().__init__()
        self.headings = []
        self.anchors = []
        self.heading = None
        self.code = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("h3", "h4", "h5"):
            self.heading = {"text": "", "code": "", "anchors": self.anchors}
            self.anchors = []
        elif tag == "span" and (attrs.get("id") or "").startswith("index-"):
            self.anchors.append(attrs["id"])
        elif tag == "a" and self.heading is not None:
            # The permalink sign is not part of the heading text.
            self.code = None
        elif tag == "code" and self.heading is not None:
            self.code = True

    def handle_endtag(self, tag):
        if tag == "code":
            self.code = False
        elif tag in ("h3", "h4", "h5") and self.heading is not None:
            if self.heading["code"]:
                self.headings.append(self.heading)
            self.heading = None
            self.code = False

    def handle_data(self, data):
        if self.heading is None or self.code is None:
            return
        self.heading["text"] += data
        if self.code:
            self.heading["code"] += data


class SearchTests(unittest.TestCase):
    def test_key_names_find_their_heading_in_the_search_index(self):
        for version, pages in KEY_PAGES.items():
            with self.subTest(version=version), tempfile.TemporaryDirectory() as tmp:
                output = Path(tmp)
                subprocess.run(
                    [sys.executable, "-m", "sphinx", "-W", "-q", "-c", str(ROOT),
                     str(ROOT / "spec" / version), str(output)],
                    check=True,
                )
                index = json.loads(
                    re.fullmatch(
                        r"Search\.setIndex\((.*)\)",
                        (output / "searchindex.js").read_text().strip(),
                        re.S,
                    ).group(1)
                )
                entries = index["indexentries"]

                headings = {}
                for page in pages:
                    html = (output / f"{page}.html").read_text()
                    for heading in KeyHeadings(html).headings:
                        text = " ".join(heading["text"].split())
                        match = KEY_HEADING.fullmatch(text)
                        self.assertIsNotNone(match, text)
                        self.assertEqual(match.group(1), heading["code"])
                        headings[(page, heading["code"])] = heading["anchors"]
                self.assertTrue(headings)

                top_level = {key for _, key in headings if "/" not in key}
                for (page, key), anchors in headings.items():
                    with self.subTest(key=key):
                        leaf = key.rsplit("/", 1)[-1]
                        found = [
                            (anchor, main)
                            for file, anchor, main in entries.get(leaf.lower(), [])
                            if index["docnames"][file] == page and anchor in anchors
                        ]
                        # A nested key named like a top-level key comes
                        # after it in the results.
                        main = "/" not in key or leaf not in top_level
                        self.assertEqual(len(found), 1, f"no index entry for {key}")
                        self.assertEqual(found[0][1], main, key)


if __name__ == "__main__":
    unittest.main()
