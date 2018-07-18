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
      let { title, msg, millis } = n;
      this.refs.notificator.success(title, msg, millis);
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
