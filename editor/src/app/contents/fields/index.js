import uk from "./uk";
import us from "./us";
import it from "./it";
import getFields from "./generic";

const sections = [
  "Main information",
  "Specification",
  "Multimedia",
  "Description",
  "Legal",
  "Maintenance",
  "Country Specific"
];

const groups = [
  "summary",
  "maintenance",
  "legal",
  "intendedAudience",
  "localisation"
];

const countrySpec = [
  {
    code: "uk",
    name: "United Kingdom",
    fields: uk
  },
  {
    code: "us",
    name: "United States",
    fields: us
  },
  {
    code: "it",
    name: "italia",
    fields: it
  }
];
const available_countries = countrySpec.map(country => country.code);
const data = {
  countrySpec,
  sections,
  groups,
  available_countries
};

export const fieldsAsync = async () => {
  return await getFields();
};
export default data;

/*
------------------------------------
# MAIN INFORMATION 0
------------------------------------
name
applicationSuite
summary_summary
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
