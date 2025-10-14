.. _core:

Lo standard
===========

La struttura di un file ``publiccode.yml`` prevede l'esistenza di chiavi
top-level e sezioni che possono contenere al proprio interno altre chiavi. 
Lo standard ha rilevanza internazionale ma è possibile dichiarare una sezione
dedicata per le chiavi relative ad un Paese specifico (si veda
:ref:`estensioni-paese` per maggiori dettagli). 

Chiavi e Sezioni Top-Level
--------------------------

Chiave ``publiccodeYmlVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: ``"0.1"``

Questa chiave specifica la versione alla quale il presente
``publiccode.yml`` aderisce, per una questione di compatibilità diretta.

Chiave ``name``
~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: “Medusa”

Questa chiave contiene il nome del software. Contiene il nome
(abbreviato) pubblico del prodotto, che può essere tradotto nella
sezione specifica chiamata ``localisation``. Dovrebbe essere il nome con
il quale la maggior parte delle persone si riferisce al suddetto
software. Nel caso in cui il software abbia sia un nome in “codice”
interno che uno commerciale, è preferibile usare il nome commerciale.

Chiave ``applicationSuite``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: opzionale
-  Esempio: “MegaProductivitySuite”

Questa chiave contiene il nome della “suite” alla quale il software
appartiene.

Chiave ``url``
~~~~~~~~~~~~~~

-  Tipo: stringa (URL)
-  Presenza: obbligatoria
-  Esempio: ``"https://example.com/italia/medusa.git"``

Un identificatore unico per questo software. Questa stringa deve essere
una URL che punta al repository di codice sorgente (git, svn, …) nel
quale il software è pubblicato. Se il repository è disponibile sotto
diversi protocolli, preferire URL HTTP/HTTPS che non richiedono
l’autenticazione.

I fork creati con lo scopo di contribuire *upstream* non devono
modificare questo file; questo aiuta i software che fanno il parsing di
``publiccode.yml`` a saltare immediatamente i fork tecnici. Al
contrario, un fork completo che sarà manutenuto
in modo separato rispetto al software originale, dovrebbe modificare
questa linea per essere trattato come una variante distinta.

Vedi :ref:`fork-varianti` per una descrizione completa del
significato di variante software e di come gestire i fork sia lato
parser che lato autore.

Chiave ``landingURL``
~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa (URL)
-  Presenza: opzionale
-  Esempio: ``"https://example.com/italia/medusa"``

Se la chiave ``url`` non porta ad una pagina leggibile da un umano, ma
serve solo ad indirizzare un client di source control verso il codice
sorgente, con questa chiave viene introdotta l’opzione di specificare la
*landing page*. Questa pagina, idealmente, è il punto di arrivo
dell’utente quando seleziona un pulsante chiamato, ad esempio, “Vai al
codice sorgente dell’applicazione”. Nel caso in cui il prodotto preveda
un installer grafico automatico, questa URL può puntare alla pagina
contenente un riferimento al codice sorgente ma che offra anche la
possibilità di scaricare tale installer.

Chiave ``isBasedOn``
~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa o array di stringhe
-  Presenza: opzionale
-  Esempio: ``"https://github.com/italia/otello.git"``

Nel caso in cui questo software sia una variante o un fork di un altro
software, che opzionalmente può contenere un file ``publiccode.yml``,
questa chiave conterrà la ``url`` di uno o più progetti originali.

L’esistenza di questa chiave identifica il fork come una variante (vedi
:ref:`fork-varianti`), discendente dal repository specificato.

Chiave ``softwareVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: opzionale
-  Esempio: ``"1.0"``, ``"dev"``

Questa chiave contiene il numero dell’ultima versione stabile del
software. Il numero di versione è una stringa che non è pensata per
essere interpretata dal parser ma solamente visualizzata; i parser non
devono assumere l’utilizzo del semantic versioning o altri specifici
formati di versionamento.

Questa chiave può essere omessa nel caso in cui il software sia in una fase
iniziale di sviluppo e non sia stato ancora rilasciato.

Chiave ``releaseDate``
~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa (data)
-  Presenza: opzionale
-  Esempio: ``"2017-04-15"``

