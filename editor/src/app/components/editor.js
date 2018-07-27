import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { initialize, submit } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import {
  APP_FORM,
  yamlData,
  versionsUrl,
  repositoryUrl
} from "../contents/constants";
import { getData, SUMMARY, GROUPS } from "../contents/data";
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
import img_dots from "../../asset/img/dots.svg";

//const available_languages = ["ita", "eng", "fra", "zho"];
import available_languages from "../contents/langs";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
  jsonPointers: false
});

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
      loading: false,
      languages: [],
      values: {},
      currentValues: {},
      currentLanguage: null,
      country: null,
      error: null,
      blocks: null,
      elements: null,
      activeSection: 0
    };
  }

  initBootstrap() {
    // $('[data-toggle="tooltip"]').tooltip();
    // $('[data-toggle="popover"]').popover();
    // $('[data-toggle="collapse"]').collapse();
    $('[data-toggle="dropdown"]').dropdown();
  }

  componentDidMount() {
    this.initData();
  }

  initData(country = null) {
    let { elements, blocks,  available_countries } = getData(country);
    this.setState({ elements, blocks, available_countries, country });
    this.initBootstrap();
  }

  parseYml(yaml) {
    let obj = null;
    console.log("PARSE YML");
    try {
      obj = jsyaml.load(yaml);
    } catch (e) {
      console.log("ERROR LOAD YML", e);
    }
    console.log("lplp", obj);
    if (!obj) {
      alert("error");
      return;
    }
    //TRANSFORM DATA BACK:
    let groups = GROUPS.slice(0);
    let { available_countries } = this.state;
    let index = groups.indexOf(SUMMARY);
    if (index !== -1) groups.splice(index, 1);
    //- for each country check if data
    let country = null;
    available_countries.forEach(cc => {
      if (obj[cc]) {
        groups.push(cc);
        country = cc;
      }
    });
    //- for each group get keys and readd with prefix
    groups.map(group => {
      if (obj[group]) {
        Object.keys(obj[group]).forEach(k => {
          obj[`${group}_${k}`] = obj[group][k];
        });
        delete obj[group];
      }
    });
    //- get SUMMARY keys to detect langs
    let values = {};
    let languages = [];
    if (obj[SUMMARY]) {
      console.log(SUMMARY, obj[SUMMARY]);
      Object.keys(obj[SUMMARY]).map(language_key => {
        languages.push(language_key);
        values[language_key] = {};
        let lng = obj[SUMMARY][language_key];
        //for each language, get fields prefix with SUMMARY group
        Object.keys(lng).map(key => {
          values[language_key][`${SUMMARY}_${key}`] = lng[key];
        });
      });
    }
    delete obj[SUMMARY];
    console.log("languages", languages);
    console.log("values 0", values);

    //merge values per each language
    if (languages) {
      languages.forEach(lang => {
        values[lang] = u(obj, values[lang]);
      });
    } else {
      values = Object.assign({}, obj);
    }

    let error = null;
    let currentValues = null;
    let currentLanguage = languages ? languages[0] : null;
    if (currentLanguage) currentValues = values[currentLanguage];

    //TODO Remove fields not in list
    //update state

    this.setState({
      yaml,
      error,
      languages,
      values,
      country
    });

    //laod values
    // if (country) {
    //   this.switchCountry(country);
    // } else {
    //this.props.initialize(APP_FORM, currentValues);
    // }
    console.log("PARSE VALUES", values);

    this.switchLang(currentLanguage);
    if (country) this.switchCountry(country);
  }

  reset() {
    this.props.initialize(APP_FORM, null);
    this.setState({
      search: null,
      yaml: null,
      loading: false,
      languages: [],
      values: {},
      currentValues: {},
      currentLanguage: null,
      country: null,
      error: null,
      blocks: null,
      elements: null,
      collapse: false,
      activeSection: null
    });
    this.props.notify({ type: "info", msg: "Reset" });
    this.initData();
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
    this.reset();
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
              setTimeout(() => {
                this.submitFeedback();
              }, 300);
            }}
          >
            Generate
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
            className="btn btn-link dropdown-toggle language-switcher__link"
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
    let { country, available_countries } = this.state;
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
              {available_countries &&
                available_countries.map(c => (
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
    let { yaml, error, loading, values } = this.state;
    //console.log(error);

    //let cn = error? "sidebar__error":"sidebar__code"
    //: <i>{validator.isObject(error[e]) ? "" : error[e]}</i>

    // {JSON.stringify(values)}

    return (
      <div className="sidebar">
        <div className="sidebar__title">
          File YAML {loading && <img src={img_dots} className="loading" />}
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
    if (!data[SUMMARY]) return null;
    let languages = Object.keys(data[SUMMARY]);
    let currentLanguage = languages[0];
    //this.setState({languages})
  }

  getSummary(values) {
    if (!values) return;
    let obj = this.extractGroup(values, SUMMARY + "_");
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

    console.log(type, msg, errors);

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
    let { values, currentLanguage, country } = this.state;

    values[currentLanguage] = formValues;
    console.log("GENERATE VALUES", values);
    console.log("country", country);

    let langs = Object.keys(values);
    console.log("langs", langs);

    //GET SUMMARY BEFORE MERGE
    let summary = langs.reduce((obj, lng) => {
      obj[lng] = this.getSummary(values[lng], lng);
      return obj;
    }, {});
    console.log("summary", summary);

    //MERGE ALL
    let merge = langs.reduce((acc, lng) => {
      return u(values[lng], acc);
    }, {});
    console.log("merge", merge);

    //GROUP FIELDS
    let obj = Object.assign({}, merge);
    obj = this.cleanupGroup(obj, SUMMARY);

    let groups = GROUPS.slice(0);
    console.log("allGroups", groups);

    if (country) {
      groups = [...groups, country];
    }
    delete groups[SUMMARY];
    console.log("groups", groups);

    groups.forEach(group => {
      let sub = this.extractGroup(obj, group);
      if (sub) {
        obj = this.cleanupGroup(obj, group);
        obj[group] = sub;
      }
    });

    //REPLACE SUMMARY
    obj[SUMMARY] = summary;

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
        if (obj && (obj.type == "object" || obj.type == "array")) {
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
      if (obj) {
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
          return _.startsWith(key, SUMMARY + "_");
        });
        currentValues = Object.assign({}, clonedValues);
      }
    }
    //move to current lang
    currentLanguage = lng;

    let search = null;
    let activeSection = -1;
    if (languages && languages.length == 1) {
      activeSection = 0;
    }

    //update state
    this.setState({
      values,
      languages,
      currentValues,
      currentLanguage,
      search,
      activeSection
    });

    this.props.initialize(APP_FORM, currentValues);
  }
  //

  onAccordion(activeSection) {
    console.log("activeSection", activeSection);
    this.setState({ activeSection: activeSection });
  }

  render() {
    let { currentLanguage, blocks, activeSection } = this.state;

    return (
      <Fragment>
        <div className="content">
          {this.renderHead()}
          {this.langSwitcher()}

          <div className="content__main">
            {currentLanguage &&
              blocks && (
                <EditorForm
                  activeSection={activeSection}
                  onAccordion={this.onAccordion.bind(this)}
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
