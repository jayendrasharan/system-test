import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import Main from './main';

export default function provider(store, routeConfig) {
  return (
    <Provider store={store}>
      <HashRouter>
        <Main routemap={routeConfig} />
      </HashRouter>
    </Provider>
  );
}
