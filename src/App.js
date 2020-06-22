import React, { Component } from 'react';
import './App.css';
import { Task } from './Components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To-Do-App</h1>
        </header>

        <div className="row">
          <div className="column1">
          </div>
          <div className="column2">
            <Task />
          </div>
          <div className="column3">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
