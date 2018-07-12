import React, { Component } from "react";
import { notify, clearNotifications } from "../store/notifications";
import langs from "../contents/langs";
import tags from "../contents/tags";
import Toolbar from "./toolbar";
import { connect } from "react-redux";

let tag_names = tags.map(t => t.tag);
let tag_descrs = tags.map(t => t.descr);

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    notify: (type, data) => dispatch(notify(type, data)),
    clearNotifications: (type, data) => dispatch(clearNotifications(type, data))
  };
};
const getReleases = () => {
  const url =
    "https://api.github.com/repos/publiccodenet/publiccode.yml/contents/version";
  return fetch(url)
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
    let versions = await getReleases();
    console.log("VERSIONS", versions);

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
  }

  renderForm() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;

    return (
      <form role="form">
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="col-sm">
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
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="col-sm">
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

        <div className="row">
          <div className="col-sm">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Check me out</label>
            </div>
          </div>
          <div className="col-sm">
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

  renderDropdown() {
    return (
      <div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
        <hr />
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="tooltip"
          data-placement="top"
          title="Tooltip on toooooop"
        >
          Tooltip on top
        </button>
        <hr />
        <button
          type="button"
          className="btn btn-secondary"
          data-container="body"
          data-toggle="popover"
          data-placement="top"
          data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        >
          Popover on top
        </button>
      </div>
    );
  }

  renderHead() {
    return (
      <div className="content__head">
        <div className="content__head__title">Public Code</div>
      </div>
    );
  }

  renderFoot() {
    return <div className="content__foot" />;
  }

   render() {
    let { yaml } = this.state;
    return (
      <div className="row">
        <div className="col-8">
          {this.renderHead()}
          {this.renderForm()}
          {this.renderFoot()}
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => this.props.submit(APP_FORM)}
          >
            Generate File
          </button>
          <Toolbar yaml={yaml} onLoad={data => console.log(data)} />
        </div>
      </div>
    );
  }
}
