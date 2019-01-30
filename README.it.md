# Lo Standard `publiccode.yml`

`publiccode.yml` è uno standard di metadati adatto a repository
di software pubblico e di policy. Questo standard ha lo scopo
di rendere il software sviluppato dalle Pubbliche Amministrazioni e Pubbliche
Organizzazioni facile da individuare e, di conseguenza, riutilizzare. Proprio
per questo motivo, è stato pensato per essere semplice da adottare sia per gli
sviluppatori che per i non addetti ai lavori. 

## Versioni

**Ultimo rilascio: [Versione
0.1](https://github.com/italia/publiccode.yml/releases/latest)**

[Vedi tutte le versioni](https://github.com/italia/publiccode.yml/releases)

Questo progetto aderisce al modello di versioning [*Semantic
Versioning*](https://semver.org/).

Inoltre, questo progetto usa i *branch* e i *tag* di git nel seguente modo:
* il branch `master` contiene l'ultima versione stabile dello standard;
* il branch `development` contiene gli aggiornamenti proposti e in discussione
  per la prossima versione dello standard;
* La [release page](https://github.com/italia/publiccode.yml/releases) di
  GitHub contiene tutte le versioni rilasciate dello standard. Le *release*
  sono effettuate seguendo il nome del tag per questioni di coerenza (ad es.,
  il tag `v0.1` implica una release denominata `v0.1`). 

Le specifiche `publiccode.yml` sono sviluppate dal [Team per la Trasformazione
Digitale](https://teamdigitale.governo.it) e dagli [Autori](AUTHORS.md).

## A cosa serve questo file

Molto software di qualità è stato sviluppato da diverse Pubbliche
Amministrazioni ma i casi di riuso sono scarsi. Alcune tra le ragioni per la bassa
adozione di tali progetti sono la difficoltà nel rilevarli così come la
difficoltà nel capire se un dato progetto possa funzionare o meno nel contesto
di una Pubblica Amministrazione differente. 

Lo standard `publiccode.yml` ha lo scopo di risolvere queste problematiche.
Infatti, si tratta di un semplice file che può essere letto facilmente sia dai
dipendenti pubblici, che vogliono capire se possono usare o meno un dato
software, che da un calcolatore.
Lo standard contiene informazioni quali:
* il titolo e la descrizione del progetto o prodotto in inglese e/o altre
  lingue;
* lo stato dello sviluppo ad es., `concept`, `development`, `beta`, `stable`,
  `obsolete`;
* quale organizzazione ha sviluppato il progetto;
* chi si sta occupando della sua manutenzione e quando finirà;
* chi contattare per domande di tipo tecnico o di supporto;
* per quale quadro giuridico è stato pensato questo progetto o prodotto;
* quali dipendenze software esistono. 

Il formato del file `publiccode.yml` è pensato per essere facilmente aggiunto
ad ogni nuovo progetto e potrà cambiare ed adattarsi ai cambiamenti rispetto al
contesto nel quale è stato originariamente sviluppato. 

## La ricerca dei progetti

La ricerca dei progetti dipende da come le API sono state strutturate per ogni
piattaforma di hosting. Ad esempio, per quanto riguarda la piattaforma GitHub,
è possibile trovare tutti i progetti che adottano lo standard `publiccode.yml`
attraverso l'interfaccia di frontend del portale oppure usando le API.

* [Ricerca tramite GitHub `filename:publiccode.yml
  path:/`](https://github.com/search?q=filename%3Apubliccode.yml+path%3A%2F)

Il Team per la Trasformazione Digitale sta anche lavorando per fornire uno
scanner che cerchi tutti i file `publiccode.yml` su tutti i siti accessibili
pubblicamente, per poi pubblicarli sotto forma di open data. 

## Come contribuire 

Sentitevi liberi di aprire delle [Pull Requests e di presentare un problema
con una Issues](CONTRIBUTING.md).

## Licenza

Il progetto è coperto da una licenza [CC-0](LICENSE).
