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

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(reducers))
// }

const rootEl = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
