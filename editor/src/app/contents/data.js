import { fields, countrySpec, countries, groups, sections } from "./elems";

export const getData = (countryCode = null) => {
  //return new Promise((resolve, reject) => {
  console.log("countryCode", countryCode);
  const countryFields = getCountryElements(countryCode);
  console.log("countryFields", countryFields);

  const allFields = getAllFields(fields, countryFields);
  const blocks = generateBlocks(allFields);
  const elements = generateElements(blocks);

  const obj = { blocks, elements, groups, countries };
  console.log(obj);
  return obj;
  //resolve(obj);
  //});
};

const generateBlocks = allFields => {
  return sections.map((s, i) => {
    let fields = allFields.filter(obj => obj.section === i);
    let items = fields.map(i => {
      let prefix = i.group ? `${i.group}_` : "";
      if (!i.title.includes(prefix)) i.title = `${prefix}${i.title}`;
      return i;
    });
    // console.log("items", items);
    return {
      title: s,
      index: i + 1,
      items
    };
  });
};

const generateElements = blocks => {
  return blocks.reduce((merge, block) => {
    merge = [...merge, ...block.items];
    return merge;
  }, []);
};

const getCountryElements = (countryCode = null) => {
  let country = countrySpec.find(c => c.code == countryCode);
  console.log("country", country);
  if (country) return country.fields;
  return null;
};

const getAllFields = (generic, countryFields = null) => {
  if (countryFields) return [...generic, ...countryFields];
  return generic;
};
