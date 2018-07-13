import React, { Component, Fragment } from "react";

import { yamlData, versionsUrl, repositoryUrl } from "../contents/constants";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import { connect } from "react-redux";

import Schema from "../contents/schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import renderField from "../form/renderField";
import buildSyncValidation from "../form/buildSyncValidation";

import { initialize, submit } from "redux-form";

import { DefaultTheme } from "../form";
import { reduxForm } from "redux-form";

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
let defaultValues = {};
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
    notify: (type, data) => dispatch(notify(type, data)),
    clearNotifications: (type, data) => dispatch(clearNotifications(type, data))
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
      loading: false
    };
  }

  async componentDidMount() {
    // let versions = await getReleases();
    // console.log("VERSIONS", versions);

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="collapse"]').collapse();

    // this.setState({ yaml: yamlData });

    let versions = ["development", "0.1"];
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

  renderForm() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;
    console.log("COMPILED SCHEMA", schema);
    const initialValues = defaultValues;
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
      data = defaultValues;
    }
    console.log("RESET", data);
    this.props.initialize(APP_FORM, data);
  }

  _renderForm() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;

    return (
      <form role="form">
        <div className="block__wrapper">
          <div className="block_heading">
            <div className="block_heading_oval">1</div>
            <div className="block_heading_title">Informazioni Generali</div>
          </div>

          <div className="block">
            <div className="block__item">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="block__item">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="block">
          <div className="block__item">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="block__item">
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>

        <div className="block_heading">
          <div className="block_heading_oval">2</div>
          <div className="block_heading_title">Informazioni Addizionali</div>
        </div>

        <div className="block">
          <div className="block__item">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Check me out</label>
            </div>
          </div>
          <div className="block__item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                defaultChecked={true}
              />
              <label>Default radio</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
              />
              <label>Second default radio</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios3"
                value="option3"
              />
              <label>Third default radio</label>
            </div>
          </div>
        </div>
      </form>
    );
  }

  renderHead() {
    return (
      <div className="content__head">
        <div className="content__head__title">Public Code</div>
        <div className="content__head__help">
          <a href={repositoryUrl} target="_blank">
            Need help?
          </a>
        </div>
      </div>
    );
  }

  renderFoot() {
    return (
      <div className="content__foot">
        <div className="content__foot_item">Reset</div>
        <div className="content__foot_item">
          <button className="btn btn-lg btn-outline-primary">Reset</button>
          <button className="btn btn-lg btn-primary">Generate</button>
        </div>
        <div className="content__foot_item">Clone Language</div>
      </div>
    );
  }

  renderSidebar() {
    let { yaml } = this.state;
    return (
      <div className="sidebar">
        <div className="sidebar__title">File YAML</div>

        <div className="sidebar__code">
          <pre>
            <code>{yaml}</code>
          </pre>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer_item">
            <a href="#">
              <span className="glyphicon glyphicon-copy" />
              <span className="action">Copy</span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <a href="#">
              <span className="glyphicon glyphicon-open-file" />
              <span className="action">Upload</span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <a href="#">
              <span className="glyphicon glyphicon-save-file" />
              <span className="action">Download</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          {this.renderHead()}
          <div className="content__main">{this.renderForm()}</div>
          {this.renderFoot()}
        </div>
        {this.renderSidebar()}
      </Fragment>
    );
  }
}