Questa chiave contiene la data di ultimo rilascio del software.

Chiave ``logo``
~~~~~~~~~~~~~~~

-  Tipo: stringa (percorso verso il file)
-  Presenza: opzionale
-  Formati accettabili: SVG, SVGZ, PNG
-  Esempio: ``"img/logo.svg"``

Questa chiave indica il logo del software. Il valore può essere il percorso
relativo al file a partire dalla root del repository, oppure una URL assoluta
che punta al logo in versione raw. In entrambi i casi, il file deve risiedere
all'interno del medesimo repository che contiene il ``publiccode.yml``.  Il logo
dovrebbe essere in formato vettoriale; i formati raster sono solo accettabili
come fallback. In questo caso, dovrebbero essere PNG trasparenti, con una
larghezza minima di 1000px.

Chiave ``monochromeLogo``
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa (percorso verso il file)
-  Presenza: opzionale
-  Formati accettabili: SVG, SVGZ, PNG
-  Esempio: ``"img/logo-mono.svg"``

Questa chiave indica il logo monocromatico (nero) del software. Il valore può
essere il percorso
relativo al file a partire dalla root del repository, oppure una URL assoluta
che punta al logo in versione raw. In entrambi i casi, il file deve risiedere
all'interno del medesimo repository che contiene il ``publiccode.yml``.  Il logo
dovrebbe essere in formato vettoriale; i formati raster sono solo accettabili
come fallback. In questo caso, dovrebbero essere PNG trasparenti, con una
larghezza minima di 1000px.

Chiave ``inputTypes``
~~~~~~~~~~~~~~~~~~~~~

-  Tipo: array di stringhe
-  Presenza: opzionale
-  Valori: vedi RFC 6838
-  Esempio: ``"text/plain"``

Una lista di Media Types (MIME Types), come specificato dal `RFC
6838 <https://tools.ietf.org/html/rfc6838>`__, che possono essere
gestiti in input dall’applicazione.

Nel caso in cui il software non supporti alcun input, è possibile
saltare questo campo o usare ``application/x.empty``.

Chiave ``outputTypes``
~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: array di stringhe
-  Presenza: opzionale
-  Valori: vedi RFC 6838
-  Esempio: ``"text/plain"``

Una lista di Media Types (MIME Types), come specificato dal `RFC
6838 <https://tools.ietf.org/html/rfc6838>`__, che possono essere
gestiti in output dall’applicazione.

Nel caso in cui il software non supporti alcun output, è possibile
saltare questo campo o usare ``application/x.empty``.

Chiave ``platforms``
~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringhe o array di stringhe
-  Presenza: obbligatoria
-  Valori: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. Valori leggibili da un umano al di fuori di questa lista
   sono permessi.
-  Esempio: ``web``

Questa chiave specifica su quale piattaforma funziona il software. È
pensata per descrivere le piattaforme che l’utente userà per accedere ed
utilizzare il software, piuttosto che la piattaforma sul quale il
software gira.

Se possibile, usare i valori predefiniti. Se il software gira su una
piattaforma per la quale un valore predefinito non è disponibile, un
diverso valore può essere usato.

Chiave ``categories``
~~~~~~~~~~~~~~~~~~~~~

-  Tipo: array di stringhe
-  Presenza: opzionale
-  Valori accettabili: vedi :ref:`categories-list` 

Una lista di categorie che possono essere usate per descrivere il software
e possono aiutare a costruire il catalogo di software open.

Il vocabolario controllato :ref:`categories-list` presenta la lista dei valori
accettabili. 

Chiave ``usedBy``
~~~~~~~~~~~~~~~~~

-  Tipo: array di stringhe
-  Presenza: opzionale

Una lista di nome di prominenti Pubbliche Amministrazioni (che
serviranno come “testimonial”) che il maintainer riconosce come
utilizzatori attuali di questo software.

I parser sono incoraggiati ad accrescere questa lista anche con altre
informazioni che riescono ad ottenere in modo indipendente; ad esempio,
il fork di un software, di proprietà di un’amministrazione, può essere
usato come un segnale di uso del software.

