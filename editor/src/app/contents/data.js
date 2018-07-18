import { elems, countries } from "./elems";

const sections = [
  "Main information",
  "Specification",
  "Multimedia",
  "Summary",
  "Legal",
  "Maintenance"
];

export const groups = [
  "summary",
  "maintenance",
  "legal",
  "intendedAudience",
  "localisation"
];
//,"Country Specific"

let myElements = [];

export const data = (countryCode = null) => {
  let allFields = getAllFields(countryCode);
  console.log("allFields", allFields);
  return sections.map((s, i) => {
    // console.log(`section ${s} INDEX ${i}`);
    let items = allFields.filter(obj => obj.section === i);
    //add properties  to items
    items = items.map(i => {
      let group = i.group ? `${i.group}_` : "";
      i.id = `${i.section}_${group}${i.title}`;
      i.title = `${group}${i.title}`;
      return i;
    });
    myElements = _.concat(myElements, items);
    return {
      title: s,
      index: i + 1,
      items
    };
  });
};

const getAllFields = (countryCode = null) => {
  console.log("GET ALL FIELDS", countryCode);
  let country = null;
  if (countryCode) {
    country = countries.find(c => c.code == countryCode);
  }
  if (country) return _.concat(elems, country.elems);
  return elems;
};

export function getData(countryCode = null) {
  console.log("GET DATA");
  let allFields = elems;
  let country = countries.find(c => c.code == countryCode);
  if (country && country.elems) {
    allFields = _.concat(elems, country.elems);
  }
  console.log("allFields", allFields.length);

  let elements = [];
  let blocks = sections.map((s, i) => {
    // console.log(`section ${s} INDEX ${i}`);
    let items = allFields.filter(obj => obj.section === i);
    //add properties  to items
    items = items.map(i => {
      let group = i.group ? `${i.group}_` : "";
      i.id = `${i.section}_${group}${i.title}`;
      i.title = `${group}${i.title}`;
      return i;
    });
    elements = _.concat(elements, items);
    return {
      title: s,
      index: i + 1,
      items
    };
  });

  return { elements, blocks, countryCode };
}

// export const elements = (countryCode = null) => {
//   // let country = null;
//   // if (countryCode) {
//   //   country = countries[countryCode];
//   // }
//   // if (country) return [...myElements, ...country];
//   return myElements;
// };

/*
------------------------------------
# MAIN INFORMATION 0
------------------------------------
name
applicationSuite
summary_shortDescription
publiccodeYamlVersion
releaseDate
legal_repoOwner
landingURL
isBasedOn
tags

------------------------------------
# SPECIFICATION 1
------------------------------------
roadmap
summary_documentation
url
softwareVersion
developmentStatus
softwareType
inputTypes
outputTypes
platforms
usedBy
summary_featureList
summary_freeTags

------------------------------------
# MULTIMEDIA 2
------------------------------------
summary_screenshots
summary_videos
logo
monochromeLogo
summary_localisedName
summary_awards

------------------------------------
# SUMMARY 3
------------------------------------
summary_longDescription
summary_apiDocumentation
intendedAudience_onlyFor
intendedAudience_countries
intendedAudience_unsupportedCountries
localisation_localisationReady
localisation_availableLanguages
dependsOn

------------------------------------
# LEGAL 4
------------------------------------
legal_license
legal_mainCopyrightOwner
legal_authorsFile

------------------------------------
# MAINTENANCE 5
------------------------------------
maintenance_type
maintenance_contractors
maintenance_contacts

*/
