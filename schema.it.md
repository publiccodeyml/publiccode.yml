# `publiccode.yml` - Estensioni italiane


### Chiave `accessibile`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software segue le linee guida di design, in particolare le leggi in merito all'accessibilità.

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

## Sezione `designKit`

### Chiave `designKit/serviceDesign`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software ha utilizzato, in fase di progettazione, il kit di Service Design di [Designers Italia](https://designers.italia.it).

### Chiave `designKit/ui`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software ha utilizzato, in fase di progettazione, il kit UI di [Designers Italia](https://designers.italia.it).

### Chiave `designKit/webToolkit`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software utilizza il kit per lo sviluppo web di [Designers Italia](https://designers.italia.it).
