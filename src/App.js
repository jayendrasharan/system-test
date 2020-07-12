import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import TaskPage from './task-page';
import './App.css';

class App extends React.Component {
  render() {
    let redirect;
    const { location } = this.props;

    if (location.pathname === "/" || location.pathname === "/tasks") {
      redirect = <Redirect to={`all`} />;
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/all" component={TaskPage} />
          <Route path="/completed" component={TaskPage} />
          <Route path="/pending" component={TaskPage} />
          {redirect}
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
