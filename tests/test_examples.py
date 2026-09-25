"""Example coverage includes the properties of every list item."""

import contextlib
import importlib.util
import io
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import yaml


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "check_examples", ROOT / "scripts/check-examples.py"
)
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class ExampleTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.full = Path(tmp.name) / "full.yml"
        self.data = yaml.safe_load((ROOT / checker.FULL).read_text())
        for name in ("SPEC", "TYPES", "MINIMAL"):
            patcher = patch.object(checker, name, ROOT / getattr(checker, name))
            patcher.start()
            self.addCleanup(patcher.stop)
        patcher = patch.object(checker, "FULL", self.full)
        patcher.start()
        self.addCleanup(patcher.stop)

    def check(self, data):
        self.full.write_text(yaml.safe_dump(data))
        output = io.StringIO()
        with contextlib.redirect_stderr(output):
            result = checker.main()
        return result, output.getvalue()

    def test_complete_example(self):
        self.assertEqual(self.check(self.data), (0, ""))

    def test_missing_and_unknown_list_properties(self):
        cases = (
            (("maintenance", "contacts"), "phone"),
            (("maintenance", "contractors"), "website"),
            (("fundedBy",), "uri"),
            (("supports",), "id"),
            (("dependsOn", "open"), "versionMax"),
            (("dependsOn", "proprietary"), "optional"),
            (("dependsOn", "hardware"), "version"),
        )
        for path, prop in cases:
            with self.subTest(path=path, prop=prop):
                data = yaml.safe_load(yaml.safe_dump(self.data))
                items = data
                for key in path:
                    items = items[key]
                for item in items:
                    item.pop(prop, None)
                # Check later items too, rather than only the first item.
                items[-1]["emali"] = "typo@example.com"
                result, errors = self.check(data)
                self.assertEqual(result, 1)
                prefix = "/".join(path) + "/[]/"
                self.assertIn(prefix + prop + " is documented but missing", errors)
                self.assertIn(prefix + "emali is not documented", errors)

    def test_new_type_properties_require_examples(self):
        original = checker.TYPES.read_text()
        for title in ("Contact", "Contractor", "Dependency", "Organisation"):
            with self.subTest(type=title):
                types = self.full.parent / "types.rst"
                heading = title + "\n" + "-" * len(title)
                before, section = original.split(heading, 1)
                types.write_text(before + heading + section.replace(
                    "Properties:",
                    'Properties:\n\n-  ``newProperty``: A new property.',
                    1,
                ))
                with patch.object(checker, "TYPES", types):
                    result, errors = self.check(self.data)
                self.assertEqual(result, 1)
                self.assertIn("/[]/newProperty is documented but missing", errors)

    def test_unknown_property_in_minimal_example(self):
        minimal = self.full.parent / "minimal.yml"
        data = yaml.safe_load(checker.MINIMAL.read_text())
        data["maintenance"]["contacts"][-1]["emali"] = "typo@example.com"
        minimal.write_text(yaml.safe_dump(data))
        with patch.object(checker, "MINIMAL", minimal):
            result, errors = self.check(self.data)
        self.assertEqual(result, 1)
        self.assertIn("maintenance/contacts/[]/emali is not documented", errors)

    def test_short_description_counts_graphemes(self):
        for character in ("e\u0301", "\U0001f469\u200d\U0001f4bb"):
            with self.subTest(character=character):
                data = {"description": {"en": {"shortDescription": character * 150}}}
                self.assertEqual(checker.check_descriptions("example", data), [])

    def test_long_description_counts_graphemes(self):
        data = {"description": {"en": {"longDescription": "e\u0301" * 100}}}
        errors = checker.check_descriptions("example", data)
        self.assertEqual(len(errors), 1)
        self.assertIn("100 characters", errors[0])

    def test_short_description_ignores_surrounding_whitespace(self):
        data = {"description": {"en": {"shortDescription": "  " + "a" * 150 + "  "}}}
        self.assertEqual(checker.check_descriptions("example", data), [])

    def test_short_description_rejects_line_breaks(self):
        for line_break in ("\n", "\r", "\u2028"):
            with self.subTest(line_break=line_break):
                data = {"description": {"en": {"shortDescription": "first" + line_break + "second"}}}
                errors = checker.check_descriptions("example", data)
                self.assertEqual(len(errors), 1)
                self.assertIn("must be one line", errors[0])

    def test_long_description_ignores_surrounding_whitespace(self):
        data = {"description": {"en": {"longDescription": "  " + "a" * 149 + "\n"}}}
        errors = checker.check_descriptions("example", data)
        self.assertEqual(len(errors), 1)
        self.assertIn("149 characters", errors[0])


if __name__ == "__main__":
    unittest.main()
