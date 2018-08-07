import validator from "validator";
import u from "updeep";
import _ from "lodash";
import compileSchema from "../form/compileSchema";
import Ajv from "ajv";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
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
  if (required && !value) return "required.";

  if (obj && obj.widget) {
    let widget = obj.widget;

    if (widget && widget === "editor" && validator.isEmpty(strip(value).trim()))
      return "This property is required.";

    if (widget == "url" && !validator.isURL(value)) {
      return "Not a valid Url";
    } else if (widget == "email" && !validator.isEmail(value)) {
      return "Not a valid email";
    }
  }

  if (obj && obj.type === "email" && value && !validator.isEmail(value)) {
    return "Not a valid email";
  }

  return null;
};

export const validateRequired = (contents, elements, errors) => {
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
      if (obj && (obj.type == "object" || obj.type == "array")) {
        errors[field] = { _error: "This property is required" };
      } else {
        errors[field] = "This property is required.";
      }
    }
  });
  return errors;
};

export const validateSubTypes = (contents, elements, errors) => {
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
        let members = obj_values;
        let membersArrayErrors = [];
        members.forEach((member, index) => {
          let memberErrors = {};
          requiredFields.forEach(rf => {
            if (!member || !member[rf]) {
              memberErrors[rf] = "This property is required";
              membersArrayErrors[index] = memberErrors;
            }
          });
        });
        if (membersArrayErrors.length) {
          errors[field] = membersArrayErrors;
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
