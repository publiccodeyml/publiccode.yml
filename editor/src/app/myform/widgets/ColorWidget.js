import React from "react";
import PropTypes from "prop-types";
import BaseInputWidget from "./BaseInputWidget";

const ColorWidget = props => {
  return <BaseInputWidget type="color" {...props} />;
};

BaseInputWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fieldName: PropTypes.string,
  label: PropTypes.string
};

export default ColorWidget;
