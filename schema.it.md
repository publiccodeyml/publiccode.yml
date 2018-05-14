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

### Chiave `usaAPI`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software utilizza API pubbliche.

### Chiave `esportaAPI`

* Tipo: booleano
* Presenza: opzionale

Se presente e impostato a `yes`, il software esporta API.

## Sezione `riuso`

Questa sezione contiene una serie di chiavi legate alla pubblicazione del software sul "[Catalogo del Riuso](https://developers.italia.it)"
### Chiave `riuso/tag`

* Type: array of strings
* Presence: optional
* Example: "city", "accounting", "hr", "employee", "public"

A list of words that can be used to describe the software and can
help building catalogs of open software.

Each tag must be in Unicode lowercase, and should not contain
any Unicode whitespace character. The suggested character to
separate multiple word is `-` (single dash).

### Chiave `riuso/categoria`

* Type: enumerated string
* Presence: optional
* Values: see [sw-category.md](sw-category.md)
* Example: "it-anagrafe"

This key defines the "category" of software, which is the market area
for the software. You can select the category that is more similar to
the software; it doesn't have to be an exact match, but it can still
be very useful for building catalogs of software and evaluate
alternatives.

The list of allowed values is defined in [sw-category.md](sw-category.md),
and can evolve at any time, separately from the version of this
specification.


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
