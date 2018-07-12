import Ajv from "ajv";
import merge from "deepmerge";
import { set as _set } from "lodash";

const setError = (error, schema) => {
  // convert property accessor (.xxx[].xxx) notation to jsonPointers notation
  if (error.dataPath.charAt(0) === ".") {
    error.dataPath = error.dataPath.replace(/[.[]/gi, "/");
    error.dataPath = error.dataPath.replace(/[\]]/gi, "");
  }
  const dataPathParts = error.dataPath.split("/").slice(1);
  let dataPath = error.dataPath.slice(1).replace(/\//g, ".");
  const type = findTypeInSchema(schema, dataPathParts);

  let errorToSet;
  if (type === "array" || type === "allOf" || type === "oneOf") {
    errorToSet = { _error: error.message };
  } else {
    errorToSet = error.message;
  }

  let errors = {};
  _set(errors, dataPath, errorToSet);
  return errors;
};

const findTypeInSchema = (schema, dataPath) => {
  if (!schema) {
    return;
  } else if (dataPath.length === 0 && schema.hasOwnProperty("type")) {
    return schema.type;
  } else {
    if (schema.type === "array") {
      return findTypeInSchema(schema.items, dataPath.slice(1));
    } else if (schema.hasOwnProperty("allOf")) {
      if (dataPath.length === 0) return "allOf";
      schema = { ...schema, ...merge.all(schema.allOf) };
      delete schema.allOf;
      return findTypeInSchema(schema, dataPath);
    } else if (schema.hasOwnProperty("oneOf")) {
      if (dataPath.length === 0) return "oneOf";
      schema.oneOf.forEach(item => {
        let type = findTypeInSchema(item, dataPath);
        if (type) {
          return type;
        }
      });
    } else {
      return findTypeInSchema(
        schema.properties[dataPath[0]],
        dataPath.slice(1)
      );
    }
  }
};

const buildSyncValidation = (schema, ajvParam = null) => {
  console.log("SYNC VALIDATION");
  let ajv = ajvParam;
  if (ajv === null) {
    ajv = new Ajv({
      errorDataPath: "property",
      allErrors: true,
      jsonPointers: false
    });
  }
  return values => {
    const valid = ajv.validate(schema, values);
    if (valid) {
      return {};
    }
    const ajvErrors = ajv.errors;

    let errors = ajvErrors.map(error => {
      return setError(error, schema);
    });
    // We need at least two elements
    errors.push({});
    errors.push({});
    return merge.all(errors);
  };
};

export default buildSyncValidation;

export { setError };
