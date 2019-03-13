Lo Standard ``publiccode.yml``
==============================

``publiccode.yml`` è uno standard di metadati ideato per essere inserito in
repository contenenti software della Pubblica Amministrazione con lo scopo di
renderli facilmente individuabili e, di conseguenza, riutilizzabili da altri
enti.

Inserendo nella root di un repository un file chiamato ``publiccode.yml`` che
descrive le caratteristiche del software se ne agevola la comprensione ai
tecnici e ai decisori pubblici interessati a valutarlo; al tempo stesso si
permette di costruire strumenti automatici di indicizzazione, poiché il formato
è facilmente leggibile sia da esseri umani sia da macchine.

``publiccode.yml`` è obbligatorio per tutto il software pubblico sviluppato in
Italia, come da `linee guida
<https://docs.italia.it/AgID/linee-guida-riuso-software/lg-acquisizione-e-riuso-software-per-pa-docs/>`__:
questo consente al crawler automatico di Developers Italia di costituire il
`catalogo del software a riuso <https://developers.italia.it/>`__. Lo standard
è tuttavia pensato in ottica internazionale, per cui tutte le specificità
nazionali sono separate dal core e definite in apposite sezioni estensibili
autonomamente dai governi nazionali.

Tra le informazioni contenute in un ``publiccode.yml`` vi sono: 

- il titolo e la descrizione del progetto o prodotto (in una o più lingue); 
-  lo stato dello sviluppo ad es., ``concept``, ``development``, ``beta``, ``stable``, ``obsolete``; 
-  i riferimenti dell’organizzazione che ha sviluppato il progetto; 
-  chi si sta occupando della sua manutenzione e quando il rapporto finirà; 
-  per quale quadro giuridico è stato pensato questo progetto o prodotto; 
-  quali dipendenze software esistono.
  
e molte altre informazioni rilevanti.

Link utili
----------

- `Maggiori informazioni sul riuso del software <https://developers.italia.it/it/riuso>`__
- `Editor web per publiccode.yml <https://publiccode-editor.developers.italia.it/>`__

Indice dei contenuti
--------------------

.. toctree:: 
   :maxdepth: 2
   :numbered:

   schema.core.rst
   schema.it.rst
   country.rst 
   forks.rst
   categories-list.rst
   scope-list.rst
   example.rst
