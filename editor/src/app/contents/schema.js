import moment from "moment";
import langs from "./langs";
import tags from "./tags";
const date_format = "YYYY-MM-DD";
let tag_names = tags.map(t => t.tag);
let tag_descrs = tags.map(t => t.descr);
let developmentStatus_list = [
  "concept",
  "development",
  "beta",
  "stable",
  "obsolete"
];
let softwareType_list = [
  "standalone",
  "addon",
  "library",
  "configurationFiles"
];

const initialValues = {
  name: "PROOOOVAAAA",
  license: "MIT",
  optional: false,
  releaseDate: moment().format(date_format)
};

const schema = null;
const _schema = {
  title: "publiccode",
  type: "object",
  definitions: {
    list: {
      type: "array",
      items: {
        type: "string"
      }
    },
    person: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Name"
        },
        email: {
          type: "string",
          title: "Email"
        },
        affiliation: {
          type: "string",
          title: "Affiliation"
        },
        phone: {
          type: "string",
          title: "Phone"
        }
      }
    },
    library: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Name"
        },
        versionMin: {
          type: "string",
          title: "versionMin"
        },
        versionMax: {
          type: "string",
          title: "versionMax"
        },
        version: {
          type: "string",
          title: "Version"
        },
        optional: {
          type: "boolean",
          title: "Optional"
        }
      }
    },
    description_lang: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          $ref: "#/definitions/description"
        },
        freeTags: {
          $ref: "#/definitions/list"
        }
      }
    },

    description: {
      type: "object",
      properties: {
        localisedName: {
          type: "string"
        },
        shortDescription: {
          type: "string"
        },
        longDescription: {
          type: "string",
          widget: "editor"
        },
        documentation: {
          type: "string"
        },
        apiDocumentation: {
          type: "string"
        },
        featureList: {
          type: "array",
          items: {
            type: "string"
          }
        },
        screenshots: {
          type: "array",
          items: {
            type: "string"
          }
        },
        videos: {
          type: "array",
          items: {
            type: "string"
          }
        },
        awards: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: ["shortDescription"]
    }
  },
  properties: {
    "publiccode-yaml-version": {
      type: "string",
      title: "Version of specification"
    },
    name: {
      type: "string",
      title: "Name"
    },
    applicationSuite: {
      type: "string",
      title: "Applicationsuite"
    },
    url: {
      type: "string",
      title: "url"
    },
    landingURL: {
      type: "string",
      title: "landingURL",
      widget: "url"
    },
    isBasedOn: {
      type: "array",
      items: {
        type: "string"
      }
    },
    softwareVersion: {
      type: "string",
      title: "Softwareversion"
    },
    releaseDate: {
      type: "string",
      title: "Releasedate",

      widget: "date"
    },
    logo: {
      type: "string",
      title: "Logo"
    },
    monochromeLogo: {
      type: "string",
      title: "Monochrome Logo"
    },
    platforms: {
      type: "array",
      items: {
        type: "string",
        enum: ["web", "windows", "mac", "linux", "ios", "android"]
      }
    },
    tags: {
      type: "array",
      items: {
        type: "string",
        enum: tag_names,
        enumNames: tag_descrs
      }
    },

    usedBy: {
      type: "array",
      items: {
        type: "string"
      }
    },
    roadmap: {
      type: "string",
      title: "Roadmap"
    },

    developmentStatus: {
      type: "array",
      uniqueItems: true,
      widget: "choice-multiple-expanded",
      title: "developmentStatus",
      items: {
        type: "string",
        enum: developmentStatus_list
      }
    },
    softwareType: {
      type: "array",
      uniqueItems: true,
      title: "softwareType",
      widget: "choice-multiple-expanded",
      items: {
        type: "string",
        enum: softwareType_list
      }
    },

    intendedAudience: {
      type: "object",
      properties: {
        onlyFor: {
          type: "array",
          items: {
            type: "string"
          }
        },
        countries: {
          type: "array",
          items: {
            type: "string",
            title: "List of countries"
          }
        },
        unsupportedCountries: {
          type: "array",
          items: {
            type: "string",
            title: "List of countries"
          }
        }
      }
    },

    description: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          language: {
            type: "string",
            title: "Language",
            enum: langs
          },
          description: { $ref: "#/definitions/description_lang" }
        },
        required: ["language", "description"]
      }
    },

    // description: {
    //   type: "object",
    //   uniqueItems: true,
    //   properties: {
    //     ita: {
    //       $ref: "#/definitions/description_lang"
    //     },
    //     en: {
    //       $ref: "#/definitions/description_lang"
    //     }
    //   }
    // },

    legal: {
      type: "object",
      description: "jajajajjajajajjajajja",
      properties: {
        license: {
          description: "jajajajjajajajjajajja",
          type: "string",
          title: "License"
        },
        mainCopyrightOwner: {
          description: "jajajajjajajajjajajja",
          type: "string",
          title: "Main Copyright Owner"
        },
        repoOwner: {
          description: "jajajajjajajajjajajja",
          type: "string",
          title: "Repo Owner"
        },
        authorsFile: {
          type: "string",
          title: "Author's File"
        }
      },
      required: ["license", "repoOwner"]
    },

    maintenance: {
      type: "object",
      properties: {
        type: {
          type: "array",
          title: "Type",
          items: {
            type: "string",
            enum: ["internal", "contract", "community", "none"]
          }
        },
        contractors: {
          type: "array",
          items: { $ref: "#/definitions/person" }
        },
        contacts: {
          type: "array",
          items: { $ref: "#/definitions/person" }
        }
      },
      required: ["contacts"]
    },

    localisation: {
      type: "object",
      properties: {
        localisationReady: {
          type: "boolean",
          title: "Localization Ready"
        },
        availableLanguages: {
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    },
    dependsOn: {
      type: "object",
      properties: {
        open: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        },
        proprietary: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        },
        hardware: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        }
      }
    }
  },
  required: [
    "publiccode-yaml-version",
    "name",
    "url",
    "releaseDate",
    "tags",
    "developmentStatus",
    "softwareType",
    "description",
    "legal"
  ]
};

const uiSchema = null;
// const uiSchema = {
//   releaseDate: {
//     "ui:widget": "date"
//   },
//   url: {
//     "ui:widget": "uri"
//   },
//   developmentStatus: {
//     "ui:widget": "checkboxes"
//   },
//   softwareType: {
//     "ui:widget": "checkboxes"
//   }
// };

const metaSchema = {
  description: {
    longDescription: {
      widget: "editor"
    }
  },
  landingURL: {
    widget: "url"
  },
  releaseDate: {
    widget: "date"
  },
  developmentStatus: {
    widget: "choice-multiple-expanded"
  },
  softwareType: {
    widget: "choice-multiple-expanded"
  }
};

export default { schema, uiSchema, initialValues, metaSchema };
