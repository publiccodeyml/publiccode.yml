import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "../store/infobox";

const ReadMore = props => {
  if (!props.description) return null;
  let partial = ellipsis(props.description);
  return <small className="form-text text-muted">{partial}</small>;
};

const ellipsis = descr => {
  let partial = descr;
  if (descr.length > MAX_LEN) {
    partial = descr.substring(0, MAX_LEN - 1) + "...";
  }
  return partial;
};

const MAX_LEN = 100;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    show: data => dispatch(show(data))
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class InfoBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!(this.props.title || this.props.description)) return null;
    let { title, description } = this.props;
    let partial = ellipsis(description);
    return (
      <div className="field_info">
        <small className="form-text text-muted">
          <span>{partial}</span>
          {description.length > MAX_LEN && (
            <span>
              <a
                href="#"
                className="link"
                onClick={() => {
                  console.log("CLICK", description);
                  this.props.show({  title,  description });
                }}
              >
                Read more
              </a>
            </span>
          )}
        </small>
      </div>
    );
  }
}
