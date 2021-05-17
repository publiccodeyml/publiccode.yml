.. _german-extensions:

Deutschland
-----------

Die hier aufgeführten Erweiterungen sind spezifisch für Deutschland und daher 
müssen sie in dem Abschnitt ``de`` stehen. 


Schlüssel ``countryExtensionVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Typ: string
- Anzeige: mandatory
- Beispiel: ``"1.0"``


Dieser Schlüssel gibt die Version an, an die sich das aktuelle Erweiterungsschema hält,
aus Gründen der Vorwärtskompatibilität.

Bitte beachten Sie, dass der Wert dieses Schlüssels unabhängig von dem der obersten Ebene ist
``publiccodeYmlVersion`` ist. Auf diese Weise ist die Erweiterung
Schema-Versionierung sowohl von der Kernversion des Schemas als auch von
von jedem anderen Land.



Schlüssel ``leika``
''''''''''''''''''''
Eine Methode der Klassifizierung von kommunalen Verwaltungsprozessen ist der Leistungskatalog der deutschen Verwaltung, genannt LeiKa.

- Typ: Liste mit Einträgen vom Datentyp  ``leika`` (s. u.)
- Anzeige: optional

*Beispiel: Anmeldung Abfallbehälter, Abmeldung Abfallbehälter*

.. code:: yaml

  leika:
    - themenfeld: "Bauen & Wohnen"
      lebenslage: "Wohnen & Umzug"
      ozg-id: "10110"
      leika-id: "77000000000316"
    - themenfeld: "Bauen & Wohnen"
      lebenslage: "Wohnen & Umzug"
      ozg-id: "10110"
      leika-id: "77000000000317"



Datentyp  ``leika``
~~~~~~~~~~~~~~~~~~~
Eine Methode der Klassifizierung von kommunalen Verwaltungsprozessen ist der Leistungskatalog der deutschen Verwaltung, genannt LeiKa.

Der Datentyp ``leika`` hat folgende Felder:

Feld ``themenfeld``
''''''''''''''''''''
- Typ: string
- Anzeige: optional
- Erlaubte Werte: 
      - Arbeit & Ruhestand
      - Bauen & Wohnen
      - Bildung
      - Ein- & Auswanderung 
      - Engagement & Hobby
      - Familie & Kind
      - Forschung & Förderung
      - Gesundheit
      - Mobilität & Reisen
      - Querschnitt
      - Recht & Ordnung
      - Steuern & Zoll
      - Umwelt
      - Unternehmensführung & -entwicklung 

Feld ``lebenslage``
''''''''''''''''''''''''''''''
- Typ: string
- Anzeige: optional
- Erlaubte Werte: 
      - (Drohender) Arbeitsplatzverlust & -suche
      - Abfall & Umweltschutz
      - Adoption & Pflegekinder
      - ...

Feld ``ozg-id``
''''''''''''''''''''''
- Typ: string
- Anzeige: optional
- Beispiel: 99094003140000

OZG-ID: Leistung des Online Zugangsgesetzes


Feld ``leika-id``
''''''''''''''''''''''
- Typ: string
- Anzeige: mandatory
- Beispiel: 99094003140000

LeiKa-Schlüssel

*Beispiel: Abmeldung Abfallbehälter*

.. code:: yaml

   - themenfeld: "Bauen & Wohnen"
     lebenslage: "Wohnen & Umzug"
     ozg-id: "10110"
     leika-id: "77000000000317"

