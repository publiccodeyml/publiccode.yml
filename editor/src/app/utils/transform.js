import {
  getData,
  SUMMARY,
  GROUPS,
  AVAILABLE_COUNTRIES
} from "../contents/data";

import _ from "lodash";
import u from "updeep";
import validator from "validator";
import cleanDeep from "clean-deep";

const extractGroup = (items, group) => {
  let field_names = Object.keys(items);
  let filtered = field_names.filter(item => item.startsWith(group));
  let obj = filtered.reduce((acc, name) => {
    let key = name.split("_")[1];
    let value = items[name];
    acc[key] = value;
    return acc;
  }, {});
  return obj;
};

export const getGrouped = data => {
  let result = _
    .chain(data)
    .groupBy("group")
    .map((values, group) => ({ values, group }))
    .value();
  return result;
};

export const flatGroup = (data, group) => {
  if (!data[group]) return null;
  let g = Object.assign({}, data[group]);
  delete data[group];
  let flatten = Object.keys(g).reduce((obj, key) => {
    obj[`${group}_${key}`] = g[key];
    return obj;
  }, {});
  return object.assign(flatten, data);
};

export const parseSummary = data => {
  if (!data[SUMMARY]) return null;
  let languages = Object.keys(data[SUMMARY]);
  let currentLanguage = languages[0];
};

export const getSummary = values => {
  if (!values) return;
  let obj = extractGroup(values, SUMMARY + "_");
  return obj;
};

export const cleanupGroup = (data, group) => {
  //f
  return _.omitBy(data, (value, key) => {
    return _.startsWith(key, `${group}_`);
  });
};

export const transformDepensOn = obj => {
  let map = {};
  if (obj.dependsOn) {
    obj.dependsOn.map(dp => {
      let cloned = Object.assign({}, dp);
      delete cloned.type;

      if (!map[dp.type]) map[dp.type] = [];
      map[dp.type].push(cloned);
    });
    obj.dependsOn = map;
  }
  return obj;
};

const importDepensOn = obj => {
  let map = [];
  if (obj.dependsOn) {
    let types = Object.keys(obj.dependsOn);
    let map = types.reduce((a, type) => {
      let items = obj.dependsOn[type].map(i => {
        i.type = type;
        return i;
      });
      return [...a, ...items];
    }, []);
    obj.dependsOn = map;
  }
  return obj;
};

export const transformBack = obj => {
  //spit dependsOn child to array with types
  obj = importDepensOn(obj);

  //TRANSFORM DATA BACK:
  let groups = GROUPS.slice(0);

  let index = groups.indexOf(SUMMARY);
  if (index !== -1) groups.splice(index, 1);
  //- for each country check if data
  let country = null;
  AVAILABLE_COUNTRIES.forEach(cc => {
    if (obj[cc]) {
      groups.push(cc);
      country = cc;
    }
  });
  //- for each group get keys and readd with prefix
  groups.map(group => {
    if (obj[group]) {
      Object.keys(obj[group]).forEach(k => {
        obj[`${group}_${k}`] = obj[group][k];
      });
      delete obj[group];
    }
  });
  //- get SUMMARY keys to detect langs
  let values = {};
  let languages = [];
  if (obj[SUMMARY]) {
    console.log(SUMMARY, obj[SUMMARY]);
    Object.keys(obj[SUMMARY]).map(language_key => {
      languages.push(language_key);
      values[language_key] = {};
      let lng = obj[SUMMARY][language_key];
      //for each language, get fields prefix with SUMMARY group
      Object.keys(lng).map(key => {
        values[language_key][`${SUMMARY}_${key}`] = lng[key];
      });
    });
  }
  delete obj[SUMMARY];
  console.log("languages", languages);
  console.log("values 0", values);

  //merge values per each language
  if (languages) {
    languages.forEach(lang => {
      values[lang] = u(obj, values[lang]);
    });
  } else {
    values = Object.assign({}, obj);
  }

  //TODO Remove fields not in list

  return { languages, values };
};

export const transform = values => {
  let langs = Object.keys(values);

  //GET SUMMARY BEFORE MERGE
  let summary = langs.reduce((obj, lng) => {
    obj[lng] = ft.getSummary(values[lng], lng);
    return obj;
  }, {});

  //MERGE ALL
  let merge = langs.reduce((acc, lng) => {
    return u(values[lng], acc);
  }, {});

  //GROUP FIELDS
  let obj = Object.assign({}, merge);
  obj = ft.cleanupGroup(obj, SUMMARY);

  //DEPENS ON strip type and reorganize in subtype objects
  obj = ft.transformDepensOn(obj);

  let groups = GROUPS.slice(0);
  if (country) {
    groups = [...groups, country];
  }
  delete groups[SUMMARY];

  //REPLACE GROUPS
  groups.forEach(group => {
    let sub = ft.extractGroup(obj, group);
    if (sub) {
      obj = ft.cleanupGroup(obj, group);
      obj[group] = sub;
    }
  });

  //REPLACE SUMMARY
  obj[SUMMARY] = summary;

  return cleanDeep(obj);
};
