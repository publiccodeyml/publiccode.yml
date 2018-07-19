import React, { Component } from "react";
import "../../asset/style.scss";

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
      console.log("Notification", n);
      let type = { n };
      let { title, msg, millis } = n;
      if (type === 0)
        this.refs.notificator.success(
          title ? title : "",
          msg,
          millis ? millis : 3000
        );
      else
        this.refs.notificator.error(
          title ? title : "",
          msg,
          millis ? millis : 3000
        );
      //this.refs.notificator.success(title, msg, millis);
      //else this.refs.notificator.error(title, msg, millis);
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
