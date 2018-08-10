import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { APP_FORM } from "../contents/constants";

function mapStateToProps(state) {
  return { form: state.form };
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
    let { yaml, error, loading, values, form } = this.props;
    return (
      <div className="content__foot">
        <div className="content__foot_item">
          <button
            className="editor_button  editor_button--custom"
            onClick={() => this.props.reset()}
          >
            Reset
          </button>
        </div>
        <div className="content__foot_item">
          <button
            type="button"
            className="editor_button  editor_button--primary"

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
//disabled={form[APP_FORM].submitFailed && form[APP_FORM].syncErrors}
