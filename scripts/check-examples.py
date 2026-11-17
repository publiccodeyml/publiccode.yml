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
TYPES = Path("docs/standard/types.rst")
MINIMAL = Path("docs/standard/example/publiccode.minimal.yml")
FULL = Path("docs/standard/example/publiccode.yml")

HEADING = re.compile(r"^``([A-Za-z/\[\]]+)``")


def properties(text):
    match = re.search(r"^Properties(?: of each item)?:\n", text, re.MULTILINE)
    if not match:
        return set()
    text = text[match.end():]
    return set(re.findall(r"^-  ``([A-Za-z]+)``", text, re.MULTILINE))


def documented_keys():
    types = {}
    for section in re.split(r"^\.\. _", TYPES.read_text(), flags=re.MULTILINE)[1:]:
        anchor, _, body = section.partition(":")
        types[anchor] = properties(body)

    lines = SPEC.read_text().splitlines()
    headings = []
    for index, (line, underline) in enumerate(zip(lines, lines[1:])):
        match = HEADING.match(line)
        if match and underline and set(underline) <= set("~'"):
            headings.append((index, match[1]))

    keys = set()
    for position, (start, key) in enumerate(headings):
        keys.add(key)
        end = headings[position + 1][0] if position + 1 < len(headings) else len(lines)
        section = "\n".join(lines[start:end])
        item_properties = properties(section)
        match = re.search(r"array of :ref:`[^`]+ <([^>]+)>`", section)
        if match:
            item_properties |= types[match[1]]
        keys.update(f"{key}/[]/{prop}" for prop in item_properties)
    return keys


def used_keys(node, prefix=""):
    keys = set()
    if isinstance(node, list):
        for item in node:
            keys |= used_keys(item, prefix + "[]/")
    elif isinstance(node, dict):
        for key, value in node.items():
            path = f"{prefix}{key}"
            # The language level is a tag, not a documented key.
            if prefix == "description/":
                path = "description/[lang]"
            else:
                keys.add(path)
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