Chiave ``roadmap``
~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: opzionale

Un link ad una *roadmap* pubblica del software.

Chiave ``developmentStatus``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Valori permessi: ``concept``, ``development``, ``beta``, ``stable``,
   ``obsolete``

Le chiavi sono: 

-  ``concept`` - Il software è solo un “concept”. Non è
   stato sviluppato codice e il repository potrebbe semplicemente essere un
   placeholder.  
-  ``development`` - Qualche sforzo è stato fatto in
   direzione dello sviluppo del software ma il codice non è pronto per
   l’utenza finale, nemmeno in una versione preliminare (beta o alpha) per
   essere testato dall’utenza. 
-  ``beta`` - Il software è in fase di
   testing (alpha o beta). In questo stage, il software potrebbe aver o non
   aver ancora avuto una release pubblica preliminare. 
-  ``stable`` - Il software ha già avuto una prima release pubblica ed è pronto
   per essere usato in un contesto di produzione. 
-  ``obsolete`` - Il software non è più manutenuto o aggiornato. Tutto il codice
   sorgente è archiviato e tenuto per ragioni di storico.

Chiave ``softwareType``
~~~~~~~~~~~~~~~~~~~~~~~

-  Tipo: stringa
-  Presenza: obbligatoria
-  Valori permessi: ``"standalone/mobile"``, ``"standalone/iot"``,
   ``"standalone/desktop"``, ``"standalone/web"``, ``"standalone/backend"``,
   ``"standalone/other"``, ``"addon"``, ``"library"``, ``"configurationFiles"``

Le chiavi sono: 

-  ``standalone/mobile`` - Il software è un pacchetto  *self-contained*, *standalone*.
   Il software è un'applicazione nativa per dispositivi mobile.
-  ``standalone/iot`` - Il software è adatto ad essere utilizzato nel contesto
   `Internet of Things`.
-  ``standalone/desktop`` - Il software è tipicamente installato e utilizzato su un
   sistema operativo desktop. 
-  ``standalone/web`` - Il software rappresenta un applicativo fruibile attraverso il web. 
-  ``standalone/backend`` - Il software è un applicativo backend. 
-  ``standalone/other``  - Il software ha una natura diversa rispetto a quanto
   specificato alle chiavi precedenti. 
-  ``addon`` - Il software è un *addon*,
   come ad esempio un plugin o un tema, per un software più complesso
   (e.g., un CMS o una suite per ufficio). 
-  ``library`` - Il software
   contiene una libreria o una SDK che facilita la creazione di nuovi prodotti
   a sviluppatori di terze parti.
-  ``configurationFiles`` - Il software non contiene script eseguibili ma
   una serie di file di configurazione. Questi potrebbero documentare come
   ottenere un certo tipo di *deployment*. I suddetti file potrebbero avere la
   forma di semplici file di configurazione, script bash, playbook ansible,
   Dockerfile, o altri set di istruzioni.

Sezione ``intendedAudience``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Chiave ``intendedAudience/countries``
'''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe
-  Presenza: opzionale

Questa chiave include in modo esplicito alcuni Paesi tra il pubblico
previsto, i.e., il software rivendica esplicitamente la conformità con
processi specifici, tecnologie o leggi. Tutti i Paesi sono specificati
usando *country code* a due lettere seguendo lo standard ISO 3166-1
alpha-2.

Chiave ``intendedAudience/unsupportedCountries``
''''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe
-  Presenza: opzionale

Questa chiave contrassegna esplicitamente i Paesi **NON** supportati.
Questa situazione potrebbe verificarsi nel momento in cui esista un
conflitto tra la modalità di funzionamento del software ed una legge
specifica, un processo o una tecnologia. Tutti i Paesi sono specificati
usando *country code* a due lettere seguendo lo standard ISO 3166-1
alpha-2.

