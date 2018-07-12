import React, { Component } from "react";
import Form from "react-jsonschema-form";

export default class RForm extends Component {

  submit(data) {
    console.log("SUBMIT");

    data = cleanDeep(data);
    console.log(data);
    //REFORMAT CUSTOM FIELDS DATA
    // try {
    //   let yaml = jsyaml.dump(data);
    //   this.setState({ yaml, error: null });
    // } catch (e) {
    //   console.error(e);
    // }
  }



  BaseForm(props) {
    const {
      schema,
      handleSubmit,
      theme,
      error,
      submitting,
      context,
      load,
      pristine
    } = props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div>{error && <strong>{error}</strong>}</div>
        {renderField(schema, null, theme || DefaultTheme, "", context)}
        {/*!error && (
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        )*/}
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;
    console.log("COMPILED SCHEMA", schema);
    const initialValues = Schema.initialValues;
    const MyForm = reduxForm({
      form: APP_FORM,
      validate: buildSyncValidation(schema),
      initialValues: initialValues
    })(this.BaseForm);

    return (
      <MyForm
        renderFields={renderField}
        formKey={APP_FORM}
        schema={schema}
        theme={myTheme}
        initialValues={initialValues}
        onSubmit={this.submit}
      />
    );
  }
}
