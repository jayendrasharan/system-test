import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "../_helpers/history";
import Dashboard from "../components/Dashboard";
//import { createBrowserHistory } from "history";

//const history = createBrowserHistory();

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

//export default Routes;
