import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { initialize, submit } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";
import { saveYaml, setVersions } from "../store/cache";
import { APP_FORM, yamlData, versionsUrl } from "../contents/constants";
import {
  getData,
  SUMMARY,
  GROUPS,
  AVAILABLE_COUNTRIES
} from "../contents/data";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";

import _ from "lodash";
import u from "updeep";
import moment from "moment";

import cleanDeep from "clean-deep";

import Head from "./head";
import Foot from "./foot";
import EditorForm from "./editorForm";
import InfoBox from "./InfoBox";

import LanguageSwitcher from "./languageSwitcher";
import Sidebar from "./sidebar";

import * as ft from "../utils/transform";
import * as fv from "../utils/validate";

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
      blocks: null,
      elements: null,
      activeSection: 0,
      allFields: null,
      lastGen: null
    };
  }

  initBootstrap() {
    // $('[data-toggle="tooltip"]').tooltip();
    // $('[data-toggle="popover"]').popover();
    // $('[data-toggle="collapse"]').collapse();
    $('[data-toggle="dropdown"]').dropdown();
  }

  async componentDidMount() {
    await this.initData();
    this.switchLang("eng");
    this.switchCountry("it");
  }

  async initData(country = null) {
    //has state
    console.log("initData");
    let { elements, blocks, allFields } = await getData(country);
    this.setState({ elements, blocks, country, allFields });
    this.initBootstrap();
  }

  parseYml(yaml) {
    //HAS STATE
    this.setState({ loading: true });
    let obj = null;
    try {
      obj = jsyaml.load(yaml);
      // let errors =   fv.validatePubliccodeYml(obj);
      // if (errors) alert(errors);
    } catch (e) {
      alert("Error loading yaml");
      return;
    }
    if (!obj) {
      alert("Error loading yaml");
      return;
    }
    //TODO VALIDATE WITH SCHEMA
    let { languages, values, country } = ft.transformBack(obj);

    let currentValues = null;
    let currentLanguage = languages ? languages[0] : null;
    if (currentLanguage) currentValues = values[currentLanguage];

    //UPDATE STATE
    this.setState({
      yaml,
      languages,
      values,
      country,
      loading: false
    });

    //RESET FORM
    this.switchLang(currentLanguage);
    if (country) this.switchCountry(country);
  }

  generate(formValues) {
    let lastGen = moment();
    this.setState({ loading: true, lastGen });
    //has state
    let { values, currentLanguage, country } = this.state;
    //values[currentLanguage] = formValues;
    let obj = ft.transform(values, country);

    // let errors = await fv.validatePubliccodeYml(obj);
    // if (errors) alert(errors);

    //SET  TIMESTAMP
    this.showResults(obj);
    //this.showResults(obj);
  }

  showResults(values) {
    //has state
    try {
      let yaml = jsyaml.dump(values);
      this.setState({ yaml, loading: false });
    } catch (e) {
      console.error(e);
    }
  }

  submitFeedback() {
    //has state
    const title = "";
    const millis = 3000;
    const { form } = this.props;
    let { yaml } = this.state;
    let type = "success";
    let msg = "Success";
    if (form[APP_FORM].syncErrors) {
      type = "error";
      msg = "There are some errors";
      yaml = null;
    }

    this.props.notify({ type, title, msg, millis });
    //this.scrollToError(errors)
    this.setState({ yaml });
  }

  fakeLoading() {
    //has state
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  validate(contents) {
    //has state
    let errors = {};
    let { values, currentLanguage, elements } = this.state;

    //CHECK REQUIRED FIELDS
    let required = fv.validateRequired(contents, elements);
    //VALIDATE TYPES AND SUBOBJECT
    let objs_n_arrays = fv.validateSubTypes(contents, elements);
    errors = Object.assign(required, objs_n_arrays);
    // console.log(errors);

    //UPDATE STATE
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

  async reset() {
    //has state
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
    await this.initData();
  }

  renderFoot() {
    //c
    let props = {
      reset: this.reset.bind(this),
      submitFeedback: this.submitFeedback.bind(this)
    };
    return <Foot {...props} />;
  }

  renderSidebar() {
    //c with state
    let { yaml, loading, values, allFields } = this.state;
    let props = {
      yaml,
      loading,
      values,
      allFields,
      onLoad: this.parseYml.bind(this),
      onReset: this.reset.bind(this)
    };
    return <Sidebar {...props} />;
  }

  langSwitcher() {
    //c with state
    let { languages, currentLanguage, search } = this.state;
    let props = {
      languages,
      currentLanguage,
      search,
      switchLang: this.switchLang.bind(this),
      removeLang: this.removeLang.bind(this),
      onSearch: this.onSearch.bind(this)
    };
    return <LanguageSwitcher {...props} />;
  }

  removeLang(lng) {
    //has state
    let { values, languages, currentValues, currentLanguage } = this.state;
    //remove contents of lang
    delete values[lng];
    //remove  lang from list
    languages.splice(languages.indexOf(lng), 1);
    //manage state to move on other key
    let k0 = Object.keys(values) ? Object.keys(values)[0] : null;
    currentLanguage = k0 ? k0 : null;
    if (!currentLanguage) {
      currentLanguage = languages ? languages[0] : null;
    }
    currentValues = currentLanguage
      ? Object.assign({}, values[currentLanguage])
      : null;
    this.setState({ values, languages, currentValues, currentLanguage });
    this.props.initialize(APP_FORM, currentValues ? currentValues : {});
  }

  onSearch(search) {
    this.setState({
      search
    });
  }

  switchLang(lng) {
    //has state
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

  async switchCountry(country) {
    //has state
    let { currentValues } = this.state;
    await this.initData(country);
    this.props.initialize(APP_FORM, currentValues);
  }

  onAccordion(activeSection) {
    //has state

    let offset = activeSection * 56;
    let currentScroll = document.getElementById(`content__main`).scrollTop;
    let diff = currentScroll - offset;

    if (diff > 0) {
      console.info("diff", diff);
      document.getElementById(`content__main`).scrollTop = offset;
    } else {
      console.warn("inviewport");
    }
    this.setState({ activeSection: activeSection });
  }

  render() {
    let {
      currentLanguage,
      blocks,
      activeSection,
      country,
      allFields,
      lastGen
    } = this.state;

    let errors = null;
    let submitFailed = false;
    let { form } = this.props;

    if (form && form[APP_FORM]) {
      errors =
        form[APP_FORM] && form[APP_FORM].syncErrors
          ? form[APP_FORM].syncErrors
          : null;
    }

    return (
      <Fragment>
        <div className="content">
          <Head lastGen={lastGen} />
          {this.langSwitcher()}
          <div className="content__main" id="content__main">
            {currentLanguage &&
              blocks && (
                <EditorForm
                  activeSection={activeSection}
                  onAccordion={this.onAccordion.bind(this)}
                  onSubmit={this.generate.bind(this)}
                  data={blocks}
                  validate={this.validate.bind(this)}
                  country={country}
                  switchCountry={this.switchCountry.bind(this)}
                  errors={errors}
                  allFields={allFields}
                />
              )}
          </div>
          {currentLanguage && this.renderFoot()}
          <InfoBox />
        </div>
        {this.renderSidebar()}
      </Fragment>
    );
  }
}
