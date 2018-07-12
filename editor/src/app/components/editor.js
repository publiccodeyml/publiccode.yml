import React, { Component, Fragment } from "react";
import { notify, clearNotifications } from "../store/notifications";
import langs from "../contents/langs";
import tags from "../contents/tags";
import { yamlData, repository } from "../contents/constants";

import { connect } from "react-redux";

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

    this.setState({ yaml: yamlData });
  }

  renderForm() {
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
        <div className="content__head__help"><a href={repository} target='_blank'>Need help?</a></div>
      </div>
    );
  }

  renderFoot() {
    return <div className="content__foot">Footer</div>;
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

        <div className="sidebar__footer">YAML</div>
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
