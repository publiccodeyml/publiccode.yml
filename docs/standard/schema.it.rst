.. _italian-sections:

Italy
-----

All the keys listed below are specific for Italy and, as such, they must
be inserted in a section named with the ``IT`` code.


Key ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Type: string
- Presence: mandatory
- Value: ``"1.0"``


This key **MUST** always be set to ``1.0``.

Section ``piattaforme``
~~~~~~~~~~~~~~~~~~~~~~~

Key ``piattaforme/spid``
''''''''''''''''''''''''

- Type: boolean
- Presence: optional


If present and set to ``true``, the software interfaces with `SPID
- il Sistema Pubblico di Identità
Digitale <https://developers.italia.it/it/spid>`__.

Key ``piattaforme/cie``
'''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with the Italian
electronic ID card (``Carta di Identità Elettronica``).

Key ``piattaforme/anpr``
''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with ANPR.

Key ``piattafome/pagopa``
'''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with pagoPA.

Key ``piattaforme/io``
'''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software interfaces with `IO - the public services app <https://io.italia.it/>`__.
