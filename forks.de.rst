3. Forks und Varianten
========================

Wie bereits erwähnt, kann ein Fork zwei verschiedene Formen haben, abhängig von dem letztlichen Ziel. Um zu verdeutlichen, wie die ``publiccode.yml`` in beiden Fällen zu behandeln ist, definieren wir im Folgenden zwei verschiedene Semantiken: technische Forks und Software-Varianten.

Technische Forks (z.B. zur Veröffentlichung von Patches)
--------------------------------------------------------

Ein technischer Fork ist ein Fork, der von einem Entwickler zu dem Zweck gemacht wird, an der ursprünglichen Codebasis zu arbeiten oder Verbesserungen an die ursprünglichen Autoren zu senden, ohne das explizite Ziel, eine alternative Variante der ursprünglichen Software zu erstellen und zu veröffentlichen.

Im Kontext von verteilten Kontrollsystemen und kollaborativen Code-Hosting-Plattformen wie GitHub wird Forking fast immer von Entwicklern als Schritt verwendet, um an einem Beitrag zu einer bestehenden Codebasis zu arbeiten, indem sie "Pull Requests" senden.

Aufgrund der Art und Weise, wie Forks auf GitHub und anderen Plattformen funktionieren, veröffentlichen Entwickler ihre Forks als perfekte Kopien der ursprünglichen Software, also auch die ``publiccode.yml``. Parser müssen jedoch in der Lage sein, solche technischen Forks von der ursprünglichen Codebasis zu unterscheiden.

Parser
~~~~~~

Parser **SOLLTEN** einen technischen Fork erkennen, indem sie bemerken, dass der Top-Level ``URL``-Key nicht auf das Repository verweist, in dem sich die ``publiccode.yml`` befindet.

Parser **KÖNNEN** einen technischen Fork auch durch Metadaten identifizieren, die von der Code-Hosting-Plattform offengelegt werden können (z. B.: GitHub kennzeichnet Forks explizit als Forks).

Autoren
~~~~~~~

Autoren von technischen Forks **SOLLTEN** die Datei ``publiccode.yml`` in keinster Weise verändern. Insbesondere **DÜRFEN** sie **NICHT** den Top-Level-``URL``-Key ändern, der weiterhin auf das ursprüngliche Repository verweisen **MUSS**.

Es gibt keinen expliziten Key um einen Fork als technischen Fork zu markieren. Dies ist eine bewusste Design-Entscheidung, weil wir nicht möchten, dass die Autoren von technischen Forks die ``publiccode.yml`` kennen und notwendigerweise wissen, wie sie sie modifizieren können. Das aktuelle Design verlangt von den Autoren nicht, irgendetwas zu tun.

Software-Varianten
------------------

Eine Software-Variante ist ein Fork, der als Alternative zur ursprünglichen Upstream-Software angeboten wird.

Sie enthält Änderungen, die noch nicht Teil der Upstream-Version sind, wie mehr Funktionen, andere Abhängigkeiten, Optimierungen, usw.

Indem ein Fork als Variante markiert wird, zeigt der Autor, dass er glaubt, dass die Variante einen vollständigen und funktionierenden Satz von Änderungen enthält, die für andere Leute nützlich sein könnten.

Einen Fork als Variante zu markieren, hat **nichts** mit der Bereitschaft zu tun, einen Beitrag zum Upstream zu leisten; der Autor könnte immer noch planen, die Änderungen zum Upstream beizutragen, oder sogar gerade dabei sein, dies zu tun. Also, selbst wenn der Fork sich schließlich in den Upstream fügt, kann es sinnvoll sein, ihn während des Prozesses als Variante zu markieren, damit andere ihn entdecken und davon profitieren können.
 
Parser
~~~~~~

Parser **SOLLTEN** eine Variante identifizieren, indem sie feststellen, dass der Top-Level ``URL``-Key mit dem Repository übereinstimmt, in dem die ``publiccode.yml`` gefunden wird, **UND** ein ``isBasedOn`` auf oberster Ebene existiert und auf ein anderes Repository verweist.

Parser sollten andere Unterschiede in der ``publiccode.yml`` zwischen Varianten der Software voraussetzen und analysieren. Insbesondere ``description/features`` ist dazu gedacht, zwischen Varianten verglichen zu werden, um für den Benutzer sichtbare Unterschiede zu identifizieren und anzuzeigen.

Autoren
~~~~~~~

Autoren, die bereit sind, einen Fork als Variante zu veröffentlichen, **MÜSSEN** mindestens:

- einen Key ``isBasedOn`` hinzufügen, der auf ein oder mehrere Upstream-Repositories verweist, von denen diese Variante abgeleitet ist. 

- den Wert für ``URL`` so ändern, dass er auf das Repository verweist, das die Variante enthält. 

- den Wert für ``legal/repoOwner`` ändern, um auf sich selbst (die Autoren der Variante) zu verweisen. 

- auf den ``Maintenance``-Abschnitt zurückkomenn, um auf den Maintenance-Status der Variante zu verweisen. 

Außerdem **SOLLTEN** die Autoren die folgenden Änderungen evaluieren: 

- Merkmale, die die Variante vom ``description/features``-Key unterscheiden. Bestehende Merkmale **SOLLTEN NICHT** bearbeitet oder aus dieser Liste entfernt werden, es sei denn, sie wurden aus der Variante entfernt, um Parsern einen einfachen Vergleich von Merkmalslisten zu ermöglichen. 
