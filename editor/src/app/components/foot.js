import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { APP_FORM } from "../contents/constants";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    submit: name => dispatch(submit(name))
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class foot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { yaml, error, loading, values } = this.props;
    //console.log(error);
    return (
      <div className="content__foot">
        <div className="content__foot_item">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={() => this.props.reset()}
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
                this.props.submitFeedback();
              }, 250);
            }}
          >
            Generate
          </button>
        </div>
      </div>
    );
  }
}