Chiave ``intendedAudience/scope``
'''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe
-  Presenza: opzionale
-  Valori accettabili: vedi :ref:`scope-list` 

Questa chiave contiene una lista di tag che rappresentano il campo
di applicazione del software.

I tag consentiti sono elencati nella :ref:`scope-list`. 

Sezione ``description``
~~~~~~~~~~~~~~~~~~~~~~~

Questa sezione contiene una descrizione generale del software. I parser
possono usare questa sezione ad esempio per creare una pagina web che
descriva il software.

**Nota bene:** siccome tutte le stringhe contenute in questa sezione sono
visibili all’utente e scritte in un linguaggio specifico, è
**necessario** specificare il linguaggio con il quale si sta modificando
il testo. Per farlo è necessario creare una sezione dedicata alla lingua
seguendo le specifiche IETF `BCP 47 <https://tools.ietf.org/html/bcp47>`__. Si
ricorda che il *primary language
subtag* non può essere omesso, come specificato nel BCP 47. 

Un esempio per l’italiano:

.. code:: yaml

   description:
     it:
       shortDescription: ...
       longDescription: ...

Nelle parti successive del documento, tutte le chiavi sono assunte essere
all’interno di una sezione con il nome della lingua (annoteremo questo
con ``[lang]``).

**Nota bene:** è obbligatorio avere *almeno* una lingua in questa
sezione. Tutte le altre lingue sono opzionali.

Chiave ``description/[lang]/localisedName``
'''''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa
-  Presenza: opzionale
-  Esempio: ``"Medusa"``

Questa chiave rappresenta un’opportunità di tradurre il nome in una
lingua specifica. Contiene il nome pubblico (corto) del prodotto.
Dovrebbe essere il nome con il quale la maggioranza delle persone
normalmente si riferisce al software. Nel caso in cui il software abbia
sia un nome “interno” che uno commerciale, è preferibile utilizzare
quello commerciale.

Chiave ``description/[lang]/genericName``
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa (max 35 caratteri)
-  Presenza: obbligatoria
-  Esempio: ``"Text Editor"``

Questa chiave rappresenta il “Nome generico”, riferito alla categoria
specifica alla quale il software appartiene. Normalmente è possibile
trovare il nome generico nella presentazione del software, quando si
scrive una frase del tipo: “Il software xxx è un yyy”. Esempi degni di
nota includono “Editor di Testi”, “Word Processor”, “Web Browser”,
“Chat” e così via. Il nome generico può avere una lunghezza fino a 35
caratteri.

Chiave ``description/[lang]/shortDescription``
''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa (max 150 caratteri)
-  Presenza: obbligatoria
-  Esempio: ``"Sistema avanzato di prenotazione per ospedali"``

Questa chiave contiene una breve descrizione del software. Dovrebbe
essere una singola linea contenente una singola frase. L’estensione
massima consentita è di 150 caratteri.

Chiave ``description/[lang]/longDescription``
'''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa (min 500 caratteri, max 10000 caratteri)
-  Presenza: obbligatoria (almeno per una lingua)

Questa chiave contiene una descrizione più lunga del software, con una
lunghezza che può variare da 500 a 1000 caratteri. Questa chiave è
pensata per fornire una panoramica delle caratteristiche del software
per un potenziale utente. Il destinatario di questo testo dovrebbe
essere l’utente finale, non nello sviluppatore. E’ possibile pensare a
questo testo come alla descrizione del software che potrebbe stare nel
sito web (nel caso in cui il software ne possieda uno).

Questa descrizione può contenere del Markdown base: ``*italic*``,
``**bold**``, elenchi puntati e ``[link](#)``.

Chiave ``description/[lang]/documentation``
'''''''''''''''''''''''''''''''''''''''''''

-  Tipo: URL
-  Presenza: opzionale

Questa chiave contiene un riferimento alla documentazione lato utente
(non lato sviluppatore) Questo valore deve essere una URL che punta ad
una versione ospitata della documentazione.

È suggerito che questa URL punti ad una versione ospitata della
documentazione che sia direttamente leggibile utilizzando un comune web
browser sia in formato desktop che mobile. La documentazione dovrebbe
essere renderizzata in HTML e navigabile come un sito web (con un
indice, una barra di ricerca, etc.).

Se la documentazione dovesse invece essere disponibile esclusivamente
sotto forma di documento, è possibile inserire il link diretto per
vedere/scaricare tale documento, sotto forma di URL, in questa chiave.
E’ consigliabile trattare la documentazione come parte del codice
sorgente e dunque gestirla tramite commit sul repository del codice
sorgente. In questo modo, sarà possibile fornire una URL diretta alla
piattaforma di hosting del codice (ad es., GitHub URL al file). E’
preferibile utilizzare formati aperti quali PDF o ODT per avere la
massima interoperabilità. Qualunque sia il formato della documentazione,
è importante ricordare di rilasciarne i sorgenti coperti da licenza
aperta, possibilmente effettuandone un commit all’interno del repository
stesso.

Chiave ``description/[lang]/apiDocumentation``
''''''''''''''''''''''''''''''''''''''''''''''

