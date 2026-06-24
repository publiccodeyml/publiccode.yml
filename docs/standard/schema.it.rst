.. _italian-sections:

Italy (*deprecated*)
--------------------

The entire Italian country-specific section is deprecated and will be
removed in publiccode.yml 1.0. Use the generic ``supports`` key for
compliance with national regulations and integration with national
platforms, and the ``organisation`` key to reference the publishing
administration.

All the keys listed below are specific for Italy and, as such, they must
be inserted in a section named with the ``IT`` code.


Key ``countryExtensionVersion`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Type: string
- Presence: mandatory
- Value: ``"1.0"``


This key **MUST** always be set to ``1.0``.

This key is deprecated together with the rest of the Italian section.

Section ``piattaforme`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Key ``piattaforme/spid`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional


If present and set to ``true``, the software interfaces with `SPID
- il Sistema Pubblico di Identità
Digitale <https://developers.italia.it/it/spid>`__.

Use the ``supports`` key with ``alias:spid`` instead.

Key ``piattaforme/cie`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with the Italian
electronic ID card (``Carta di Identità Elettronica``).

Use the ``supports`` key with ``alias:cie`` instead.

Key ``piattaforme/anpr`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with ANPR.

Use the ``supports`` key with ``alias:anpr`` instead.

Key ``piattaforme/pagopa`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with pagoPA.

Use the ``supports`` key with ``alias:pagopa`` instead.

Key ``piattaforme/io`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with `IO - the public services app <https://io.italia.it/>`__.

Use the ``supports`` key with ``alias:io`` instead.
