import React from "react";
import PropTypes from "prop-types";
import renderFields from "../renderFields";

const Widget = props => {
  return (
    <div className="objectType">
      {props.label && <legend>{props.label}</legend>}
      {renderFields(
        props.schema,
        props.theme,
        props.fieldName && props.fieldName + ".",
        props.context
      )}
    </div>
  );
};

Widget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  context: PropTypes.object
};

export default Widget;
