# Der publiccode.yml Standard

Ein Metadaten-Deskriptions-Standard für öffentliche Software.


>Dokumentation auf Deutsch

>Die aktuelle Dokumentation finden Sie auf der [publiccode.yml-Website](https://publiccodeyml.github.io/).

---


## Inhalt

- [Beschreibung](#beschreibung)
- [Funktion der Datei](#funktion-der-datei)
- [Dokumentation](#dokumentation)
- [Projekte Finden](#projekte-finden)
- [Branches](#branches)
- [Mitwirken](#mitwirken)
- [Autoren](#autoren)
- [Lizensierung](#lizensierung)


## Beschreibung

Ein Metadaten-Deskriptions-Standard für öffentliche Software und Repositories, der sowohl für Entwickler als auch für Personen mit weniger technischem Hintergrund einfach zu verwenden ist, um von öffentlichen Verwaltungen und öffentlichen Organisationen entwickelte Software leicht auffindbar zu machen.


## Funktion der Datei

Viele gute Software-Projekte werden von und für die öffentliche Verwaltung entwicklt, allerdings ist die Nachnutzung dieser Projekte meist sehr begrenzt. Einige der Gründe dafür sind die geringe Auffindbarkeit und die Schwierigkeit festzustellen, welche Projekte tatsächlich innerhalb der Gegebenheiten anderer Verwaltungen funktionieren.
Die Publiccode.yml-Datei soll diese Probleme lösen. Daher handelt es sich um eine Datei, die sowohl für Mitarbeitende der Verwaltung, die herausfinden möchten, ob sie ein Projekt nachnutzen können, leicht lesbar ist als auch für Computer. Es enthält Informationen, wie:

* Den Titel und die Beschreibung des Projekts oder Produkts auf Englisch und/oder anderen Sprachen;

* Den Entwicklungsstatus, z. B. Konzept, In Entwicklung, Beta, Stabil, Veraltet;

* Wer sich um die Wartung kümmert und bis wann;

* Wer Ansprechpartner für technische oder Support-Anfragen ist;

* Für welchen nationalen und lokalen Rechtsrahmen das Projekt oder Produkt konzipiert ist;

* welche Software-Abhängigkeiten dieses Projekt oder Produkt hat.

Das Dateiformat Publiccode.yml soll sowohl einfach zu jedem neuen Projekt hinzugefügt werden können, als auch mit dem Projekt mitwachsen, wenn es über den ursprünglichen Rahmen, in dem es entwickelt wurde, hinaus expandiert.


## Dokumentation

Die aktuelle Dokumentation des Projekts wird auf der [publiccode.yml-Website](https://publiccodeyml.github.io/) veröffentlicht. Die übersetzten Standardseiten bleiben in diesem Repository erhalten.


## Projekte Finden

Das Finden von Projekten hängt von der Struktur der Such-API der jeweiligen Hosting-Plattform ab. Zum Beispiel findet man alle Publiccode.yml-Dateien in GitHub-Dateien über eine Suche über das Frontend oder die API.

    GitHub Search filename:publiccode.yml path:/

Das Italienische "Digital Transformation Team" arbeitet auch daran einen Scanner zur Verfügung zu stellen, der nach alle Publiccode.yml-Dateien auf allen öffentlich zugänglichen Webseiten sucht und sie als offene Daten bereitstellt.


## Branches

Die aktuelle veröffentlichte Version des Standards ist 0.8. Alle Versionen
finden Sie auf der [GitHub-Release-Seite](https://github.com/publiccodeyml/publiccode.yml/releases).

Das Projekt folgt der semantischen Versionierung. Mehr Informationen finden Sie unter [SemVer.org](https://semver.org/).

Außerdem nutzt das Projekt Branches und Tags folgendermaßen:

* Der `main`-Branch ist der Entwicklungs-Branch des Projekts.

* Die Release-Seite auf GitHub enthält die veröffentlichten Versionen des Standards.

* Releases verwenden Versions-Tags nach der semantischen Versionierung.



## Mitwirken

[Sie sind herzlich eingeladen Pull Requests oder Issues einzureichen](https://github.com/publiccodeyml/publiccode.yml/blob/main/CONTRIBUTING.md).


## Autoren

Die Publiccode.yml-Spezifikationen werden von den [Autoren](https://github.com/publiccodeyml/publiccode.yml/blob/main/AUTHORS.md) entwickelt.


## Lizensierung

Lizensiert unter [CC-0](https://github.com/publiccodeyml/publiccode.yml/blob/main/LICENSE).
