import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
