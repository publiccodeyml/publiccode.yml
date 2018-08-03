import validator from "validator";
import u from "updeep";
import _ from "lodash";

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
      return "values required.";

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
        errors[field] = { _error: "Required" };
      } else {
        errors[field] = "Required.";
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
              memberErrors[rf] = "Required";
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
