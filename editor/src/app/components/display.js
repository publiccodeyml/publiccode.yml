import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
function mapStateToProps(state) {
  return {
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!(this.props.form && this.props.form.appForm)) return null;
    try {
      let { appForm } = this.props.form;
      let anyTouched = appForm.anyTouched ? appForm.anyTouched : false;
      let errorsObj = appForm.syncErrors ? appForm.syncErrors : null;
      let errors = null;
      console.log(errorsObj);
      if (anyTouched && errorsObj) {
        errors = Object.keys(errorsObj).map((k, i) => {
          try {
            let val = errorsObj[k];
            // console.log(k, val);
            let msg = val;
            if (_.isArray(val)) {
              // console.log("ARRAY");
              msg = "multiple errors";
            } else if (_.isObject(val)) {
              // console.log("OBJ");
              if (val._error) msg = val._error;
              else msg = "multiple errors";
            }
            return (
              <div key={i}>
                {k} : {msg}
              </div>
            );
          } catch (e) {
            console.log("skipped error", e);
            return null;
          }
        });
      }
      return <div className="text-danger">{errors}</div>;
    } catch (e) {
      console.log("  error", e);
      return null;
    }
  }
}
