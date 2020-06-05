import React from "react";
import Routes from "./routes";

import { Provider } from "react-redux"; //responsavel por "conectar todos os componentes da aplicação, para que possam compartilhar os estados globais"

import "./global.css";

import { store } from "./store/index";

function App() {
  
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
