import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './main.css'
import createStore from './store/create-store'
import { Tasks } from './tasks'

const store = createStore()
hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <Tasks />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