-  Tipo: URL
-  Presenza: opzionale

Questa chiave contiene un riferimento alla documentazione delle API del
software. Il valore deve essere una URL verso una versione ospitata
della documentazione.

E’ suggerito che questa URL punti ad una versione ospitata della
documentazione che sia direttamente leggibile utilizzando un comune web
browser. La documentazione dovrebbe essere renderizzata in HTML e
navigabile come un sito web (con un indice, una barra di ricerca, etc.),
e se c’è un riferimento ad un deployment di prova, questo dovrebbe
offrire un’interfaccia navigabile (e.g. Swagger).

Se la documentazione dovesse invece essere disponibile esclusivamente
sotto forma di documento, è possibile inserire il link diretto per
vedere/scaricare tale documento, sotto forma di URL, in questa chiave.
E’ consigliabile trattare la documentazione come parte del codice
sorgente e dunque gestirla tramite commit sul repository del codice
sorgente. In questo modo, sarà possibile fornire una URL diretta alla
piattaforma di hosting del codice (ad es., GitHub URL al file). E’
preferibile utilizzare formati aperti quali PDF o ODT per avere la

Qualunque sia il formato della documentazione, è importante ricordare di
rilasciarne i sorgenti coperti da licenza aperta, possibilmente
effettuandone un commit all’interno del repository stesso.

Chiave ``description/[lang]/features``
''''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe
-  Presenza: obbligatoria (almeno per una lingua)

Questa chiave contiene una lista di *feature* del software, che descriva
le possibilità offerte dallo stesso. Il target di questo testo sono i
decisori pubblici che potranno decidere di adottarlo o modificarlo. Per
questo motivo, queste feature *non* devono riferirsi agli sviluppatori:
invece di elencare le caratteristiche tecniche riferite ai dettagli
implementativi, è preferibile elencare le funzionalità lato utente.

Anche se questa chiave è obbligatoria, non c’è un limite minimo o
massimo sul numero di feature da elencare in questa chiave. Ogni feature
deve però avere un massimo di 100 caratteri.

Il numero di feature suggerito da elencare è tra 5 e 20, a seconda della
dimensione del software e della sua complessità. Non c’è bisogno di fare
una lista esaustiva, dal momento che gli utenti hanno sempre a
disposizione la documentazione per reperire ulteriori informazioni.

Chiave ``description/[lang]/screenshots``
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe (percorsi)
-  Presenza: opzionale
-  Formati: PNG, JPG
-  Esempio: ``"data/screenshots/configuration.png"``

Questa chiave indica una o più immagini del software (screenshot). Queste
hanno lo scopo di dare una panoramica dell'aspetto del software e del
suo funzionamento. Il valore può essere il percorso relativo al file a partire
dalla root del repository, oppure una URL assoluta che punta all'immagine in
versione raw. In entrambi i casi, il file deve risiedere all'interno del
medesimo repository che contiene il ``publiccode.yml``.  

Queste immagini possono essere di qualsiasi formato e dimensione; i
formati suggeriti sono:

-  Desktop: 1280x800 @1x
-  Tablet: 1024x768 @2x
-  Mobile: 375x667 @2x

Chiave ``description/[lang]/videos``
''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe (URL)
-  Presenza: opzionale
-  Esempio: ``"https://youtube.com/xxxxxxxx"``

Questa chiave contiene una o più URL di video che mostrano il
funzionamento del software. Così come gli screenshot, i video dovrebbero
essere usati per dare una rapida panoramica sull’aspetto e le
funzionalità del software. I video devono essere ospitati su una
piattaforma di video sharing che supporti lo standard
`oEmbed <https://oembed.com>`__; le opzioni più popolari sono YouTube e
Vimeo. 

**Nota bene:** dal momento che costituisce parte integrante della
documentazione, è opportuno che il video sia pubblicato con una licenza
aperta.

Chiave ``description/[lang]/awards``
''''''''''''''''''''''''''''''''''''

-  Tipo: array di stringhe
-  Presenza: opzionale

Una lista di premi assegnati al software.

Sezione ``legal``
~~~~~~~~~~~~~~~~~

Chiave ``legal/license``
''''''''''''''''''''''''

-  Tipo: stringa
-  Presenza: obbligatoria
-  Esempio: ``"AGPL-3.0-or-later"``

Questa stringa descrive la licenza con cui il software è distribuito. La
stringa deve contenere un’espressione SPDX valida che si riferisca ad
una (o più) licenze open-source. Per avere ulteriori informazioni a
riguardo è possibile visitare la `documentazione
SPDX <https://spdx.org/licenses/>`__.

Chiave ``legal/mainCopyrightOwner``
'''''''''''''''''''''''''''''''''''

