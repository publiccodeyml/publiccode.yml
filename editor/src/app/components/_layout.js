import React, { Component } from "react";
import "../../asset/style.scss";
import 'react-widgets/dist/css/react-widgets.css';
import ReactNotify from "react-notify";
import { connect } from "react-redux";

@connect(state => {
  return {
    notifications: state.notifications
  };
})
export default class Layout extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notifications &&
      nextProps.notifications != this.props.notifications &&
      nextProps.notifications.item
    ) {
      let n = nextProps.notifications.item;
      let { type, title, msg, millis } = n;
      if (type == "success") {
        this.refs.notificator.success(
          title ? title : "",
          msg,
          millis ? millis : 2000
        );
      } else if (type == "info") {
        this.refs.notificator.info(
          title ? title : "",
          msg,
          millis ? millis : 2000
        );
      } else {
        this.refs.notificator.error(
          title ? title : "",
          msg,
          millis ? millis : 3000
        );
      }
    }
  }
  render() {
    return (
      <div className="wrapper">
        <ReactNotify ref="notificator" />
        {this.props.children}
      </div>
    );
  }
}
