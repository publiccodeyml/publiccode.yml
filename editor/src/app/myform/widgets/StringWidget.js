import React from "react";
import BaseInputWidget from "./BaseInputWidget";

const StringWidget = props => {
  return <BaseInputWidget type="text" {...props} />;
};

export default StringWidget;
