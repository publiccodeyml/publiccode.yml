import React from "react";
import classNames from "classnames";
import { Field } from "redux-form";

const zipObject = (props, values) =>
  props.reduce(
    (prev, prop, i) => Object.assign(prev, { [prop]: values[i] }),
    {}
  );

const renderChoice = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);
  const options = field.schema.enum;
  const optionNames = field.schema.enum_titles || options;

  const selectOptions = zipObject(options, optionNames);
  return (
    <div className={className}>
      <label className="control-label" htmlFor={"field-" + field.name}>
        {field.label}  {field.required ? "*" : ""}
      </label>
      {Object.entries(selectOptions).map(([value, name]) => (
        <div className="radio" key={value}>
          <label>
            <input
              type="radio"
              name={field.input.name}
              value={value}
              checked={field.input.value === value}
              onChange={e => field.input.onChange(value)}
            />
            {name}
          </label>
        </div>
      ))}

      {field.meta.touched &&
        field.meta.error && (
          <span className="help-block">{field.meta.error}</span>
        )}
      {field.description && (
        <span className="help-block">{field.description}</span>
      )}
    </div>
  );
};

const ChoiceExpandedWidget = props => {
  return (
    <Field
      component={renderChoice}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
      schema={props.schema}
      multiple={props.multiple}
    />
  );
};

export default ChoiceExpandedWidget;
