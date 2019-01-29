# Lo Standard `publiccode.yml`

`publiccode.yml` è uno standard di descrizione di metadati ideato per essere
inserito in repository contenenti software pubblici. Questo standard ha lo
scopo di rendere il software sviluppato dalle Pubbliche Amministrazioni
e Pubbliche Organizzazioni facile da individuare e, di conseguenza,
riutilizzare. Proprio per questo motivo, è stato pensato per essere semplice da
adottare sia per gli sviluppatori che per i non addetti ai lavori. 

Nel corso degli anni, molto software di qualità è stato commissionato e/o
sviluppato da diverse Pubbliche Amministrazioni, però i casi di riuso sono
scarsi. Alcune tra le ragioni che hanno portato ad una bassa adozione di tali
progetti sono state la difficoltà nel reperire informazioni riguardanti un dato
progetto così come le perplessità nel capire se un dato progetto potesse essere
adatto o meno nel contesto di una Pubblica Amministrazione diversa rispetto
a quella che lo aveva originariamente commissionato. 

Lo standard `publiccode.yml` si pone l'obiettivo di risolvere queste
problematiche.  Si tratta, infatti, di un *singolo file* che può essere letto
facilmente sia dai dipendenti pubblici, che vogliono capire se possono
beneficiare dall'adozione di un dato software, che da un calcolatore
elettronico.

Tra le informazioni contenute in questo file vi sono:
* il titolo e la descrizione del progetto o prodotto in inglese e/o altre
  lingue;
* lo stato dello sviluppo ad es., `concept`, `development`, `beta`, `stable`,
  `obsolete`;
* i riferimenti dell'organizzazione che ha sviluppato il progetto;
* chi si sta occupando della sua manutenzione e quando il rapporto finirà;
* chi contattare per domande di tipo tecnico o di supporto;
* per quale quadro giuridico è stato pensato questo progetto o prodotto;
* quali dipendenze software esistono.  e molte altre informazioni rilevanti. 

Il formato del file `publiccode.yml` è pensato per essere rapidamente aggiunto
ad ogni nuovo progetto e potrà crescere ed adattarsi ai cambiamenti di
contesto. 

In aggiunta, il *Team per la Trasformazione Digitale* sta lavorando per
realizzare uno *scanner* in grado di cercare tutti i file `publiccode.yml`
presenti all'interno dei repository di codice sorgente accessibili
pubblicamente, per poi elencarli e pubblicarli sotto forma di open data. In tal
modo, sarà dunque popolato il catalogo del riuso del software per la Pubblica
Amministrazione.  
Inoltre, il Team sta realizzando degli strumenti di supporto,
come ad esempio un editor, che permettano di generare e/o validare un file
`publiccode.yml` attraverso delle interfacce grafiche quindi facilitando anche
il compito in fase di creazione. 

.. toctree::
   :maxdepth: 2

   Schema dello standard <_docs/it/schema.md>
   Estensioni italiane <_docs/it/schema.it.md>
   Fork e Varianti <_docs/it/forks.md>
   Tipi di Pubbliche Amministrazioni <_docs/it/pa-types.md>
   Lista dei tag accettati <_docs/it/tags.md>
   Strumenti di supporto <_docs/it/strumenti.md>
