import React from "react";
import deepmerge from "deepmerge";

const guessWidget = (schema, theme) => {
  if (schema.widget) {
    return schema.widget;
  } else if (schema.hasOwnProperty("enum")) {
    return "choice";
  } else if (schema.hasOwnProperty("oneOf")) {
    return "oneOf";
  } else if (theme[schema.format]) {
    return schema.format;
  }
  return schema.type || "object";
};

export const isRequired = (schema, fieldName) => {
  if (!schema.required) {
    return false;
  }
  return schema.required === true || schema.required.indexOf(fieldName) !== -1;
};

const renderField = (
  schema,
  fieldName,
  theme,
  prefix = "",
  context = {},
  required = false
) => {

  if (schema.hasOwnProperty("allOf")) {
    schema = { ...schema, ...deepmerge.all(schema.allOf) };
    delete schema.allOf;
  }

  const widget = guessWidget(schema, theme);
  if (!theme[widget]) {
    throw new Error(widget + " is not defined in the theme");
  }

  const newFieldName = prefix ? prefix + fieldName : fieldName;

  let lbl = schema.label || schema.title || fieldName;
  let obj = React.createElement(theme[widget], {
    key: fieldName,
    fieldName: widget === "oneOf" ? fieldName : newFieldName,
    label: lbl,
    required: required,
    schema: schema,
    theme,
    context,
    prefix,
    id: schema.id,
    group: schema.group
  });

  return obj;
};

export default renderField;
