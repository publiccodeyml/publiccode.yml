import React from "react";
import BaseInputWidget from "./BaseInputWidget";

const EmailWidget = props => {
  return <BaseInputWidget type="email" {...props} />;
};

export default EmailWidget;
