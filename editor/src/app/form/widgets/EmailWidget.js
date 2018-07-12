import React from "react";
import PropTypes from "prop-types";
import BaseInputWidget from "./BaseInputWidget";

const EmailWidget = props => {
  return <BaseInputWidget type="email" {...props} />;
};

EmailWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

export default EmailWidget;
