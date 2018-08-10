import validator from "validator";
import u from "updeep";
import _ from "lodash";
import compileSchema from "../form/compileSchema";
import Ajv from "ajv";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: false,
  jsonPointers: false
});
const yamlJsonScehma = require("../yaml_validation_schema.json");
const editorJsonScehma = require("../editor_generator_schema.json");

export const trnsformSchema = values => {
  return new Promise((resolve, reject) => {
    console.log("editorJsonScehma", editorJsonScehma);
    delete yamlJsonScehma.$schema;
    delete yamlJsonScehma.id;

    const schema = compileSchema(yamlJsonScehma);
    if (!schema) reject(null);

    console.log("compiled schema", schema);
    resolve(schema);
  });
};

export const validatePubliccodeYml = values => {
  return new Promise((resolve, reject) => {
    console.log("validatePubliccodeYml", yamlJsonScehma);
    delete yamlJsonScehma.$schema;
    delete yamlJsonScehma.id;
    const schema = compileSchema(yamlJsonScehma);
    console.log("compiled scehma", schema);
    const valid = ajv.validate(schema, values);
    if (valid) {
      console.log("schema is valid");
      resolve(null);
    }
    const errors = ajv.errors;
    console.log("errors", errors);
    resolve(errors);
  });
};

const strip = html => {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const checkField = (field, obj, value, required) => {
  //console.log(`checkField=${field} type=${obj.type} widget=${obj.widget}`);
  if (required && !value) return "This property is required.";

  //TODO CHECK ARRAY OF OBJECTS AND OBJ WITH PROPS

  if (obj && obj.widget) {
    let widget = obj.widget;

    if (widget && widget === "editor" && validator.isEmpty(strip(value).trim()))
      return "This property is required.";

    if (widget == "url" && !validator.isURL(value)) {
      return "Not a valid Url";
    }
    if (widget == "email" && !validator.isEmail(value)) {
      return "Not a valid email";
    }
  }

  // if (obj && obj.type === "email" && value && !validator.isEmail(value)) {
  //   return "Not a valid email";
  // }

  return null;
};

export const validateRequired = (contents, elements) => {
  let errors = {};
  let required = elements.filter(obj => obj.required);
  required.map(rf => {
    let content = null;
    let field = rf.title;
    let obj = elements.find(item => item.title == field);
    if (rf.widget && rf.widget === "editor") {
      content = contents[field] ? strip(contents[field]).trim() : null;
    } else {
      content = contents[field];
    }
    //REQUIRED BLOCKS
    if (!content) {
      //(obj.type == "array" && obj.items.type == "object")
      //console.log(field);
      if (obj && (obj.type == "object" || obj.type == "array")) {
        errors[field] = { _error: "Required" };
      } else {
        errors[field] = "This property is required.";
      }
    }
  });

  return errors;
};

const validateObj = (schema, values) => {
  console.log("VALIDATE OBJ", schema.title);

  const valid = ajv.validate(schema, values);
  const errors = ajv.errors;
  if (valid) {
    return null;
  }
  return errors;
};

export const validateAll = (contents, elements) => {
  if (!elements) return;
  console.log("VALIDATE ALL");

  let errors = elements.reduce((e, schema) => {
    if (schema.required && schema.required == true) {
      delete schema.required;
    }
    let field = schema.title;
    let values = contents[field];
    e[field] = validateObj(schema, values);

    return e;
  }, {});
  console.log("ERRORS", errors);
};

const cloneArray = a => {
  if (!a) return null;
  return a.slice(0);
};

const cloneObj = o => {
  return Object.assign({}, o);
};

export const validateSubTypes = (contents, elements) => {
  let errors = {};

  //validateAll(cloneObj(contents), cloneArray(elements));
  //let e = validateObj(obj, obj_values);

  Object.keys(contents).map(field => {
    let obj = elements.find(item => item.title == field);
    let obj_values = contents[field];

    //VALIDATE ARRAY OF OBJS
    if (obj) {
      if (
        obj.type === "array" &&
        obj.items.type === "object" &&
        obj.items.required &&
        obj_values
      ) {
        let requiredFields = obj.items.required;
        let values = obj_values;
        let errorList = [];
        values.forEach((member, index) => {
          let error = {};
          requiredFields.forEach(rf => {
            if (!member || !member[rf]) {
              error[rf] = "This property is required";
              errorList[index] = error;
            }
          });
        });

        if (errorList.length) {
          errors[field] = errorList;
        // } else {
        //   let e = validateObj(obj, obj_values);
        }
      } else {
        //VALIDATE SIMPLE FIELDS
        let e = checkField(field, obj, obj_values, obj.required);
        if (e) errors[field] = e;
      }
    }
  });
  return errors;
};
