export const repository_name = "publiccodenet/publiccode.yml";
export const repository = `https://github.com/${repository_name}`;
export const versionsUrl = `https://api.github.com/repos/${repository_name}/contents/version`;
export const yamlData = `
publiccode-yaml-version: 'http://w3id.org/publiccode/version/0.1'
name: 'vivvio'
url: 'https://sampleurl.com'
isBasedOn:
  - ciccio
softwareVersion: '1.0'
releaseDate: '2018-06-25'
tags:
  - identity
  - database
usedBy:
  - lalal
developmentStatus:
  - development
softwareType:
  - standalone
intendedAudience:
  onlyFor:
    - ciccino
legal:
  license: MIT
  repoOwner: owner ciccino
  authorsFile: ciccino's file
maintenance:
  type:
    - internal
  contacts:
    - name: zorro
      email: zorro@sorro.es
localisation:
  localisationReady: true
applicationSuite: yeah
logo: ciccino
monochromeLogo: ciccino
roadmap: ciccino
dependsOn:
  open:
    - name: ciccino
      versionMin: '1'
      versionMax: '2'
      version: '1.5'
description:
  - language: ita
    description:
      description:
        localisedName: ciccino
        shortDescription: ciccinociccinociccinociccino
        longDescription: >-
          <p>ciccinociccino<strong>ciccinociccinoc</strong>iccinociccinociccinociccino</p>

          <blockquote><em>ciccinociccinociccinociccinociccinociccinociccinociccino</em></blockquote>

          <p>ciccinociccinocicc<u>inociccinociccinociccinoci</u>ccinociccinociccino</p>
`;
