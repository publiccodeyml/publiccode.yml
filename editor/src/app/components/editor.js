import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { initialize, submit } from "redux-form";
import buildSyncValidation from "../form/buildSyncValidation";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import {
  APP_FORM,
  yamlData,
  versionsUrl,
  repositoryUrl
} from "../contents/constants";
import { getData } from "../contents/data";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import EditorForm from "./editorForm";
import copy from "copy-to-clipboard";
import _ from "lodash";
import u from "updeep";
import validator from "validator";
import cleanDeep from "clean-deep";
import Ajv from "ajv";

import img_x from "../../asset/img/x.svg";
import img_copy from "../../asset/img/copy.svg";
import img_upload from "../../asset/img/upload.svg";
import img_download from "../../asset/img/download.svg";

//import available_languages from "../contents/langs";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
  jsonPointers: false
});
const available_languages = ["ita", "eng", "fra", "zho"];

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    cache: state.cache,
    form: state.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialize: (name, data) => dispatch(initialize(name, data)),
    submit: name => dispatch(submit(name)),
    notify: data => dispatch(notify(data)),
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
      search: null,
      yaml: null,
      formData: null,
      loading: false,
      languages: [],
      values: {},
      currentValues: {},
      currentLanguage: null,
      country: null,
      error: null,
      blocks: null,
      elements: null
    };
  }

  initBootstrap() {
    // $('[data-toggle="tooltip"]').tooltip();
    // $('[data-toggle="popover"]').popover();
    // $('[data-toggle="collapse"]').collapse();
    $('[ data-toggle="dropdown"]').dropdown();
  }

  componentDidMount() {
    this.initBootstrap();
    this.initData();
  }

  initData(country = null) {
    let { elements, blocks, groups, countries } = getData(country);
    this.setState({ elements, blocks, groups, countries, country });
  }

  parseYml(yaml) {
    let obj = jsyaml.load(yaml);

    console.log(obj);

    //TRANSFORM DATA BACK:

    let { groups, countries } = this.state;
    delete groups.summary;

    //- for each country check if data
    let countryCode = null;
    countries.forEach(cc => {
      if (obj[cc]) {
        groups.push(cc);
        countryCode = cc;
      }
    });
    //- for each group get keys and readd with prefix
    groups.forEach(group => {
      if (obj[group]) {
        Object.keys(obj[group]).forEach(k => {
          obj[`${group}_${k}`] = obj[group][k];
        });
        delete obj[group];
      }
    });

    //- get summary keys to detect langs
    let lang_contents = {};
    let langs = [];
    if (obj.summary) {
      Object.map(obj.summary).forEach(k => {
        langs.push(k);
        lang_contents[k] = {};
        let lng = obj.summary[k];
        //for each language, get fields prefix with summary group
        Object.keys(lng).forEach(key => {
          lang_contents[k][`summary_${key}`] = lng[key];
        });
      });
    }
    delete obj.summary;

    let values = {};
    let currentValues;
    let currentLanguage;
    let error = null;
    //merge values per each language
    if (langs) {
      langs.forEach(lang => {
        values[lang] = Object.assign({}, contents[lang], obj);
      });
      currentLanguage = langs[0];
      currentValues = values[currentLanguage];
    } else {
      values = obj;
      currentValues = obj;
    }

    console.log("VALUES", obj);

    //TODO Remov fields not in list
    let state = {
      yaml,
      error,
      currentLanguage,
      currentValues,
      values,
      country: countryCode
    };
    console.log(state);
    //update state
    this.setState(state);

    //laod values
    this.props.initialize(APP_FORM, currentValues);
  }

  reset() {
    this.props.initialize(APP_FORM, null);
    let values = Object.assign({}, this.state.values);
    delete values[this.state.currentLanguage];
    this.setState({
      error: null,
      yaml: null,
      currentValues: null,
      values
    });
    this.props.notify({ type: "info", msg: "Reset" });
  }

  load(files) {
    console.log("LOAD", files);
    if (!files || !files[0]) {
      this.props.notify({ type: 1, msg: "File not found" });
      return;
    }
    let ext = files[0].name.split(".")[1];

    if (ext != "yml") {
      this.props.notify({ type: 1, msg: "File type not supported" });
      return;
    }

    const reader = new FileReader();
    const that = this;
    let { onLoad } = this.props;
    reader.onload = function() {
      let yaml = reader.result;
      that.parseYml(yaml);
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

  renderFoot() {
    return (
      <div className="content__foot">
        <div className="content__foot_item">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={() => this.reset()}
          >
            Reset
          </button>
        </div>
        <div className="content__foot_item" />
        <div className="content__foot_item">
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={() => {
              this.props.submit(APP_FORM);
              this.submitFeedback();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  langSwitcher() {
    let { languages, currentLanguage, search } = this.state;
    let results = available_languages;
    if (search)
      results = available_languages.filter(name => name.indexOf(search) > -1);

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
            <div className="form-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="search..."
                onChange={e => this.setState({ search: e.target.value })}
              />
            </div>
            <div className="scroll">
              {results.map(lng => (
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
      </div>
    );
  }

  countrySwitcher() {
    let { country, countries } = this.state;
    return (
      <div className="country-switcher">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {country ? "Switch" : "Select"} Country
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="scroll">
              {countries &&
                countries.map(c => (
                  <a
                    key={c}
                    className="dropdown-item"
                    onClick={() => this.switchCountry(c)}
                  >
                    {c}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSidebar() {
    let { yaml, error, loading } = this.state;
    //console.log(error);

    //let cn = error? "sidebar__error":"sidebar__code"
    //: <i>{validator.isObject(error[e]) ? "" : error[e]}</i>
    return (
      <div className="sidebar">
        <div className="sidebar__title">
          File YAML {loading && <span className="loading">...</span>}
        </div>

        {error && (
          <div className="sidebar__error">
            {Object.keys(error).map((e, i) => (
              <div key={i}>
                <img src={img_x} />
                {e}
              </div>
            ))}
          </div>
        )}
        <div className="sidebar__code">
          <pre>
            <code>{yaml}</code>
          </pre>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer_item">
            <a href="#">
              <img src={img_copy} alt="copy" />
              <span
                className="action"
                onClick={() => {
                  copy(yaml);
                  this.props.notify({
                    type: "info",
                    title: "",
                    msg: "Copied to clipboard"
                  });
                }}
              >
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
              {false && <span className="glyphicon glyphicon-open-file" />}
              <img src={img_upload} alt="upload" />
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
              {false && <span className="glyphicon glyphicon-save-file" />}
              <img src={img_download} alt="dowload" />
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

  getGrouped(data) {
    let result = _
      .chain(data)
      .groupBy("group")
      .map((values, group) => ({ values, group }))
      .value();
    return result;
  }

  extractGroup(items, group) {
    let field_names = Object.keys(items);
    let filtered = field_names.filter(item => item.startsWith(group));
    let obj = filtered.reduce((acc, name) => {
      let key = name.split("_")[1];
      let value = items[name];
      acc[key] = value;
      return acc;
    }, {});
    return obj;
  }

  flatGroup(data, group) {
    if (!data[group]) return null;
    let g = Object.assign({}, data[group]);
    delete data[group];
    let flatten = Object.keys(g).reduce((obj, key) => {
      obj[`${group}_${key}`] = g[key];
      return obj;
    }, {});
    return object.assign(flatten, data);
  }

  parseSummary(data) {
    if (!data.summary) return null;
    let { summary } = data;
    let languages = Object.keys(summary);
    let currentLanguage = languages[0];
    //this.setState({languages})
  }

  getSummary(values) {
    if (!values) return;
    let obj = this.extractGroup(values, "summary_");
    return obj;
  }

  cleanupGroup(data, group) {
    return _.omitBy(data, (value, key) => {
      return _.startsWith(key, `${group}_`);
    });
  }

  submitFeedback() {
    const { form } = this.props;
    let { yaml } = this.state;
    const myform = form[APP_FORM];
    const errors = myform.syncErrors ? myform.syncErrors : null;
    const type = errors ? _.keys(errors).length : "success";
    const msg = errors ? "There are some errors" : "Success";
    console.log(type, msg);

    if (errors) {
      yaml = null;
    }

    this.props.notify({
      type,
      title: "",
      msg: errors ? "There are some errors" : "Generated",
      millis: 3000
    });

    // Scroll to first error

    // if (errors) {
    // let key = Object.keys(errors).reduce((k, l) => {
    //   return document.getElementsByName(k)[0].offsetTop <
    //     document.getElementsByName(l)[0].offsetTop
    //     ? k
    //     : l;
    // });
    //window.scrollTo(0, document.getElementsByName(k0)[0].offsetTop - 100);
    // $("html, body").animate(
    //   {
    //     scrollTop: $(".has_error:visible:first").offset().top
    //   },
    //   500
    // );
    // }
    this.setState({ error: errors, yaml });
  }

  generate(formValues) {
    let { values, currentLanguage, groups, country } = this.state;
    values[currentLanguage] = formValues;
    let langs = Object.keys(values);

    //GET SUMMARY BEFORE MERGE
    let summary = langs.reduce((obj, lng) => {
      obj[lng] = this.getSummary(values[lng], lng);
      return obj;
    }, {});

    //MERGE ALL
    let merge = langs.reduce((acc, lng) => {
      return u(values[lng], acc);
    }, {});

    //GROUP FIELDS
    let obj = Object.assign({}, merge);
    let allGroups = groups;
    if (country) {
      allGroups = [...groups, country];
    }
    delete allGroups.summary;
    allGroups.forEach(group => {
      let sub = this.extractGroup(obj, group);
      if (sub) {
        obj = this.cleanupGroup(obj, group);
        obj[group] = sub;
      }
    });

    //REPLACE SUMMARY
    obj.summary = summary;

    //SET  TIMESTAMP
    this.showResults(cleanDeep(obj));
    //this.showResults(obj);
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

  fakeLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  checkField(field, obj, value, required) {
    if (required && !value) return "required.";

    if (obj && obj.widget) {
      let widget = obj.widget;

      if (
        widget &&
        widget === "editor" &&
        validator.isEmpty(this.strip(value).trim())
      )
        return "values required.";

      if (widget == "url" && !validator.isURL(value)) {
        return "Not a valid Url";
      } else if (widget == "email" && !validator.isEmail(value)) {
        return "Not a valid email";
      }
    }

    if (obj && obj.type === "email" && value && !validator.isEmail(value)) {
      return "Not a valid email";
    }

    return null;
  }

  validate(contents) {
    let errors = {};
    let { values, currentLanguage, elements } = this.state;

    //CHECK REQUIRED FIELDS

    let required = elements.filter(obj => obj.required);
    required.map(rf => {
      let content = null;
      let field = rf.title;
      let obj = elements.find(item => item.title == field);
      if (rf.widget && rf.widget === "editor") {
        content = contents[field] ? this.strip(contents[field]).trim() : null;
      } else {
        content = contents[field];
      }
      //REQUIRED BLOCKS
      if (!content) {
        //(obj.type == "array" && obj.items.type == "object")
        if (obj.type == "object" || obj.type == "array") {
          errors[field] = { _error: "Required" };
        } else {
          errors[field] = "Required.";
        }
      }
    });

    //VALIDATE TYPES AND SUBOBJECT
    Object.keys(contents).map(field => {
      let obj = elements.find(item => item.title == field);
      let obj_values = contents[field];
      //VALIDATE ARRAY OF OBJS
      if (!obj) {
        if (
          obj.type === "array" &&
          obj.items.type === "object" &&
          obj.items.required &&
          obj_values
        ) {
          let requiredFields = obj.items.required;
          let members = obj_values;
          let membersArrayErrors = [];
          members.forEach((member, index) => {
            let memberErrors = {};
            requiredFields.forEach(rf => {
              if (!member || !member[rf]) {
                memberErrors[rf] = "Required";
                membersArrayErrors[index] = memberErrors;
              }
            });
          });
          if (membersArrayErrors.length) {
            errors[field] = membersArrayErrors;
          }
        } else {
          //VALIDATE SIMPLE FIELDS
          let e = this.checkField(field, obj, obj_values, obj.required);
          if (e) errors[field] = e;
        }
      }
    });

    //UPDATE STATUS
    values[currentLanguage] = contents;
    this.setState({
      currentValues: contents,
      values,
      loading: true,
      error: null
    });
    this.fakeLoading();

    return errors;
  }

  removeLang(lng) {
    let { values, languages, currentValues, currentLanguage } = this.state;
    console.log("before delete all values are  ", values);
    console.log("REMOVE LNG", lng, "FROM", languages);
    //remove contents of lang
    delete values[lng];
    //remove  lang from list
    languages.splice(languages.indexOf(lng), 1);
    console.log("so now languages are ", languages);
    //manage state to move on other key
    let k0 = Object.keys(values) ? Object.keys(values)[0] : null;
    console.log("k0 ", k0);
    currentLanguage = k0 ? k0 : null;
    if (!currentLanguage) {
      currentLanguage = languages ? languages[0] : null;
    }
    currentValues = currentLanguage
      ? Object.assign({}, values[currentLanguage])
      : null;

    console.log("new currentLanguage is ", currentLanguage);
    console.log("currentValues are  ", currentValues);
    console.log("all values are  ", values);

    this.setState({ values, languages, currentValues, currentLanguage });
    this.props.initialize(APP_FORM, currentValues ? currentValues : {});
  }

  switchCountry(country) {
    let { currentValues } = this.state;
    this.initData(country);
    this.props.initialize(APP_FORM, currentValues);
  }

  switchLang(lng) {
    let { values, languages, currentValues, currentLanguage } = this.state;
    if (!lng || lng === currentLanguage) return;

    //save current language data
    if (currentLanguage)
      values[currentLanguage] = Object.assign({}, currentValues);

    if (languages.indexOf(lng) > -1) {
      // load previous lang data
      currentValues = Object.assign({}, values[lng]);
    } else {
      //clone current data and  then add language
      languages.push(lng);
      currentValues = {};
      if (currentLanguage && values[currentLanguage]) {
        let clonedValues = _.omitBy(values[currentLanguage], (value, key) => {
          return _.startsWith(key, "summary_");
        });
        currentValues = Object.assign({}, clonedValues);
      }
    }
    //move to current lang
    currentLanguage = lng;

    //update state
    this.setState({
      values,
      languages,
      currentValues,
      currentLanguage,
      search: null
    });

    this.props.initialize(APP_FORM, currentValues);
  }
  //
  render() {
    let { currentLanguage, blocks } = this.state;

    return (
      <Fragment>
        <div className="content">
          {this.renderHead()}
          {this.langSwitcher()}

          <div className="content__main">
            {currentLanguage &&
              blocks && (
                <EditorForm
                  onSubmit={this.generate.bind(this)}
                  data={blocks}
                  validate={this.validate.bind(this)}
                />
              )}
            {currentLanguage && this.countrySwitcher()}
          </div>
          {currentLanguage && this.renderFoot()}
        </div>
        {this.renderSidebar()}
      </Fragment>
    );
  }
}
