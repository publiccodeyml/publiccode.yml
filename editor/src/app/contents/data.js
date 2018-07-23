import data from "./fields";
const { fields, sections, groups, available_countries, countrySpec } = data;

export const getData = (countryCode = null) => {
  //return new Promise((resolve, reject) => {
  const countryFields = getCountryElements(countryCode);
  const allFields = getAllFields(fields, countryFields);
  const blocks = generateBlocks(allFields);
  const elements = generateElements(blocks);
  const obj = { blocks, elements, groups, available_countries };
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