-  Tipo: stringa
-  Presenza: opzionale
-  Esempio: ``"Città di Roma"``

Questa stringa descrive l’entità che possiede il copyright sulla maggior
parte del codice presente nel repository. Normalmente, questa è la linea
che viene riportata con il simbolo di copyright all’inizio della maggior
parte dei file nel repository.

E’ possibile elencare diversi proprietari se necessario, usando una
frase in inglese. E’ anche possibile riferirsi ad una community o ad un
gruppo di persone come ad esempio “Linus Torvalds and all Linux
contributors”.

Nel caso in cui non sia possibile individuare il maggior proprietario di
copyright, è possibile omettere questa chiave; in questi casi, se il
repository ha un file contenente il nome degli autori, è possibile
puntare a quel file attraverso ``legal/authorsFile`` (vedi più sotto).

Chiave ``legal/repoOwner``
''''''''''''''''''''''''''

-  Tipo: stringa
-  Presenza: opzionale
-  Esempio: ``"Città di Roma"``

Questa stringa descrive l’entità che possiede il repository; questa può
essere o non essere la stessa che possiede il copyright del codice
stesso. Ad esempio, nel caso di un fork del software originale, il
``repoOwner`` è probabilmente diverso dal ``mainCopyrightOwner``.

Chiave ``legal/authorsFile`` (*deprecated*)
'''''''''''''''''''''''''''''''''''''''''''

-  Tipo: stringa (percorso al file)
-  Presenza: opzionale
-  Esempio: ``"doc/AUTHORS.txt"``

Qualche software open-source adotta una convenzione che identifica il
detentore del copyright attraverso un file elencante tutte le entità
che possiedono il copyright. Questo è comune nei progetti fortemente
sostenuti dalla community ove esistono diversi contributori esterni e
non c’è un chiaro singolo detentore del copyright. In questi casi,
questa chiave può essere usata per riferirsi al suddetto file degli
autori, usando un percorso relativo alla radice (root) del repository.

Sezione ``maintenance``
~~~~~~~~~~~~~~~~~~~~~~~

Questa sezione fornisce informazioni sullo stato di manutenzione del
software, utile per valutare se il software è attivamente sviluppato o
meno.

Chiave ``maintenance/type``
'''''''''''''''''''''''''''

-  Tipo: enumerate
-  Presenza: obbligatoria
-  Valori: ``"internal"``, ``"contract"``, ``"community"``, ``"none"``

Questa chiave descrive come il software è attualmente manutenuto.
Le chiavi sono:

-  ``internal`` - significa che il software è manutenuto internamente dal
   proprietario del repository; 
-  ``contract`` - significa che c’è un contratto commerciale che lega un’entità
   alla manutenzione del software;
-  ``community`` - significa che il software è attualmente manutenuto da
   una o più persone che offrono il loro tempo al progetto; 
-  ``none`` - significa che il software non è al momento manutenuto.

Chiave ``maintenance/contractors``
''''''''''''''''''''''''''''''''''

