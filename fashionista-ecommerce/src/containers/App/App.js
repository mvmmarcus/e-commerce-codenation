import React from "react";
import Routes from "../../routes";

import { Provider } from "react-redux";

import "./App.css";

import { store } from "../../store/index";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
