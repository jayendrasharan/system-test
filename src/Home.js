import React, { Component } from 'react';
import { Task, Highlight } from './Components'
import CONFIG from './config';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {    
    return (
      <div className="row">
        <div className="column1">
        </div>
        <div className="column2">
          {CONFIG.ALLOW_SEARCH && <Highlight />}
          <Task />
        </div>
        <div className="column3">
        </div>
      </div>
      )
  }

}