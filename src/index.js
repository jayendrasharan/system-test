import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import App from './containers/App/App';
import './index.css';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
    reducers,
    composeSetup(applyMiddleware(thunk))
)

const rootEl = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootEl
);

serviceWorker.unregister();
