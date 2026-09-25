#!/usr/bin/env python3
"""Check the example files against the keys documented in the spec.

Both examples may use only documented keys. The full example must
use every key. Also check description lengths and line breaks.
"""

import re
import sys
from pathlib import Path

import regex
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


def list_item_keys(node, containers, prefix=""):
    """Key paths inside the mappings of lists, like supports/id."""
    keys = set()
    for key, value in node.items():
        path = f"{prefix}{key}"
        if isinstance(value, dict):
            keys |= list_item_keys(value, containers, path + "/")
        elif isinstance(value, list) and path in containers:
            for item in value:
                if isinstance(item, dict):
                    keys |= {f"{path}/{k}" for k in item}
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
    containers = {key.rsplit("/", 1)[0] for key in spec if "/" in key}
    errors = []
    for path in (MINIMAL, FULL):
        data = yaml.safe_load(path.read_text())
        # Typed objects have their properties on the Types page.
        used = used_keys(data) | list_item_keys(data, containers)
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
