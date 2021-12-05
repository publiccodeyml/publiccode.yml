# Der publiccode.yml Standard

Ein Metadaten-Deskriptions-Standard für öffentliche Software.


>Dokumentation auf Deutsch

>Read documentation in [English](https://docs.italia.it/italia/developers-italia/publiccodeyml-en/en/master/)

>Leggi la documentazione in [italiano](https://docs.italia.it/italia/developers-italia/publiccodeyml/it/master/)

---


## Inhalt

- [Beschreibung](#beschreibung)
- [Funktion der Datei](#Funktion-der-Datei)
- [Dokumentation](#Dokumentation)
- [Projekte Finden](#Projekte-Finden)
- [Branches](#Branches)
- [Mitwirken](#Mitwirken)
- [Autoren](#Autoren)
- [Lizensierung](#Lizensierung)


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

Dieses Repository ist strukturiert, um mit der Docs-Italia-Plattform kompatibel zu sein. Daher wird der Inhalt der relevanten Ordner innerhalb dieser Plattform kompliliert und gerendert. Die Docs-Italia-Plattform greift auf das GitHub-Repository des Dokuments zurück, um mit verschiedenen Releases und lokalisierten Versionen umgehen zu können. Die Plattform kann als die standardmäßige Landing-Page des Projekts angesehen werden.


## Projekte Finden

Das Finden von Projekten hängt von der Struktur der Such-API der jeweiligen Hosting-Plattform ab. Zum Beispiel findet man alle Publiccode.yml-Dateien in GitHub-Dateien über eine Suche über das Frontend oder die API.

    GitHub Search filename:publiccode.yml path:/

Das Italienische "Digital Transformation Team" arbeitet auch daran einen Scanner zur Verfügung zu stellen, der nach alle Publiccode.yml-Dateien auf allen öffentlich zugänglichen Webseiten sucht und sie als offene Daten bereitstellt.


## Branches

Neuester Release:

Alle Versionen https://github.com/italia/publiccode.yml/releases

Das Projekt folgt der Sematischen Versionierung. Mehr Informationen finden Sie unter [SemVer.org](https://semver.org/).

Außerdem nutzt das Projekt Branches und Tags folgendermaßen:

* Der Master-Branch enthält die aktuelle stabile Version des Standards.

* Der Entwicklungs-Branch enthält die vorgeschlagenen Verbesserungen für die nächste Version.

* Die Release-Seite auf GitHub enthält alle veröffentlichten Versionen des Standards. Aus Gründen der Einheitlichkeit folgen Releases der Tag-Version.

Da das Repository jedoch sowohl das Kernschema als auch die länderspezifischen Schemata enthält, ist es notwendig, die Versionierung weiter zu verfeinern. Daher wird jede Aktualisierung am Kern und/oder an einer länderspezifischen Erweiterung mit folgenden Tags gekennzeichnet:

    core-x.y.z;cc-a.b.c

Dabei steht cc für den Ländercode, der im countryExtensionVersion key definiert wird.

Dieses Versionierungsschema ist grundlegend für das Projekt, da die Publiccode.yml-Datei Verweise auf den Kern-Release im publiccodeYmlVersion key enthält und jedes länderspezifische Schema einen version key enthält.

Beispiele für dieses Versionsierungsschema sind:

    core:0.2;it:0.4

    core:0.2;fr:1.1



## Mitwirken

[Sie sind herzlich eingeladen Pull Requests oder Issues einzureichen](https://github.com/italia/publiccode.yml/blob/master/CONTRIBUTING.md).


## Autoren

Die Publiccode.yml-Spezifikationen werdem vom [Italian Digital Transformation Team](https://teamdigitale.governo.it/) und von den [Autoren](https://github.com/italia/publiccode.yml/blob/master/AUTHORS.md) entwickelt.


## Lizensierung

Lizensiert unter [CC-0](https://github.com/italia/publiccode.yml/blob/master/LICENSE).
