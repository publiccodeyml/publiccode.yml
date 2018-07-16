import elems from "./elems";

const sections = [
  "Main information",
  "Specification",
  "Multimedia",
  "Summary",
  "Legal",
  "Maintenance"
];

export const data = sections.map((s, i) => {
  console.log(`section ${s} INDEX ${i}`);

  return {
    title: s,
    index: i + 1,
    items: elems.filter(obj => obj.section === i)
  };
});


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

# LEGAL 4
------------------------------------
legal_license
legal_mainCopyrightOwner
legal_authorsFile

# MAINTENANCE 5
------------------------------------
maintenance_type
maintenance_contractors
maintenance_contacts

*/