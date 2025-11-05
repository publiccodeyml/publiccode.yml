.. _italian-extensions:

Italia
------

Tutte le chiavi elencate qui di seguito sono specifiche per l'Italia e, di
conseguenza, devono essere inserite in una sezione denominata con il codice
``it``.

Chiave ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: ``"1.0"``

This chiave **DEVE** always sempre impostata a ``1.0``.

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

Se presente e impostato a ``yes``, il software è conforme alle `linee
guida
sull’interoperabilità <https://docs.italia.it/italia/piano-triennale-ict/lg-modellointeroperabilita-docs>`__.

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
