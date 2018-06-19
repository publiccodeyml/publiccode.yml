# Estensioni italiane

Version: 0.1

[< Back to version 0.1 documentation](index.html)

## Sezione `conforme`

Questa sezione contiene delle chiavi per autodichiarare la conformità con la
normativa vigente, rispetto ad alcune sezioni.

### Chiave `conforme/accessibile`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software è conforme alle leggi in materia di accessibilità (L. 4/2004), come descritto ulteriormente nelle [linee guida di design](http://design-italia.readthedocs.io/it/stable/).

### Chiave `conforme/interoperabile`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software è conforme alle [linee guida sull'interoperabilità](https://lg-modellointeroperabilita.readthedocs.io/it/latest/).

Riferimento normativo: [Art. 73 del CAD](http://cad.readthedocs.io/it/v2017-12-13/_rst/capo8_art73.html).


### Chiave `conforme/sicuro`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software è conforme alle [Misure minime di sicurezza ICT per le Pubbliche amministrazioni](http://www.agid.gov.it/sites/default/files/documentazione/misure_minime_di_sicurezza_v.1.0.pdf).


### Chiave `conforme/privacy`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software rispetta le [linee guida del Garante per la protezione dei dati personali](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/1772725).

### Chiave `spid`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software si interfaccia con [SPID - il Sistema Pubblico di Identità Digitale](https://developers.italia.it/it/spid).

### Chiave `cie`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software si interfaccia con la Carta di Identità Elettronica.

### Chiave `anpr`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software si interfaccia con ANPR.

### Chiave `pagopa`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software si interfaccia con PagoPA.

## Sezione `riuso`

Questa sezione contiene una serie di chiavi legate alla pubblicazione del software sul "[Catalogo del Riuso](https://developers.italia.it)"

### Chiave `riuso/codiceIPA`

* Tipo: stringa (codice IPA)
* Presenza: obbligatoria se `repoOwner` è una Pubblica Amministrazione
* Esempio: `c_h501`

Questa chiave rappresenta il codice dell'amministrazione all'interno dell'Indice delle Pubbliche Amministrazioni (codice IPA).  

Il parser applicherà il corretto prefisso al valore dato a questa chiave per creare un'URI identificativa, una volta che questo sarà definito. L'URI sarà riconducibile a http://w3id.org/italia/data secondo la politica degli URI adottata in ambito [DAF](https://developers.italia.it/it/daf).

### Chiave `ecosistemi`

* Tipo: lista enumerata
* Presenza: opzionale

L'elenco di [Ecosistemi del Piano Triennale](http://pianotriennale-ict.readthedocs.io/it/latest/doc/06_ecosistemi.html) per il quale il software è rilevante.

L'elenco degli ecosistemi possibili è il seguente:

* sanita
* welfare
* finanza-pubblica
* scuola
* istruzione-superiore-ricerca
* difesa-sicurezza-soccorso-legalita
* giustizia
* infrastruttura-logistica
* sviluppo-sostenibilita
* beni-culturali-turismo
* agricoltura
* italia-europa-mondo

## Sezione `designKit`

### Chiave `designKit/seo`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software ha utilizzato, in fase di progettazione, il kit di SEO di [Designers Italia](https://designers.italia.it).

### Chiave `designKit/ui`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software ha utilizzato, in fase di progettazione, il kit UI di [Designers Italia](https://designers.italia.it).

### Chiave `designKit/web`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software utilizza il kit per lo sviluppo web di [Designers Italia](https://designers.italia.it).


### Chiave `designKit/content`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software ha utilizzato, in fase di progettazione, il kit per la scrittura del contenuto di [Designers Italia](https://designers.italia.it).
