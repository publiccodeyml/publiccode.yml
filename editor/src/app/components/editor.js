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

import EditorForm from "./editorForm";
import RemoteSubmitButton from "./remoteSubmit";

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    cache: state.cache
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reset: name => dispatch(reset(name)),
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

  initBootstrap() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="collapse"]').collapse();
  }

  async componentDidMount() {
    this.initBootstrap();
    // let versions = await getReleases();
    // console.log("VERSIONS", versions);
    // this.setState({ yaml: yamlData });
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
            onClick={() => this.props.reset(APP_FORM)}
          >
            Reset
          </button>
        </div>
        <div className="content__foot_item" />
        <div className="content__foot_item">
          <RemoteSubmitButton className="btn btn-lg btn-primary" />
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
  showResults(values) {
    console.log("VALUES", values);
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          {this.renderHead()}
          <div className="content__main">
            <EditorForm onSubmit={this.showResults.bind(this)} data={data} />
          </div>
          {this.renderFoot()}
        </div>
        {this.renderSidebar()}
      </Fragment>
    );
  }
}
