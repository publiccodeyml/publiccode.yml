export const getReleases = versionsUrl => {
  return fetch(versionsUrl)
    .then(res => res.json())
    .then(data => data.map(d => d.name));
};

export const getRemoteYml = url => {
  //return fetch(url).then(res => res.blob());
  // return fetch(url).then(res => res.text());
  return fetch(url)
    .then(res => res.json())
    .then(data => atob(data.content));
};
