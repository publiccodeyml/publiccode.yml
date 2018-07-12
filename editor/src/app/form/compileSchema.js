function isObject(thing) {
  return typeof thing === "object" && thing !== null && !Array.isArray(thing);
}

function compileSchema(schema, root) {
  if (!root) {
    root = schema;
  }
  let newSchema;

  if (isObject(schema)) {
    newSchema = {};
    for (let i in schema) {
      if (schema.hasOwnProperty(i)) {
        if (i === "$ref") {
          newSchema = compileSchema(resolveRef(schema[i], root), root);
        } else {
          newSchema[i] = compileSchema(schema[i], root);
        }
      }
    }
    return newSchema;
  }

  if (Array.isArray(schema)) {
    newSchema = [];
    for (let i = 0; i < schema.length; i += 1) {
      newSchema[i] = compileSchema(schema[i], root);
    }
    return newSchema;
  }

  return schema;
}

function resolveRef(uri, schema) {
  uri = uri.replace("#/", "");
  const tokens = uri.split("/");
  const tip = tokens.reduce((obj, token) => obj[token], schema);

  return tip;
}

export default compileSchema;
