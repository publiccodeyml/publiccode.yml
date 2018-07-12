import React from "react";
import BaseInputWidget from "./BaseInputWidget";

const NumberWidget = props => {
  return <BaseInputWidget type="number" {...props} normalizer={parseFloat} />;
};

export default NumberWidget;
