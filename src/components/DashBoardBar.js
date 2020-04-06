import React from "react";
import TaskList from "./TaskList";
import { Switch, Route, Link, HashRouter as Router } from "react-router-dom";

const DashBoardBar = tasks => {
  return (
    <Router>
      <h1>Hey welcome home!</h1>
      <nav className="links">
        <Link to="/AllTasks" className="link">
          AllTasks
        </Link>
        <Link to="/Pending" className="link">
          Pending
        </Link>
        <Link to="/Completed" className="link">
          Completed
        </Link>
      </nav>
      <div className="tabs">
        <Switch>
          <Route path="/AllTasks" default>
            <TaskList {...tasks} />
          </Route>
          <Route path="/Pending">
            <TaskList {...tasks} />
          </Route>
          <Route path="/Completed">
            <TaskList {...tasks} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default DashBoardBar;
