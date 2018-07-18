import React from "react";
import BaseInputWidget from "./BaseInputWidget";

const DateTimeWidget = props => {
  return <BaseInputWidget type="datetime-local" {...props} />;
};

export default DateTimeWidget;
