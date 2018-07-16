import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { initialize, submit, reset } from "redux-form";
import buildSyncValidation from "../form/buildSyncValidation";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import {
  APP_FORM,
  yamlData,
  versionsUrl,
  repositoryUrl
} from "../contents/constants";
import { data } from "../contents/data";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import EditorForm from "./editorForm";
import RemoteSubmitButton from "./remoteSubmit";
import copy from "copy-to-clipboard";
import _ from "lodash";
const available_languages = ["ita", "eng", "fra"];

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    cache: state.cache
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialize: (name, data) => dispatch(initialize(name, data)),
    submit: name => dispatch(submit(name)),
    notify: (type, data) => dispatch(notify(type, data)),
    setVersions: data => dispatch(setVersions(data))
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
      loading: false,
      languages: [],
      values: {},
      currentValues: {},
      currentLanguage: null
    };
  }

  initBootstrap() {
    // $('[data-toggle="tooltip"]').tooltip();
    // $('[data-toggle="popover"]').popover();
    // $('[data-toggle="collapse"]').collapse();
    $('[ data-toggle="dropdown"]').dropdown();
  }

  async componentDidMount() {
    this.initBootstrap();
  }

  load(files) {
    console.log("LOAD", files);
    const reader = new FileReader();
    const that = this;
    let { onLoad } = this.props;
    reader.onload = function() {
      let yaml = reader.result;
      let formData = jsyaml.load(yaml);
      that.setState({ formData, yaml });
      that.initialize(formData, null);
      document.getElementById("load_yaml").value = "";
    };
    reader.readAsText(files[0]);
  }

  download(data) {
    const blob = new Blob([data], {
      type: "text/yaml;charset=utf-8;"
    });
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("download", "pubbliccode.yml");
    tempLink.click();
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

  // getDescriptionGroup(data) {
  //   let result = _
  //     .chain(data)
  //     .groupBy("group")
  //     .map((values, group) => ({ values, group }))
  //     .value();
  // }

  renderFoot() {
    return (
      <div className="content__foot">
        <div className="content__foot_item">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={() => this.props.initialize(APP_FORM,null)}
          >
            Reset
          </button>
        </div>
        <div className="content__foot_item" />
        <div className="content__foot_item">
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={() => this.props.submit(APP_FORM)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  langSwitcher() {
    let { languages, currentLanguage } = this.state;

    return (
      <div className="language-switcher">
        {languages.map(lng => {
          let cn = "language-switcher__item";
          if (lng == currentLanguage) {
            cn += " language-switcher__item--selected";
          }
          return (
            <div key={lng} className={cn}>
              <a onClick={() => this.switchLang(lng)}>{lng}</a>
              <span
                className="glyphicon glyphicon-remove"
                onClick={() => this.removeLang(lng)}
              />
            </div>
          );
        })}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            + Add Language
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {available_languages.map(lng => (
              <a
                key={lng}
                className="dropdown-item"
                onClick={() => this.switchLang(lng)}
              >
                {lng}
              </a>
            ))}
          </div>
        </div>
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
              <span className="action" onClick={() => copy(yaml)}>
                Copy
              </span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <input
              id="load_yaml"
              type="file"
              style={{ display: "none" }}
              onChange={e => this.load(e.target.files)}
            />
            <a href="#">
              <span className="glyphicon glyphicon-open-file" />
              <span
                className="action"
                onClick={() => document.getElementById("load_yaml").click()}
              >
                Upload
              </span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <a href="#">
              <span className="glyphicon glyphicon-save-file" />
              <span className="action" onClick={() => this.download(yaml)}>
                Download
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  validate(values) {
    this.setState({ currentValues: values });
    // console.log("VALIDATE", values);
    const errors = {};
    let info = values.info ? this.strip(values.info).trim() : null;
    // console.log("INFO", info);
    if (!info || info.length < 1) {
      // console.log("ERROR INFO");
      errors.info = "Required";
    }

    if (!values.softwareVersion) {
      errors.softwareVersion = "Required";
    }

    return errors;
  }

  removeLang(lng) {
    let { values, languages, currentValues, currentLanguage } = this.state;
    //remove contents of lang
    delete values[currentLanguage];
    //remove  lang from list
    languages.splice(languages.indexOf(lng),1)

    //manage state to move on other key
    let k0 = values ? _.keys(values)[0] : null;
    currentLanguage = k0 ? k0 : null;
    currentValues = currentLanguage
      ? Object.assign({}, values[currentLanguage])
      : null;

    this.setState({ values, languages, currentValues, currentLanguage });
    this.props.initialize(APP_FORM, currentValues);
  }

  switchLang(lng) {
    let { values, languages, currentValues, currentLanguage } = this.state;

    //if (lng == currentLanguage) return;

    //save current language data
    values[currentLanguage] = Object.assign({}, currentValues);

    if (languages.indexOf(lng) > -1) {
      // load previous lang data
      currentValues = Object.assign({}, values[lng]);
    } else {
      //clone current data and  then add language
      languages.push(lng);
      currentValues = Object.assign({}, values[currentLanguage]);
    }
    //move to current lang
    currentLanguage = lng;


    //update state
    this.setState({ values, languages, currentValues, currentLanguage });
    this.props.initialize(APP_FORM, currentValues);
  }

  showResults(values) {
    console.log("VALUES", values);
    try {
      let yaml = jsyaml.dump(values);
      this.setState({ yaml, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let { currentLanguage } = this.state;
    return (
      <Fragment>
        <div className="content">
          {this.renderHead()}
          {this.langSwitcher()}

          <div className="content__main">
            {currentLanguage && (
              <EditorForm
                onSubmit={this.showResults.bind(this)}
                data={data}
                validate={this.validate.bind(this)}
              />
            )}
          </div>
          {currentLanguage && this.renderFoot()}
        </div>
        {this.renderSidebar()}
      </Fragment>
    );
  }
}