import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { DefaultTheme as Widgets } from "../form";
import { APP_FORM } from "../contents/constants";
import renderField from "../form/renderField";
import CountrySwitcher from "./countrySwitcher";
import Collapse, { Panel } from "rc-collapse";

import { getFieldByTitle } from "../contents/data";

const renderBlocksSimple = blocks => {
  return blocks.map((block, i) => (
    <div className="block__wrapper" key={`block_${i}`}>
      <div className="block_heading">
        <div className="block_heading_oval">{block.index}</div>
        <div className="block_heading_title">{block.title}</div>
      </div>
      <div className="block collapse">{renderBlockItems(block.items, i)}</div>
    </div>
  ));
};

const renderBlockItems = (items, id) => {
  return items.map((item, i) => {
    // getField(item);
    let cn = item.cn ? item.cn : "block__item";
    if (item.type === "object") cn = "block__object";
    return (
      <div className={cn} key={`block_${id}_item_${i}`}>
        {renderField(item, item.title, Widgets, "", {}, item.required === true)}
      </div>
    );
  });
};

const renderBlocks = (blocks, activeSection, countryProps) => {
  return blocks.map((block, i) => {
    let last = blocks.length === i + 1;
    let cn = activeSection == i ? "block_heading--active" : null;
    return (
      <Panel
        className="block__wrapper"
        key={i}
        header={`${block.index}. ${block.title}`}
      >
        {last && <CountrySwitcher {...countryProps} />}
        <div className="block">{renderBlockItems(block.items, i)}</div>
      </Panel>
    );
  });
};

const EditForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    data,
    errors,
    activeSection,
    country,
    switchCountry,
    allFields
  } = props;

  let countryProps = { country, switchCountry };

  let params = {
    accordion: true,
    defaultActiveKey: "0"
  };

  if (activeSection) {
    params.activeKey = activeSection == -1 ? null : activeSection;
  }

  console.log("ERORRS", errors);
  if (errors) {
    let sections = Object.keys(errors).reduce((s, e) => {
      let field = getFieldByTitle(allFields, e);
      if (s.indexOf(field.section) < 0) {
        s.push(field.section);
      }
      return s;
    }, []);
    console.log("ERORRS SECTIONS", sections);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Collapse onChange={props.onAccordion} {...params}>
          {renderBlocks(data, activeSection, countryProps)}
        </Collapse>
      </form>
    </div>
  );
};

export default reduxForm({
  form: APP_FORM
})(EditForm);
