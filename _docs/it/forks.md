# `publiccode.yml` - Fork e varianti 

Questo documento descrive come gestire l'aggiornamento di `publiccode.yml` nel
contesto di un software fork. Per questioni di chiarezza, qui di seguito
distinguiamo le due possibilità: fork tecnici e varianti software.

## Fork tecnici (i.e. pubblicare patch)

Un fork tecnico è un fork eseguito da uno sviluppatore con lo scopo di lavorare
sulla *code base* originale o per inviare miglioramenti agli autori del
software originale, senza la finalità esplicita di creare e mantenere una
variante alternativa del software originale. 

Nel contesto di un sistema di controllo distribuito e piattaforme di hosting di
codice collaborative quali GitHub, lo strumento del *fork* è quasi sempre usato
dagli sviluppatori come il primo passo per lavorare ad un contributo su un

Visto il modo in cui il sistema di *forking* funziona su GitHub ed altre
piattaforme simili, gli sviluppatori pubblicano i propri fork sotto forma di
copie perfette del software originale, quindi includendo anche il file
`publiccode.yml` originale. I parser devono essere in grado di distinguere
questi fork tecnici dalla *code base* originale. 

### Parser

I *parser* **DOVREBBERO** identificare un fork tecnico notando che la chiave
top-level `url` non punta al repository dove si trova il file `publiccode.yml`. 

I *parser* **POTREBBERO** identificare un fork tecnico anche attraverso
i metadati che potrebbero essere esposti dalla piattaforma di code hosting
(e.g., GitHub contrassegna i fork esplicitamente come fork). 

### Autori

Gli autori di un fork tecnico **NON DOVREBBERO** modificare il file
`publiccode.yml` in alcun modo. Più nello specifico, **NON DEVONO** modificare
la chiave top-level `url` in quanto questa **DEVE** continuare a puntare al
repository originale. 


Non c'è una chiave specifica per contrassegnare un fork come tecnico. Questa
è una scelta consapevole di design perché non vogliamo che gli autori di un
fork tecnico debbano necessariamente essere consapevoli del file `publiccode.yml` e 
di come doverlo modificare. Il design corrente non richiede che
questi autori facciano alcunché. 

## Varianti software 

Una variante software è un fork che rappresenta una valida alternativa al
software originale upstream.

Questa contiene modifiche che non sono ancora parte della versione upstream,
come ad esempio più funzionalità, dipendenze diverse, ottimizzazioni, etc. 

Contrassegnando un fork come una variante, l'autore indica che questa variante
include una serie di modifiche complete e funzionanti che potrebbero giovare ad
altre persone. 

Contrassegnare un fork come una variante **non** pregiudica la volontà di
contribuire upstream; l'autore potrebbe comunque voler contribuire upstream
o essere in attesa di farlo. Perciò, anche se il fork alla fine verrà inclusa
(merge) upstream, potrebbe aver senso contrassegnarla come una variante durante
queste fasi di lavoro intermedie, in modo tale che anche altri possano trovarla
e beneficiarne. 

### Parser

I parser **DOVREBBERO** identificare una variante notando che la chiave
top-level `url` è uguale al repository nel quale il file `publiccode.yml`
risiede, **E** una chiave top-level `isBasedOn` esiste e punta ad un altro
repository. 

I parser dovrebbero aspettarsi e analizzare altre differenze nelle due varianti
dei file `publiccode.yml`. In particolare, la chiave `description/features`
è pensata per essere comparata tra diverse varianti in modo da identificare
e visualizzare le differenze lato utente. 


### Autori

Gli autori che vorrebbero pubblicare un fork come una variante **DEVONO**
almeno:

* Aggiungere una chiave `isBasedOn` che punti a uno o più repository upstream
  dai quali questa variante deriva. 
* Cambiare il valore di `url` per farla puntare al repository che ospita la
  variante. 
* Cambiare il valore di `legal/repoOwner` per identificarsi come autori della
  variante. 
* Rivisitare la sezione denominata `maintenance` per aggiornare lo stato di
  manutenzione della variante. 

Inoltre, gli autore **DOVREBBERO** valutare di fare anche i seguenti cambiamenti:

* Aggiungere le funzionalità che differenziano le varianti alla chiave
  `description/features`. Le funzionalità esistenti **NON DOVREBBERO** essere
  modificate o rimosse da questa lista a meno che esse siano state rimosse
  dalla variante, per permettere ai parser di comparare facilmente la lista
  delle funzionalità. 
