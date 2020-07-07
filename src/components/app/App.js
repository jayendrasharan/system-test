import React, { Component } from 'react';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import PageHeader from '../pageHeader/PageHeader';

class App extends Component {
  static propTypes = {};

  render() {
    return <DefaultLayout header={<PageHeader context={this.props.context} />} content={this.props.children} />;
  }
}

export default App;
