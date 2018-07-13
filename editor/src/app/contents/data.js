import compileSchema from "../form/compileSchema";
import _ from "lodash";

// export const gen = () => {
//   let items = [];
//   Object.keys(obj).map(k => {
//     if (obj[k].type != "object") items.push(obj[k]);
//   });
//   console.log(items);
//   return items;
// };

export const data = [
  {
    title: "Informazioni",
    index: 1,
    items: [
      {
        title: "info",
        label: "Informazioni",
        descr: "informazioni varie",
        type: "string",
        cn: "block__item--full",
        widget: "editor"
      },
      {
        type: "array",
        title: "contacts",
        description:
          "One or more contacts maintaining this software. This key describes the technical people currently responsible for maintaining the software. All contacts need to be a physical person, not a company or an organisation. if somebody is acting as a representative of an institution, it must be listed within the affiliation of the contact. In case of a commercial agreement (or a chain of such agreements), specify the final entities actually contracted to deliver the maintenance. Do not specify the software owner unless it is technically involved with the maintenance of the product as well.",
        items: {
          title: "contact",
          description:
            "This key contains an explicit affiliation information for the technical contact. In case of multiple maintainers, this can be used to create a relation between each technical contact and each maintainer entity. It can contain for instance a company name, an association name, etc.",
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "name",
              description:
                " mandatory - This key contains the full name of one of the technical contacts. It must be a real person; do NOT populate this key with generic contact information, company departments, associations, etc."
            },
            email: {
              type: "string",
              title: "Email",
              description:
                "This key contains the e-mail address of the technical contact. It must be an email address of where the technical contact can be directly reached; do NOT populate this key with mailing-lists or generic contact points like info@acme.inc. ",
              examples: ["lou.reed@acme.inc"]
            },
            phone: {
              type: "string",
              title: "phone",
              description: " phone number (with international prefix)"
            },
            affiliation: {
              type: "string",
              title: "affiliation",
              description:
                "This key contains an explicit affiliation information for the technical contact. In case of multiple maintainers, this can be used to create a relation between each technical contact and each maintainer entity. It can contain for instance a company name, an association name, etc."
            }
          },
          required: ["email"]
        }
      },
      {
        title: "softwareVersion",
        label: "Software Version",
        description: "This key contains...",
        type: "string",
        widget: "textarea"
      }
    ]
  },
  {
    title: "Multimedia",
    index: 2,
    items: [
      {
        title: "firstName",
        label: "First Name",
        descr: "",
        type: "string"
      },
      {
        title: "lastName",
        label: "Last Name",
        descr: "",
        type: "string"
      },
      {
        title: "email",
        label: "Email",
        descr: "",
        type: "string",
        required: true
      }
    ]
  },
  {
    title: "Block 3",
    index: 3,
    items: [
      {
        title: "developmentStatus",
        label: "developmentStatus",
        type: "array",
        description:
          "Allowed values: concept, development, beta, stable, obsolete",
        examples: [""],
        items: {
          type: "string"
        }
      },
      {
        title: "softwareType",
        type: "array",
        uniqueItems: true,
        label: "softwareType",
        description:
          "Allowed values: standalone, addon, library, configurationFiles",
        examples: ["standalone"],
        items: {
          title: "item",
          type: "string",
          enum: ["standalone", "addon", "library", "configurationFiles"]
        },
        widget: "choice-multiple-expanded"
      },
      {
        title: "releaseDate",
        label: "Release Date",
        type: "string",
        description:
          "This key contains the date at which the latest version was released. This date is mandatory if the software has been released at least once and thus the version number is present.",
        widget: "date"
      }
    ]
  },
  {
    title: "Blok 4",
    index: "4",
    items: [
      {
        title: "intendedAudience",
        label: "Intended Audience",
        type: "object",
        properties: {
          onlyFor: {
            title: "only for",
            type: "array",
            description:
              "Public software could be very specific in scope because there is a large set of tasks that are specific to each type of administration. For instance, many softwares that are used in schools are probably not useful in hospitals. If you want to explicitly mark some software as only useful to certain types of administrations, you should add them to this key.The list of allowed values is defined in pa-types.md, and can be country-specific. This list can evolve at any time, separately from the version of this specification.",
            examples: ["city"],
            items: {
              type: "string"
            }
          },
          countries: {
            title: "countries",
            type: "array",
            description:
              "This key explicitly includes certain countries in the intended audience, i.e. the software explicitly claims compliance with specific processes, technologies or laws. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes.",
            items: {
              title: "item",
              type: "string"
            }
          },
          unsupportedCountries: {
            title: "unsupportedCountries",
            type: "array",
            description:
              "This key explicitly marks countries as NOT supported. This might be the case if there is a conflict between how software is working and a specific law, process or technology. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes.",
            items: {
              title: "item",
              type: "string"
            }
          }
        }
      },
      {
        title: "legal",
        label: "Legal",
        type: "object",
        description:
          "This section provides an overview of the legal info of the software.",
        properties: {
          license: {
            type: "string",
            title: "license",
            examples: ["AGPL-3.0-or-later"],
            description:
              "This string describes the license under which the software is distributed. The string must contain a valid SPDX expression, referring to one (or multiple) open-source license. Please refer to the SPDX documentation for further information."
          },
          mainCopyrightOwner: {
            type: "string",
            title: "mainCopyrightOwner",
            examples: ["City of Amsterdam"],
            description:
              "This string describes the entity that owns the copyright on 'most' of the code in the repository. Normally, this is the line that is reported with the copyright symbol at the top of most files in the repo."
          },
          repoOwner: {
            type: "string",
            title: "repoOwner",
            examples: ["City of Amsterdam"],
            description:
              "This string describes the entity that owns this repository; this might or might not be the same entity who owns the copyright on the code itself. For instance, in case of a fork of the original software, the repoOwner is probably different from the mainCopyrightOwner."
          },
          authorsFile: {
            type: "string",
            title: "authorsFile",
            examples: ["authorsFile"],
            description:
              "Some open-source softwares adopt a convention of identify the copyright holders through a file that lists all the entities that own the copyright. This is common in projects strongly backed by a community where there are many external contributors and no clear single/main copyright owner. In such cases, this key can be used to refer to the authors file, using a path relative to the root of the repository."
          }
        },
        required: ["license", "repoOwner"]
      }
    ]
  }
];
