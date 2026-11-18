.. _string-type:

String
******

A sequence of Unicode characters. Date, Enumerated string, Language
tag, Country code, E-mail address, Path, URI and URL values are
strings and MUST follow these rules too.

Parsers MUST ignore leading and trailing whitespace. The remaining
value MUST NOT be empty.

A string MUST NOT contain line breaks, unless its key allows them.

Count characters after trimming leading and trailing whitespace.
Use the extended grapheme clusters defined in `Unicode Standard
Annex #29 <https://www.unicode.org/reports/tr29/>`__. For example,
``é`` counts as one character whether stored as one code point or as
``e`` followed by a combining accent.

The value MUST be a YAML string: a number, a boolean or null is an
error.
