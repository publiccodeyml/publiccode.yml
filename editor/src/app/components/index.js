import React, { Component } from "react";
import Schema from "../contents/schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import renderField from "../form/renderField";
import buildSyncValidation from "../form/buildSyncValidation";

import {
  APP_FORM,
  yamlData,
  versionsUrl,
  repositoryUrl
} from "../contents/constants";

import { initialize, submit } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import { DefaultTheme } from "../form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import myTheme from "../form/widgets/";
import compileSchema from "../form/compileSchema";
import langs from "../contents/langs";
import tags from "../contents/tags";
import validator from "validator";
import Toolbar from "./toolbar";
import _ from "lodash";
import u from "updeep";
import Ajv from "ajv";

const jsonData = require("../schema.json");
const APP_FORM = "appForm";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
  jsonPointers: false
});

let schema = {};
let tag_names = tags.map(t => t.tag);
let tag_descrs = tags.map(t => t.descr);

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    cache: state.cache
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveYaml: data => dispatch(saveYaml(data)),
    setVersions: data => dispatch(setVersions(data)),
    notify: (type, data) => dispatch(notify(type, data)),
    clearNotifications: (type, data) =>
      dispatch(clearNotifications(type, data)),
    initialize: (name, data) => dispatch(initialize(name, data)),
    submit: name => dispatch(submit(name))
  };
};
const getReleases = () => {

  return fetch(versionsUrl)
    .then(res => res.json())
    .then(data => data.map(d => d.name));
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: null,
      formData: null,
      loading: true
    };
    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    let versions = await getReleases();
    console.log("VERSIONS", versions);
    this.getSchema(versions);
  }

  getSchema(versions) {
    console.log(versions);
    let customMeta = {
      definitions: {
        publiccodeYamlVersion: {
          widget: "choice-multiple-expanded"
        },
        descriptionPerLang: {
          properties: {
            longDescription: {
              widget: "editor"
            }
          }
        },
        landingURL: {
          widget: "url"
        },
        releaseDate: {
          widget: "date"
        },
        developmentStatus: {
          widget: "choice-multiple-expanded"
        },
        softwareType: {
          widget: "choice-multiple-expanded"
        }
      }
    };

    let custom_props = {
      publiccodeYamlVersion: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "string",
          title: "Version",
          enum: versions
        }
      },
      softwareDescription: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "object",
          properties: {
            language: {
              type: "string",
              title: "Language",
              enum: langs
            },
            description: { $ref: "#/definitions/descriptionPerLang" }
          },
          required: ["language", "description"]
        }
      }
    };
    delete jsonData.$schema;
    delete jsonData.id;

    let data = jsonData;
    //data = Object.assign({}, custom_props, data);
    let custom_field_keys = _.keys(custom_props);
    custom_field_keys.map(k => {
      data.properties[k] = custom_props[k];
    });
    data = u(customMeta, data);

    console.log("DATA", data);
    let obj = jsyaml.load(JSON.stringify(data));

    schema = compileSchema(obj);
    console.log("COMPILED SCHEMA", obj);
    this.setState({ loading: false });
  }

  submit(data) {
    this.notify();
    console.log("SUBMIT");

    data = cleanDeep(data);
    console.log(data);
    //REFORMAT CUSTOM FIELDS DATA
    try {
      let yaml = jsyaml.dump(data);
      this.setState({ yaml, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  onLoad(formData, yaml) {
    console.log("loaded", yaml, formData);
    this.setState({ formData, yaml });
  }

  notify(title = "hey", msg = "ciao", millis = 3000) {
    this.props.notify({ title, msg, millis });
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
      </form>
    );
  }

  renderForm() {
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

  reset(data) {
    if (!data) {
      data = Schema.initialValues;
    }
    console.log("RESET", data);
    this.props.initialize(APP_FORM, data);
  }

  render() {
    let { yaml } = this.state;
    return (
      <div>
        <div className="split-screen">
          <div className="split-screen--form">{this.renderForm()}</div>

          <div className="split-screen--toolbar">
            <button
              className="btn btn-primary"
              onClick={() => this.props.submit(APP_FORM)}
            >
              Generate File
            </button>
            <Toolbar
              yaml={yaml}
              onLoad={this.onLoad.bind(this)}
              initialValues={Schema.initialValues}
            />
          </div>
        </div>
      </div>
    );
  }
}
