import React, { Component } from "react";
import Form from "react-jsonschema-form";

export default class SimpleForm extends Component {
  render() {
    return (
      <Form
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        onSubmit={this.props.submit}
        onError={this.props.errors}
        formData={this.props.formData}
      />
    );
  }
}
