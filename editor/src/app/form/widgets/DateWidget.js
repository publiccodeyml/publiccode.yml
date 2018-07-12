import React from "react";
import BaseInputWidget from "./BaseInputWidget";

const DateWidget = props => {
  return <BaseInputWidget type="date" {...props} />;
};

export default DateWidget;
