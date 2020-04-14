import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";

import { ToDoProvider } from "./context";

ReactDOM.render(
  <ToDoProvider>
    <Router>
      <App />
    </Router>
  </ToDoProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
