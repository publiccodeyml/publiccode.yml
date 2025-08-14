.. _italian-extensions:

Italia
------

Tutte le estensioni elencate qui di seguito sono specifiche per l'Italia e, di
conseguenza, devono essere inserite in una sezione denominata con il codice
``it``. Tutti i Paesi sono specificati usando *country code* a due lettere
in minuscolo (*deprecato*) o in maiuscolo, seguendo lo standard ISO 3166-1 alpha-2.


Chiave ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: ``"1.0"``

Questa chiave specifica la versione alla quale il presente schema di estensioni
aderisce.

**Nota Bene:** il valore di questa chiave è indipendente da quello contenuto nella
chiave top-level ``publiccodeYmlVersion`` (vedi :ref:`core`). In questo modo,
il versioning di ogni schema di estensioni è indipendente sia dalla versione
core dello schema che da ogni altra estensione per Paese.

Sezione ``conforme``
~~~~~~~~~~~~~~~~~~~~

Questa sezione contiene delle chiavi per auto dichiarare la conformità
con la normativa vigente, rispetto ad alcune sezioni.
Se queste chiavi non vengono incluse, si intende che la conformità non è nota
o non viene dichiarata.

Chiave ``conforme/lineeGuidaDesign``
''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle leggi in
materia di accessibilità (L. 4/2004), come descritto ulteriormente nelle
`linee guida di
design <https://docs.italia.it/italia/designers-italia/design-linee-guida-docs>`__.

Chiave ``conforme/modelloInteroperabilita``
'''''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle `linee
guida
sull’interoperabilità <https://docs.italia.it/italia/piano-triennale-ict/lg-modellointeroperabilita-docs>`__.

Riferimento normativo: `Art. 73 del
CAD <https://docs.italia.it/italia/piano-triennale-ict/codice-amministrazione-digitale-docs/it/v2017-12-13/_rst/capo8_art73.html>`__.

Chiave ``conforme/misureMinimeSicurezza``
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle `Misure
minime di sicurezza ICT per le Pubbliche
amministrazioni <https://www.agid.gov.it/it/sicurezza/misure-minime-sicurezza-ict>`__.

Chiave ``conforme/gdpr``
''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software rispetta il GDPR.

Sezione ``piattaforme``
~~~~~~~~~~~~~~~~~~~~~~~

Chiave ``piattaforme/spid``
'''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con `SPID
- il Sistema Pubblico di Identità
Digitale <https://developers.italia.it/it/spid>`__.

Chiave ``piattaforme/cie``
''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con la
Carta di Identità Elettronica.

Chiave ``piattaforme/anpr``
'''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con ANPR.

Chiave ``piattaforme/pagopa``
'''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con
pagoPA.

Chiave ``piattaforme/io``
'''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``true``, il software si interfaccia con `IO - l'app dei servizi pubblici <https://io.italia.it/>`__.

Sezione ``riuso``
~~~~~~~~~~~~~~~~~

Questa sezione contiene una serie di chiavi legate alla pubblicazione
del software sul `Catalogo del Riuso <https://developers.italia.it>`__.

Chiave ``riuso/codiceIPA``
''''''''''''''''''''''''''

-  Tipo: stringa (codice iPA)
-  Presenza: obbligatoria se ``repoOwner`` è una Pubblica
   Amministrazione
-  Esempio: ``c_h501``

Questa chiave rappresenta il codice dell’amministrazione all’interno
dell’Indice delle Pubbliche Amministrazioni (codice IPA).
