import React from "react";

const DateSelector = props => {
  return (
    <select
      value={props.extractField(props.input.value)}
      onBlur={props.onBlur}
      onChange={props.onChange}
      className="form-control"
      id={"props-" + props.name}
      required={props.required}
    >
      {!props.required && (
        <option key={""} value={""}>
          {props.emptyOption}
        </option>
      )}
      {props.range.map(idx => {
        return (
          <option key={idx} value={idx}>
            {idx}
          </option>
        );
      })}
    </select>
  );
};

export default DateSelector;
