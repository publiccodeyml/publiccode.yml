.. _italian-extensions:

Italy
-----

All the extensions listed below are specific for Italy and, as such, they must
be inserted in a section named with the ``it`` code. Every Country is specified
using a two letters *country code* following the ISO 3166-1 alpha-2 standard.


Key ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Type: string
- Presence: mandatory
- Example: ``"1.0"``


This key specifies the version to which the current extension schema adheres to,
for forward compatibility.

Please note how the value of this key is independent from the top-level
``publiccodeYmlVersion`` one (see :ref:`core`). In such a way, the extensions
schema versioning is independent both from the core version of the schema and
from every other Country.

Key ``conforme``
~~~~~~~~~~~~~~~~

This section contains the keys for auto-declaring the compliance with the
current legislation, with respect to the following sections.
Not including these keys implies that the compliance is not known or not
declared.

Key ``conforme/lineeGuidaDesign``
'''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software is compliant with the Italian accessibility
laws (L. 4/2004), as further explained in the 
`linee guida di
design <https://docs.italia.it/italia/designers-italia/design-linee-guida-docs>`__ (Italian language).

Key ``conforme/modelloInteroperatibilita``
''''''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software is compliant with the `linee
guida
sull’interoperabilità <https://docs.italia.it/italia/piano-triennale-ict/lg-modellointeroperabilita-docs>`__.

Regulatory reference: `Art. 73 del
CAD <https://docs.italia.it/italia/piano-triennale-ict/codice-amministrazione-digitale-docs/it/v2017-12-13/_rst/capo8_art73.html>`__ (Italian language).


Key ``conforme/misureMinimeSicurezza``
''''''''''''''''''''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software is compliant with the `Misure
minime di sicurezza ICT per le Pubbliche
amministrazioni <http://www.agid.gov.it/sites/default/files/documentazione/misure_minime_di_sicurezza_v.1.0.pdf>`__ (Italian language). 


Key ``conforme/gdpr``
'''''''''''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software respects the GDPR.


Section ``piattaforme``
~~~~~~~~~~~~~~~~~~~~~~~

Key ``spid``
''''''''''''

- Type: boolean
- Presence: optional


If present and set to ``yes``, the software interfaces with `SPID
- il Sistema Pubblico di Identità
Digitale <https://developers.italia.it/it/spid>`__.

Key ``cie``
'''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software interfaces with the Italian
electronic ID card (``Carta di Identità Elettronica``).

Key ``anpr``
''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software interfaces with ANPR.

Key ``pagopa``
''''''''''''

- Type: boolean
- Presence: optional

If present and set to ``yes``, the software interfaces with pagoPA.

Section ``riuso``
~~~~~~~~~~~~~~~~~

This section contains a set of keys related to the publication of the software
inside the `Catalogo del Riuso <https://developers.italia.it>`__.

Chiave ``riuso/codiceIPA``
''''''''''''''''''''''''''

-  Type: string (iPA code) 
-  Presence: mandatory if ``repoOwner`` is a Public Administration 
-  Example: ``c_h501``

This key represents the administration code inside the Public Administration
index (codice IPA).
