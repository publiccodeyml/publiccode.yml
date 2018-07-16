import React, { Component } from "react";
import { render } from "react-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import Layout from "./components/_layout";
// import Index from "./components/index";
import Index from "./components/editor";

//import "bootstrap";
// import $ from "jquery";
// window.jQuery = $;
// window.$ = $;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Index />
        </Layout>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("app"));
