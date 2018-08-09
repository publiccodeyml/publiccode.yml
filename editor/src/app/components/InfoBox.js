import React, { Component } from "react";
import { connect } from "react-redux";
import { show, hide } from "../store/infobox";
import classNames from "classnames";
import img_close from "../../asset/img/close.svg";

const mapStateToProps = state => {
  return {
    infobox: state.infobox
  };
};

const mapDispatchToProps = dispatch => {
  return {
    show: data => dispatch(show(data)),
    hide: () => dispatch(hide())
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
    const { title, description, visible } = this.props.infobox;
    const className = classNames([
      "info__box",
      { info__box__visible: visible }
    ]);

    console.log("CLASSNAME", className);
    return (
      <div className={className}>
        <div className="info__box__body">
          <div className="info__box__close">
            <a
              href="#"
              className="link"
              onClick={() => this.props.hide(description)}
            >
              <img src={img_close} />
            </a>
          </div>

          <div className="info__box__content">
            <p className="info__box__title">{title}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
