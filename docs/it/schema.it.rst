.. _italian-extensions:

Italia (*deprecata*)
--------------------

L'intera sezione specifica per l'Italia è deprecata e sarà rimossa in
publiccode.yml 1.0. Usa la chiave generica ``supports`` per la
conformità alle normative nazionali e l'integrazione con le piattaforme
nazionali. Per indicare l'amministrazione che pubblica il software usa
la chiave ``organisation``.

Tutte le chiavi elencate qui di seguito sono specifiche per l'Italia e, di
conseguenza, devono essere inserite in una sezione denominata con il codice
``IT``.

Chiave ``countryExtensionVersion`` (*deprecata*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: ``"1.0"``

Questa chiave **DEVE** essere sempre impostata a ``1.0``.

Questa chiave è deprecata insieme al resto della sezione italiana.

Sezione ``conforme`` (*deprecata*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Questa sezione contiene delle chiavi per auto dichiarare la conformità
con la normativa vigente, rispetto ad alcune sezioni.
Se queste chiavi non vengono incluse, si intende che la conformità non è nota
o non viene dichiarata.

Chiave ``conforme/lineeGuidaDesign`` (*deprecata*)
''''''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle leggi in
materia di accessibilità (L. 4/2004), come descritto ulteriormente nelle
`linee guida di
design <https://docs.italia.it/italia/designers-italia/design-linee-guida-docs>`__.

Non usare questa chiave deprecata, le linee guida sono superate.

Chiave ``conforme/modelloInteroperabilita`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle linee guida
sull’interoperabilità.

Riferimento normativo: `Art. 73 del
CAD <https://docs.italia.it/italia/piano-triennale-ict/codice-amministrazione-digitale-docs/it/v2017-12-13/_rst/capo8_art73.html>`__.

Non usare questa chiave deprecata, le linee guida sono superate.

Chiave ``conforme/misureMinimeSicurezza`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software è conforme alle `Misure
minime di sicurezza ICT per le Pubbliche
amministrazioni <https://www.agid.gov.it/it/sicurezza/misure-minime-sicurezza-ict>`__.

Chiave ``conforme/gdpr`` (*deprecata*)
''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software rispetta il GDPR.

Usa invece la chiave ``supports`` con ``alias:gdpr``.

Sezione ``piattaforme`` (*deprecata*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Chiave ``piattaforme/spid`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con `SPID
- il Sistema Pubblico di Identità
Digitale <https://developers.italia.it/it/spid>`__.

Usa invece la chiave ``supports`` con ``alias:spid``.

Chiave ``piattaforme/cie`` (*deprecata*)
''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con la
Carta di Identità Elettronica.

Usa invece la chiave ``supports`` con ``alias:cie``.

Chiave ``piattaforme/anpr`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con ANPR.

Usa invece la chiave ``supports`` con ``alias:anpr``.

Chiave ``piattaforme/pagopa`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``yes``, il software si interfaccia con
pagoPA.

Usa invece la chiave ``supports`` con ``alias:pagopa``.

Chiave ``piattaforme/io`` (*deprecata*)
'''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: opzionale

Se presente e impostato a ``true``, il software si interfaccia con `IO - l'app dei servizi pubblici <https://io.italia.it/>`__.

Usa invece la chiave ``supports`` con ``alias:io``.

Sezione ``riuso`` (*deprecata*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Questa sezione contiene una serie di chiavi legate alla pubblicazione
del software sul `Catalogo del Riuso <https://developers.italia.it>`__.

Chiave ``riuso/codiceIPA`` (*deprecata*)
''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa (codice iPA)
-  Presenza: obbligatoria se ``repoOwner`` è una Pubblica
   Amministrazione
-  Esempio: ``c_h501``

Questa chiave rappresenta il codice dell’amministrazione all’interno
dell’Indice delle Pubbliche Amministrazioni (codice IPA).

Questa chiave è deprecata, usa invece ``organisation/uri``.
