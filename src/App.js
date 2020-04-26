import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import TaskForm from './components/TaskForm'
import Table from './components/DashBoard'
import Tabs from './components/Tab'
import { createBrowserHistory } from 'history';

function App() {
  return (
    <Fragment>
    <Router history={createBrowserHistory()}>
         <main className="App">
           <Route exact path="/" component={(props) => <Table {...props}/>} />
           <Route path="/editTask" component={TaskForm} />
           <Route path="/allTasks" component={(props) => <Table {...props} /> } />
           <Route path="/completedTasks" component={(props) => <Table {...props} />} />
           <Route path="/pendingTasks" component={(props) => <Table {...props} />} />
          </main>
      </Router>
    </Fragment>
  );
}

export default App;
