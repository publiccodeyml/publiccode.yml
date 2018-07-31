 let {REPOSITORY} = process.env;
export const repositoryUrl = `https://github.com/${REPOSITORY}`;
export const versionsUrl = `https://api.github.com/repos/${REPOSITORY}/contents/version`;
export const APP_FORM = "appForm";
