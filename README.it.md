# Lo Standard `publiccode.yml`

[![GitHub release](https://img.shields.io/github/release/italia/publiccode.yml.svg?style=plastic)](https://github.com/italia/publiccode.yml/releases)
[![Join the #publiccode channel](https://img.shields.io/badge/Slack%20channel-%23publiccode-blue.svg)](https://developersitalia.slack.com/messages/CAM3F785T)
[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)
[![Docs
Italia](https://docs.italia.it/media/static/projects/badges/passing.svg)](https://docs.italia.it/italia/developers-italia/publiccodeyml/it/master/index.html)
[![Documentation](https://img.shields.io/badge/Documentation-Docs%20Italia-blue.svg)](https://docs.italia.it/italia/developers-italia/publiccodeyml/it/master/index.html)

> Uno standard di descrizione di metadati per software pubblico 

---

## Table of Contents

- [Descrizione](#descrizione)
- [A cosa serve questo file](#a-cosa-serve-questo-file)
- [Documentazione](#documentazione)
- [Trovare progetti](#la-ricerca-dei-progetti)
- [Versioning](#versioning)
- [Contributing](#come-contribuire)
- [Autori](#autori)
- [License](#license)

## Descrizione

`publiccode.yml` è uno standard di metadati adatto a repository
di software pubblico e di policy. Questo standard ha lo scopo
di rendere il software sviluppato dalle Pubbliche Amministrazioni e Pubbliche
Organizzazioni facile da individuare e, di conseguenza, riutilizzare. Proprio
per questo motivo, è stato pensato per essere semplice da adottare sia per gli
sviluppatori che per i non addetti ai lavori. 

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

## Documentazione

Questo repository è strutturato per essere compatibile con [Docs Italia](https://docs.italia.it/italia/developers-italia/publiccodeyml/it/master/index.html).
Per questo motivo, il contenuto delle rilevanti cartelle sarà compilato
e renderizzato all'interno di tale piattaforma. `Docs Italia` è progettato per
supportare un documento localizzato in diverse lingue e per questo motivo è la
piattaforma di riferimento per visualizzare questo standard.

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

## Versioning

**Ultimo rilascio:** [![GitHub release](https://img.shields.io/github/release/italia/publiccode.yml.svg?style=plastic)](https://github.com/italia/publiccode.yml/releases) [See all versions](https://github.com/italia/publiccode.yml/releases)

[Vedi tutte le versioni](https://github.com/italia/publiccode.yml/releases)

Questo progetto aderisce al modello di versioning [*Semantic
Versioning*](https://semver.org/).

Inoltre, questo progetto usa i *branch* e i *tag* di git nel seguente modo:
* il branch `master` contiene l'ultima versione stabile dello standard;
* il branch `development` contiene gli aggiornamenti proposti e in discussione
  per la prossima versione dello standard;
* La [release page](https://github.com/italia/publiccode.yml/releases) di
  GitHub contiene tutte le versioni rilasciate dello standard. Le *release*
  sono effettuate seguendo il nome del tag per questioni di coerenza.

Siccome questo repository contiene sia lo schema `core` che quelli contenenti
le estensioni per ogni paese, è necessario adottare una strategia di versioning
più raffinata. Per questo motivo, ogni update al core e/o ad un'estensione
specifica per Paese, sarà taggata come segue:

> core-x.y.z/<cc>-a.b.c

dove <cc> rappresenta il codice del paese presente nella chiave
`countryExtensionVersion` dello schema modificato. 

## Come contribuire 

Sentitevi liberi di aprire delle [Pull Requests e di presentare un problema
con una Issues](CONTRIBUTING.md).

## Autori
Le specifiche `publiccode.yml` sono sviluppate dal [Team per la Trasformazione
Digitale](https://teamdigitale.governo.it) e dagli [Autori](AUTHORS.md).

## Licenza

Il progetto è coperto da una licenza [CC-0](LICENSE).
