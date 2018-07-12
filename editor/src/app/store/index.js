import React, { Component } from "react";

import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import notifications from "./notifications";

const reducer = combineReducers({
  form: formReducer,
  notifications: notifications
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
