.. _`estensioni-paese`:

Estensioni nazionali
====================

Mentre il core è strutturato per essere significativo a livello
internazionale, vi sono informazioni addizionali che possono essere
aggiunte a livello nazionale, come ad esempio una dichiarazione di
compatibilità con una legge locale. Il meccanismo di estensione fornito
prevede l’utilizzo di sezioni specifiche per ogni Paese
(*country-specific*).

Tutte le sezioni specifiche per ogni Paese sono contenute in una sezione
denominata con l’\ `ISO 3166-1 alpha-2 country
code <https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__ in minuscolo (*deprecato*) o
in maiuscolo.
Ad esempio, ``spid`` è una proprietà definita per i software italiani per la
dichiarazione dell’eventuale compatibilità con il Sistema Pubblico di
Identità Digitale.

Dunque, se un software è compatibile, troveremo:

.. code:: yaml

   it:
     countryExtensionVersion: "0.2"
     piattaforme:
        - spid: yes

Nota bene che le chiavi *country-specific* **non** sono valide
all’interno delle sezioni internazionali. I Paesi che vogliano estendere
il formato devono aggiungere una sezione dedicata.

.. include:: schema.it.rst
