const ecosistemi_list = [
  "sanita",
  "welfare",
  "finanza-pubblica",
  "scuola",
  "istruzione-superiore-ricerca",
  "difesa-sicurezza-soccorso-legalita",
  "giustizia",
  "infrastruttura-logistica",
  "sviluppo-sostenibilita",
  "beni-culturali-turismo",
  "agricoltura",
  "italia-europa-mondo"
];

const it = [
  {
    section: 6,
    group: "it",
    title: "conforme",
    label: "Conforme",
    type: "object",
    properties: {
      accessibile: {
        title: "accessibile",
        label: "Accessibile",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software è conforme alle leggi in materia di accessibilità (L. 4/2004), come descritto ulteriormente nelle linee guida di design."
      },
      interoperabile: {
        title: "interoperabile",
        label: "interoperabile",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software è conforme alle linee guida sull'interoperabilità.Riferimento normativo: Art. 73 del CAD."
      },
      sicuro: {
        title: "sicuro",
        label: "Sicuro",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software è conforme alle Misure minime di sicurezza ICT per le Pubbliche amministrazioni."
      },
      privacy: {
        title: "privacy",
        label: "Privacy",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software rispetta le linee guida del Garante per la protezione dei dati personali."
      }
    }
  },
  {
    section: 6,
    group: "it",
    title: "spid",
    label: "SPID",
    type: "boolean",
    description:
      "Se presente e impostato a yes, il software si interfaccia con SPID - il Sistema Pubblico di Identità Digitale."
  },
  {
    section: 6,
    group: "it",
    title: "cie",
    label: "CIE",
    type: "boolean",
    description:
      "Se presente e impostato a yes, il software si interfaccia con la Carta di Identità Elettronica."
  },
  {
    section: 6,
    group: "it",
    title: "anpr",
    label: "ANPR",
    type: "boolean",
    description:
      "Se presente e impostato a yes, il software si interfaccia con ANPR."
  },
  {
    section: 6,
    group: "it",
    title: "pagopa",
    label: "PagoPA",
    type: "boolean",
    description:
      "Se presente e impostato a yes, il software si interfaccia con PagoPA."
  },
  {
    section: 6,
    group: "it",
    title: "riuso",
    label: "Riuso",
    type: "object",
    properties: {
      codiceIPA: {
        title: "codiceIPA",
        label: "Codice IPA",
        type: "string",
        description:
          "Questa chiave rappresenta il codice dell'amministrazione all'interno dell'Indice delle Pubbliche Amministrazioni (codice IPA) Il parser applicherà il corretto prefisso al valore dato a questa chiave per creare un'URI identificativa, una volta che questo sarà definito. L'URI sarà riconducibile a http://w3id.org/italia/data secondo la politica degli URI adottata in ambito DAF."
      },
      ecosistemi: {
        type: "array",
        title: "ecosistemi",
        label: "Ecosistemi",
        description:
          "Values: web, windows, mac, linux, ios, android. Human readable values outside this list are allowed",
        examples: ["android", "ios"],
        items: {
          title: "ecosistema",
          label: "Ecosistema",
          type: "string",
          enum: ecosistemi_list
        },
        section: 6
      }
    }
  },
  {
    section: 6,
    group: "it",
    title: "designKit",
    label: "Design Kit",
    type: "object",
    properties: {
      seo: {
        title: "seo",
        label: "SEO",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software ha utilizzato, in fase di progettazione, il kit di SEO di Designers Italia."
      },
      ui: {
        title: "ui",
        label: "UI",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software ha utilizzato, in fase di progettazione, il kit UI di Designers Italia."
      },
      web: {
        title: "web",
        label: "Web",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software utilizza il kit per lo sviluppo web di Designers Italia."
      },
      content: {
        title: "content",
        label: "Content",
        type: "boolean",
        description:
          "Se presente e impostato a yes, il software ha utilizzato, in fase di progettazione, il kit per la scrittura del contenuto di Designers Italia."
      }
    }
  }
];
export default it;
