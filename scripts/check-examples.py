#!/usr/bin/env python3
"""Check the example files against the keys documented in the spec.

Both examples may use only documented keys. The full example must
use every key. Top level keys must follow the order of the reference
page. Also check description lengths and line breaks.
"""

import re
import sys
from pathlib import Path

import regex
import yaml

SPEC = Path("spec/v1/index.rst")
TYPES = Path("spec/v1/types")
MINIMAL = Path("spec/v1/example/publiccode.minimal.yml")
FULL = Path("spec/v1/example/publiccode.yml")

HEADING = re.compile(r"^``([A-Za-z/\[\]]+)``")


def properties(text):
    match = re.search(r"^Properties(?: of each item)?:\n", text, re.MULTILINE)
    if not match:
        return set()
    text = text[match.end():]
    return set(re.findall(r"^-  ``([A-Za-z]+)``", text, re.MULTILINE))


def spec_headings(lines):
    headings = []
    for index, (line, underline) in enumerate(zip(lines, lines[1:])):
        match = HEADING.match(line)
        if match and underline and set(underline) <= set("~'"):
            headings.append((index, match[1]))
    return headings


def documented_order():
    """Top level keys in the order the reference page lists them."""
    headings = spec_headings(SPEC.read_text().splitlines())
    return [key for _, key in headings if "/" not in key]


def check_order(name, data, order):
    keys = [key for key in data if key in order]
    expected = sorted(keys, key=order.index)
    for key, wanted in zip(keys, expected):
        if key != wanted:
            return [f"{name}: top level key {key} comes before {wanted}, unlike {SPEC}"]
    return []


def documented_keys():
    types = {}
    text = "\n".join(path.read_text() for path in sorted(TYPES.glob("*.rst")))
    for section in re.split(r"^\.\. _", text, flags=re.MULTILINE)[1:]:
        anchor, _, body = section.partition(":")
        types[anchor] = properties(body)

    lines = SPEC.read_text().splitlines()
    headings = spec_headings(lines)

    keys = set()
    arrays = set()
    for position, (start, key) in enumerate(headings):
        key = "/".join(
            part + ("/[]" if "/".join(key.split("/")[:i + 1]) in arrays else "")
            for i, part in enumerate(key.split("/"))
        )
        keys.add(key)
        end = headings[position + 1][0] if position + 1 < len(headings) else len(lines)
        section = "\n".join(lines[start:end])
        if re.search(r"(?:array|:ref:`array <array-type>`) of", section):
            arrays.add(key)
        item_properties = properties(section)
        match = re.search(r"(?:array|:ref:`array <array-type>`) of :ref:`[^`]+ <([^>]+)>`", section)
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
        short = texts.get("shortDescription", "").strip()
        if len(regex.findall(r"\X", short)) > 150 or regex.search(r"\R", short):
            errors.append(f"{name}: description/{lang}/shortDescription must be one line of at most 150 characters")
        long = texts.get("longDescription")
        if long is not None:
            length = len(regex.findall(r"\X", long.strip()))
            if not 150 <= length <= 10000:
                errors.append(f"{name}: description/{lang}/longDescription is {length} characters, not 150 to 10000")
    return errors


def main():
    spec = documented_keys()
    order = documented_order()
    errors = []
    for path in (MINIMAL, FULL):
        data = yaml.safe_load(path.read_text())
        used = used_keys(data)
        for key in sorted(used - spec):
            errors.append(f"{path}: {key} is not documented in {SPEC}")
        if path == FULL:
            for key in sorted(spec - used):
                errors.append(f"{path}: {key} is documented but missing from the full example")
        errors += check_order(path, data, order)
        errors += check_descriptions(path, data)
    for error in errors:
        print(error, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
