.. _tools:

Strumenti
=========

Lo standard `publiccode.yml` nasce dall'esigenza di facilitare il processo di
ricerca, valutazione e riuso dei software all'interno della
Pubblica Amministrazione.
Per facilitarne la diffusione, il Team per la Trasformazione Digitale ha
sviluppato una serie di strumenti che verranno descritti dinanzi.
Prima di passare alla descrizione degli strumenti, è utile ricordare il flusso
di lavoro da seguire per assicurare che il proprio progetto venga correttamente
indicizzato all'interno del catalogo del riuso.

Flusso di lavoro
~~~~~~~~~~~~~~~~

Il seguente flusso di lavoro è da considerarsi valido sia per il software
a riuso delle Pubbliche Amministrazioni che per il software open-source di
terzi. L'unica differenza sta nel punto `3`, relativo alla procedura di
onboarding, in quanto la piattaforma ospitata su Developers Italia è pensata
esclusivamente per essere usata da PA che si vengono classificate attraverso il
proprio indice delle Pubbliche Amministrazioni (iPA).
Come indicato nelle [Linee Guida su acquisizione e riuso di software per le
Pubbliche
Amministrazioni](https://lg-acquisizione-e-riuso-software-per-la-pa.readthedocs.io/it/latest/attachments/allegato-b-guida-alla-pubblicazione-open-source-di-software-realizzato-per-la-pa.html?highlight=publiccode#registrazione-del-repository-su-developers-italia),
è necessario compilare e pubblicare il file `publiccode.yml` relativo al
proprio progetto prima di registrarlo sul portale di Developers Italia. Qui di
seguito verranno forniti maggiori dettagli riguardanti queste operazioni.

1. La prima operazione da effettuare consiste nella creazione del file
   `publiccode.yml`. Dopo aver consultato l'[ultima
   versione](https://docs.italia.it/italia/developers-italia/publiccodeyml/it/master/schema.html)
   disponibile dello standard ed essersi assicurati di avere a disposizione
   almeno tutte gli elementi da indicare obbligatoriamente nel file,
   è possibile preparare il file `publiccode.yml` relativo al proprio
   progetto. Per evitare di scrivere direttamente un file in formato `yaml`, il
   Team per la Trasformazione Digitale ha realizzato uno strumento che facilita
   questa operazione, vedi :ref:`editor`.
2. Una volta completata la compilazione del file `publiccode.yml`, è necessario
   inserire tale file nella radice del proprio repository pubblico (`root`).
   Quella, infatti, è la posizione nella quale il crawler si aspetterà di
   trovare un file `publiccode.yml` valido relativo al progetto. 
   A seconda dello strumento di code hosting utilizzato (repository), potrebbe
   essere possibile effettuare questa operazione tramite l'interfaccia web. Si
   consiglia di consultare il manuale relativo al proprio repository per avere
   maggiori informazioni a riguardo.
3. Dopo aver caricato il file all'interno del proprio repository, è possibile
   registrare l'applicazione sul :ref:`onboarding` di Developers Italia in modo tale che
   il crawler possa trovarlo ed elaborarne correttamente le informazioni. 

.. _editor:

publiccode.yml editor
~~~~~~~~~~~~~~~~~~~~~

L'applicazione che permette di generare e validare i propri `publiccode.yml`
è l'[editor](https://publiccode-editor.developers.italia.it/). Lo scopo di
questo editor è quello di guidare l'utente nella compilazione di una serie di
form le cui informazioni andranno a confluire all'interno del file
`publiccode.yml` rispettando l'[ultima
versione](https://github.com/italia/publiccode.yml/releases/latest) disponibile
dello standard. In questo modo, anche i non addetti ai lavori possono compilare
il file `publiccode.yml` relativo al proprio applicativo. Una volta compilato, il file
potrà essere scaricato in locale per poi essere caricato all'interno del
proprio repository. 


.. _onboarding:

Portale di onboarding
~~~~~~~~~~~~~~~~~~~~~

Il [portale di onboarding](https://onboarding.developers.italia.it/) permette
di registrare la propria piattaforma di codice sorgente pubblico in modo tale da
permettere al :ref:`crawler` di visitare i singoli repository alla ricerca del
file `publiccode.yml`, estrarne le informazioni relevanti ed inserire una nuova
scheda all'interno del catalogo del riuso.
**Nota bene:** Sul portale di onboarding viene richiesto di inserire la URL  
dell'organizzazione creata all'interno della piattaforma di code hosting, e non
il link relativo al singolo repository. Ad esempio, per quanto
riguarda l'organizzazione chiamata *italia*, ospitata su GitHub, la URL 
è *https://github.com/italia*. Inserendo la URL dell'organizzazione, il
:ref:`crawler` cercherà il file `publiccode.yml` nella radice (root) di tutti
i repository ospitati al suo interno.  


.. _crawler:

Crawler
~~~~~~~

