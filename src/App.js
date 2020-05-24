import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">SYSTEM TEST</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/home"/>
                )}/>
                <Route exact path='/home' component={Home} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