-  Tipo: array di Contractor (vedi sotto)
-  Presenza: obbligatoria se ``maintenance/type`` **è** ``contract``; non deve essere presente negli altri casi

Questa chiave descrive l’entità o le entità, se ce ne sono, che
attualmente hanno un contratto di manutenzione del software. Queste
possono essere aziende, organizzazioni o altri nomi collettivi.

Chiave ``maintenance/contacts``
'''''''''''''''''''''''''''''''

-  Tipo: Lista di Contatti (vedi sotto)
-  Presenza: obbligatoria se ``maintenance/type`` **è** ``internal`` oppure ``community``; opzionale negli altri casi

Uno o più contatti di chi sta mantenendo il software.

Questa chiave descrive le persone tecniche che attualmente sono
responsabili della manutenzione del software. Tutti i contatti devono
essere di una persona fisica, non un’azienda o un’organizzazione. Se
un contatto funge da rappresentante di un’istituzione, questo rapporto
deve essere esplicitato attraverso la chiave ``affiliation``.

Nel caso di un accordo commerciale (o una catena di tali accordi),
specificare le entità finali che sono effettivamente contrattate per
fornire la manutenzione. Non specificare il proprietario del software a
meno che sia tecnicamente coinvolto anche nella manutenzione del
prodotto.

Sezione ``localisation``
~~~~~~~~~~~~~~~~~~~~~~~~

Questa sezione fornisce una panoramica sulle funzionalità di
localizzazione del software.

Chiave ``localisation/localisationReady``
'''''''''''''''''''''''''''''''''''''''''

-  Tipo: booleano
-  Presenza: obbligatoria

Se ``yes``, il software ha l’infrastruttura o è stato progettato per
essere multi-lingua. Ad ogni modo, questo campo non pregiudica
l’esistenza di una traduzione in altre lingue ma si riferisce
esclusivamente all’aspetto tecnologico. Per l’elenco delle lingue
disponibili si veda la chiave ``localisation/availableLanguages``.

Chiave ``localisation/availableLanguages``
''''''''''''''''''''''''''''''''''''''''''

-  Tipo: lista di *language tag* secondo le specifiche IETF BCP 47
-  Presenza: obbligatoria
-  Esempio: ``"it"``, ``"en"``, ``"sl-IT-nedis"``

Se presente, questa è la lista di lingue in cui è disponibile il
software. Ovviamente, questa lista dovrà contenere almeno una lingua.
Si ricorda che il *primary language subtag* non può essere omesso, come
specificato dal `BCP 47 <https://tools.ietf.org/html/bcp47>`__.

Sezione ``dependsOn``
~~~~~~~~~~~~~~~~~~~~~

Questa sezione fornisce una panoramica delle dipendenze a livello di
sistema necessarie per installare ed utilizzare il software.

**Nota bene:** non elencare le dipendenze a livello di codice sorgente
(ad es., librerie software usate), e focalizza solo su dipendenze di
sistema e/o a runtime che devono essere installate e manutenute
separatamente. Ad esempio, un database è un buon esempio di questo tipo
di dipendenza.

Chiave ``dependsOn/open``
'''''''''''''''''''''''''

-  Tipo: array di ``dependency`` (vedi sotto)
-  Presenza: opzionale

Questa chiave contiene una lista di dipendenze a runtime che sono
distribuite con una licenza di tipo open-source.

Chiave ``dependsOn/proprietary``
''''''''''''''''''''''''''''''''

-  Tipo: array di ``dependency`` (vedi sotto)
-  Presenza: opzionale

Questa chiave contiene una lista di dipendenze a runtime che sono
distribuite con una licenza proprietaria.

Chiave ``dependsOn/hardware``
'''''''''''''''''''''''''''''

-  Tipo: array di ``dependency`` (vedi sotto)

This key contains a list of hardware dependencies that must be owned to use the
software.


Formati di dato speciali
------------------------

Dependency
~~~~~~~~~~

Una ``dependency`` è un oggetto complesso. Le proprietà sono le
seguenti:

