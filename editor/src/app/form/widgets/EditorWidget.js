import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";
import RichTextEditor from "react-rte";

const emptyVal = RichTextEditor.createEmptyValue();

class MyEditor extends Component {
  constructor(props) {
    super(props);
    //let value = this.props.value  ? RichTextEditor.createValueFromString(this.props.val, "html") : emptyVal;
    let value = emptyVal;
    this.state = {
      value
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      if (value == null) this.props.onChange("");
      else this.props.onChange(value.toString("html"));
    }
  }

  componentWillReceiveProps(next) {
    if (!next.value) {
      this.setState({ value: emptyVal });
    } else {
      let html = RichTextEditor.createValueFromString(next.value, "html");
      if (html._cache.html != this.state.value._cache.html) {
        // console.log("TRANSFORMED", html, "STATE", this.state.value);
        this.setState({ value: html });
      }
    }
  }

  render() {
    return (
      <RichTextEditor
        className="RichTextEditor"
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

const renderInput = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);

  return (
    <div className={className}>
      <label className="control-label" htmlFor={"field-" + field.name}>
        {field.label} {field.required ? "*" : ""}
      </label>

      <MyEditor
        {...field.input}
        className="form-control RichTextEditor"
        id={"field-" + field.fieldName}
        required={field.required}
        placeholder={field.placeholder}
      />
      {field.meta.touched &&
        field.meta.error && (
          <span className="help-block">{field.meta.error}</span>
        )}
      {field.description && (
        <small className="form-text text-muted">{field.description}</small>
      )}
    </div>
  );
};

const editorWidget = props => {
  return (
    <Field
      component={renderInput}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
    />
  );
};

editorWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

export default editorWidget;
