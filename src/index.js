import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { task } from './store/reducers';
import rootSaga from './store/sagas';

//connceting saga middleware to redux store
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  task,
  applyMiddleware(sagaMiddleWare)
)

sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
