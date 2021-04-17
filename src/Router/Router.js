import React from "react";
import TodoHome from "../components/TodoHome";
import { Switch, Route } from "react-router-dom";

function Router() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={TodoHome} ></Route>
      </Switch>
    </React.Fragment>
  );
}

export default Router;
