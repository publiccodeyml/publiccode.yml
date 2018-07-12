import React, { Component } from "react";
export default class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-md fixed-top white">
          <div className="container">
            <a className="navbar-brand md">
              <span className="inline">PUBLIC-CODE</span>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
