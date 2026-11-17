"""The site title must link home from every documentation depth."""

from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


class HomeLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and "home-link" in attrs.get("class", "").split():
            self.targets.append(attrs.get("href"))


class NavigationTests(unittest.TestCase):
    def test_home_link_resolves_to_configured_root(self):
        templates = Path(__file__).resolve().parents[1] / "_templates"
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source"
            output = Path(directory) / "html"
            (source / "types").mkdir(parents=True)
            (source / "conf.py").write_text(
                f"templates_path = [{str(templates)!r}]\n"
                "html_theme = 'press'\n"
                "root_doc = 'start'\n"
            )
            (source / "start.rst").write_text(
                "Home\n====\n\n.. toctree::\n\n   types/string\n"
            )
            (source / "types/string.rst").write_text("String\n======\n")
            subprocess.run(
                [sys.executable, "-m", "sphinx", "-W", "-q",
                 str(source), str(output)],
                check=True,
            )
            for page, target in (
                ("start.html", "#"),
                ("types/string.html", "../start.html"),
            ):
                with self.subTest(page=page):
                    parser = HomeLinks()
                    parser.feed((output / page).read_text())
                    self.assertEqual(parser.targets, [target])
                    self.assertEqual(
                        ((output / page).parent / target.split("#")[0])
                        .resolve() if target != "#" else (output / page).resolve(),
                        (output / "start.html").resolve(),
                    )


if __name__ == "__main__":
    unittest.main()
