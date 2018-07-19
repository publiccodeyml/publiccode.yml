import { elems, countryElems, countries, groups, sections } from "./elems";

export const getData = (countryCode = null) => {
  return new Promise((resolve, reject) => {
    console.log("GET DATA");
    let allFields = elems;
    let country = countryElems.find(c => c.code == countryCode);
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

    // if (countryCode && groups.indexOf(countryCode) < 0) {
    //   console.log("AD GROUP", countryCode);
    //   groups.push[countryCode];
    // }
    resolve({ elements, blocks, groups, countries });
  });
};
