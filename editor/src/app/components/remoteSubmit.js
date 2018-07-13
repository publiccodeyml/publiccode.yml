import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { APP_FORM } from "../contents/constants";

const RemoteSubmitButton = ({ dispatch }) => (
  <button
    type="button"
    className="btn btn-lg btn-primary"
    onClick={() => dispatch(submit(APP_FORM))}
  >
    Submit
  </button>
);

export default connect()(RemoteSubmitButton);
