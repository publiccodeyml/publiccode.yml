import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { DefaultTheme as Widgets } from "../form";
import { APP_FORM } from "../contents/constants";
import renderField from "../form/renderField";

const guessWidget = (fieldSchema, theme) => {
  if (fieldSchema.widget) {
    return fieldSchema.widget;
  } else if (fieldSchema.hasOwnProperty("enum")) {
    return "choice";
  } else if (fieldSchema.hasOwnProperty("oneOf")) {
    return "oneOf";
  } else if (theme[fieldSchema.format]) {
    return fieldSchema.format;
  }
  return fieldSchema.type || "object";
};

const getField = obj => {
  let name = guessWidget(obj, Widgets);

  return React.createElement(Widgets[name], {
    key: obj.title,
    fieldName: obj.title,
    label: obj.label,
    schema: obj,
    required: obj.required
  });
};

const renderBlockItems = (items, id) => {
  return items.map((item, i) => {
    // getField(item);
    let cn = item.cn ? item.cn : "block__item";
    if (item.type === "object") cn = "block__object";
    return (
      <div className={cn} key={`block_${id}_item_${i}`}>
        <div className="form-group">
          {renderField(item, item.title, Widgets)}
        </div>
      </div>
    );
  });
};

const renderBlocks = blocks => {
  return blocks.map((block, i) => (
    <div className="block__wrapper" key={`block_${i}`}>
      <div className="block_heading">
        <div className="block_heading_oval">{block.index}</div>
        <div className="block_heading_title">{block.title}</div>
      </div>
      <div className="block">{renderBlockItems(block.items, i)}</div>
    </div>
  ));
};

const EditForm = props => {
  const { handleSubmit, pristine, reset, submitting, data } = props;
  return <form onSubmit={handleSubmit}>{renderBlocks(data)}</form>;
};

export default reduxForm({
  form: APP_FORM
})(EditForm);
