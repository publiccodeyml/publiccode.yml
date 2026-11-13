publiccode.yml ist ein Metadaten-Standard für Repositories, die von der öffentlichen Verwaltung entwickelte oder erworbene Software enthalten, mit dem Ziel, diese leicht auffindbar und damit für andere Stellen wiederverwendbar zu machen.

Indem man eine publiccode.yml-Datei in das Stammverzeichnis eines Repositories aufnimmt und sie mit Informationen über die Software füllt, können Techniker und Beamte diese auswerten.

Das Format ist sowohl für Menschen als auch für Maschinen leicht lesbar, und automatische Indizierungswerkzeuge bauen darauf auf: nationale Softwarekataloge erfassen die veröffentlichten Dateien und erstellen durchsuchbare Websites. Die Kataloge föderieren länderübergreifend, da sie alle dasselbe Format lesen. Die `Kernwerkzeuge <https://github.com/publiccodeyml/publiccode.yml#core-tools>`__ stellen die Referenzimplementierungen bereit, auf denen man aufbauen kann.

publiccode.yml ist gemäß den nationalen `Leitlinien <https://docs.italia.it/AgID/linee-guida-riuso-software/lg-acquisizione-e-riuso-software-per-pa-docs/>`__ für die gesamte in Italien entwickelte öffentliche Software verpflichtend: So kann der Crawler von Developers Italia den `nationalen Softwarekatalog <https://developers.italia.it/>`__ aufbauen. Der Standard wird auch von `opencode.de <https://opencode.de>`__ verwendet, dem deutschen Verzeichnis für Open Source in der öffentlichen Verwaltung. publiccode.yml ist darauf ausgelegt, international interoperabel zu sein.

Zu den Informationen, die in einer publiccode.yml-Datei enthalten sind, gehören:

* Name und Beschreibung des Projekts oder Produkts (in einer oder mehreren Sprachen);

* Der Entwicklungsgrad (z. B. Konzept, in Entwicklung, Beta-Version, stabile Version, veraltet);

* Kontaktdaten der Institution, die die Code-Basis veröffentlicht hat;

* Kontaktdaten der pflegenden Institution (wenn vorhanden), inklusive des Ablaufdatums des Pflegevertrags;

* Informationen über die rechtlichen Rahmenbedingungen, für die das Projekt entwickelt wurde;

* Abhängigkeiten

und noch viel mehr.

Inhaltsverzeichnis
------------------

.. toctree::
   :maxdepth: 2

   schema.core.rst
   country.rst
   forks.rst
   categories-list.rst
   scope-list.rst
   aliases-list.rst
   example.rst
