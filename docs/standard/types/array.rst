.. _array-type:

Array
=====

A YAML sequence of values. Each item MUST have a type allowed by the
key. When a key allows several types, an array MAY mix them. For
example, ``description/[lang]/screenshots`` may contain both paths
and URLs.

A key of this type MUST hold a list even for a single item. For
example, write ``platforms: [web]``.

An array MUST contain at least one item and MUST NOT contain
duplicates. Omit an optional key if you have no items to list.

