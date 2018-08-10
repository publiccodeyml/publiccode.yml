import React from "react";
import PropTypes from "prop-types";
import renderFields from "../renderFields";

const Widget = props => {
  let isSummary = false;
  if (props && props.schema && props.schema.isSummary) {
    isSummary = props.schema.isSummary;
  }
  // console.log(props);
  return (
    <div className="block" style={{ marginBottom: "10px" }}>
      {props.showLabel &&
        props.label && (
          <legend className="control-label">
            {props.label} {props.schema.required ? "*" : ""}
          </legend>
        )}

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
