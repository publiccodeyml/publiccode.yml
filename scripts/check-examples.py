#!/usr/bin/env python3
"""Check the example files against the keys documented in the spec.

Both examples may use only documented keys, and the full example must
use every one of them, so a key added to the spec without an example
fails the build. The description length limits are checked too.
"""

import re
import sys
from pathlib import Path

import yaml

SPEC = Path("docs/standard/index.rst")
MINIMAL = Path("docs/standard/example/publiccode.minimal.yml")
FULL = Path("docs/standard/example/publiccode.yml")

HEADING = re.compile(r"^``([A-Za-z/\[\]]+)``")


def documented_keys():
    lines = SPEC.read_text().splitlines()
    keys = set()
    for line, underline in zip(lines, lines[1:]):
        match = HEADING.match(line)
        if match and underline and set(underline) <= set("~'"):
            keys.add(match[1])
    return keys


def used_keys(node, prefix=""):
    """Key paths of the nested mappings, stopping at lists: list items
    are typed values, documented on the Types page."""
    keys = set()
    for key, value in node.items():
        path = f"{prefix}{key}"
        # The language level is a tag, not a documented key
        if prefix == "description/":
            path = "description/[lang]"
        else:
            keys.add(path)
        if isinstance(value, dict):
            keys |= used_keys(value, path + "/")
    return keys


def check_descriptions(name, data):
    errors = []
    for lang, texts in data.get("description", {}).items():
        short = texts.get("shortDescription", "")
        if len(short) > 150 or "\n" in short:
            errors.append(f"{name}: description/{lang}/shortDescription must be one line of at most 150 characters")
        long = texts.get("longDescription")
        if long is not None and not 150 <= len(long) <= 10000:
            errors.append(f"{name}: description/{lang}/longDescription is {len(long)} characters, not 150 to 10000")
    return errors


def main():
    spec = documented_keys()
    errors = []
    for path in (MINIMAL, FULL):
        data = yaml.safe_load(path.read_text())
        used = used_keys(data)
        for key in sorted(used - spec):
            errors.append(f"{path}: {key} is not documented in {SPEC}")
        if path == FULL:
            for key in sorted(spec - used):
                errors.append(f"{path}: {key} is documented but missing from the full example")
        errors += check_descriptions(path, data)
    for error in errors:
        print(error, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
