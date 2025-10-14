.. _italian-sections:

Italy
-----

All the keys listed below are specific for Italy and, as such, they must
be inserted in a section named with the ``it`` code. Every Country is specified
using a two letters lowercase (*deprecated*) or uppercase *country code* following
the ISO 3166-1 alpha-2 standard.


Key ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Type: string
- Presence: mandatory
- Value: ``"1.0"``


This key **MUST** always be set to ``1.0``.

Key ``conforme`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section contains the keys for auto-declaring the compliance with the
current legislation, with respect to the following sections.
Not including these keys implies that the compliance is not known or not
declared.

Key ``conforme/lineeGuidaDesign`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software is compliant with the Italian accessibility
laws (L. 4/2004), as further explained in the 
`linee guida di
design <https://docs.italia.it/italia/designers-italia/design-linee-guida-docs>`__ (Italian language).

Don't use this deprecated key, those guidelines are no longer current.

Key ``conforme/modelloInteroperabilita`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software is compliant with the `linee
guida
sull’interoperabilità <https://docs.italia.it/italia/piano-triennale-ict/lg-modellointeroperabilita-docs>`__.

Regulatory reference: `Art. 73 del
CAD <https://docs.italia.it/italia/piano-triennale-ict/codice-amministrazione-digitale-docs/it/v2017-12-13/_rst/capo8_art73.html>`__ (Italian language).

Don't use this deprecated key, those guidelines are no longer current.

Key ``conforme/misureMinimeSicurezza`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software is compliant with the `Misure
minime di sicurezza ICT per le Pubbliche
amministrazioni <https://www.agid.gov.it/it/sicurezza/misure-minime-sicurezza-ict>`__ (Italian language).


Key ``conforme/gdpr`` (*deprecated*)
''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``true``, the software respects the GDPR.


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


Section ``riuso``
~~~~~~~~~~~~~~~~~

This section contains a set of keys related to the publication of the software
inside the reuse catalog of `Developers Italia <https://developers.italia.it>`__.

Chiave ``riuso/codiceIPA`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''''

-  Type: string (iPA code) 
-  Presence: mandatory if ``repoOwner`` is a Public Administration 
-  Example: ``c_h501``

This key represents the administration code inside the Public Administration
index (codice IPA).

This key is deprecated, use ``organisation/uri`` instead.