-  ``name`` - **obbligatoria** - Il nome della dipendenza (e.g. MySQL,
   NFC Reader);
-  ``versionMin`` - la prima versione compatibile;
-  ``versionMax`` - l’ultima versione compatibile;
-  ``version`` - l’unica versione major con la quale il software è
   compatibile. Si assume la compatibilità con tutte le *patch* e i
   *bugfix* che saranno applicati successivamente a questa versione;
-  ``opzionale`` - se la dipendenza è opzionale o obbligatoria.

Versioning complesso
~~~~~~~~~~~~~~~~~~~~

E’ ovviamente possibile utilizzare le varie chiavi per specificare una
matrice di compatibilità complessa.

*Ex. 1*

.. code:: yaml

   - name: PostgreSQL
     version: "3.2"
     opzionale: yes

Questo snippet segnala una dipendenza opzionale verso PostgreSQL,
nell’esattezza la sua versione 3.2.

*Ex. 2*

.. code:: yaml

   - name: MySQL
     versionMin: "1.1"
     versionMax: "1.3"

Questo snippet segnala una dipendenza obbligatoria verso MySQL,
permettendo ogni versione tra la 1.1 e la 1.3.

Contatto
~~~~~~~~

Un Contatto è un oggetto con le seguenti proprietà:

-  ``name`` - **obbligatoria** - Questa chiave contiene il nome completo
   di uno dei contatti tecnici. Deve essere una persona reale; NON
   popolare questa chiave con informazioni di contatto generiche,
   dipartimenti dell’azienda, associazioni, etc.
-  ``email`` - Questa chiave contiene l’indirizzo email del contatto
   tecnico. Deve essere un indirizzo email per il contatto diretto con
   il tecnico; NON popolare questa chiave con mailing-list o punti di
   contatto generico tipo “info@acme.inc”. Questo indirizzo email non
   deve essere offuscato. Per migliorare la resistenza contro la
   raccolta di indirizzi email, usare ``\x64`` per sostituire ``@``,
   siccome questo è permesso dalle specifiche YAML.
-  ``phone`` - Numero telefonico (con prefisso internazionale). Questa chiave
   deve essere una stringa.
-  ``affiliation`` - Questa chiave contiene informazioni esplicite sui
   contatti tecnici. Nel caso esistano diversi maintainer, questa chiave
   può essere usata per creare relazioni tra diversi contatti tecnici e
   entità di manutenzione. Ad esempio, può contenere il nome di
   un’azienda, il nome di un’associazione, etc.

Contractor
~~~~~~~~~~

Un Contractor è un oggetto con le seguenti proprietà:

-  ``name`` - **obbligatoria** - Il nome del contractor, sia esso
   un’azienda o una persona fisica.
-  ``until`` - **obbligatoria** - Questa è una data (YYYY-MM-DD). Questa
   chiave deve contenere una data alla quale la manutenzione finirà. Nel
   caso di manutenzione gestita dalla community, questo valore non deve
   essere maggiore di 2 anni nel futuro, e quindi deve essere
   regolarmente aggiornata man mano che la community continua a lavorare
   al progetto.
-  ``email`` - Questa chiave contiene l’indirizzo email del contatto
   tecnico. Deve essere un indirizzo email per il contatto diretto con
   il tecnico; NON popolare questa chiave con mailing-list o punti di
   contatto generico tipo “info@acme.inc”. Questo indirizzo email non
   deve essere offuscato. Per migliorare la resistenza contro la
   raccolta di indirizzi email, usare ``\x64`` per sostituire ``@``,
   siccome questo è permesso dalle specifiche YAML.
-  ``website`` - Questa chiave punta al sito del maintainer. Può puntare
   al principale sito istituzionale, o ad una pagina o sito più
   specifica.

Data
~~~~

Tutte le date in ``publiccode.yml`` devono aderire al formato
“YYYY-MM-DD” che è uno dei formati permessi da ISO8601. **Nota
bene:** questo è l’unico formato permesso, quindi non sono consentiti
gli altri formati previsti da ISO8601.

Codifica
~~~~~~~~
La codifica di ``publiccode.yml`` **DEVE** essere UTF-8.
