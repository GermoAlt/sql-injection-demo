import React from "react";
import ReactDOM from "react-dom";

import {App} from "./views/App";

import { PrimeReactProvider } from 'primereact/api';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
  </React.StrictMode>,
  rootElement
);
