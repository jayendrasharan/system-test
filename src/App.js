import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ListOfAllTasks from './components/Alltasks';
import ListOfCompletedTasks from './components/CompletedTasks';
import ListOfPendingTasks from './components/PendingTasks';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="App">
      <Router>
        <Tabs />
        <Switch>
          <Route exact path="/" component={ListOfAllTasks} />
          <Route path="/alltasks" component={ListOfAllTasks} />
          <Route path="/completedtasks" component={ListOfCompletedTasks} />
          <Route path="/pendingtasks" component={ListOfPendingTasks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
