import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from '../router/router';
import { sagaMiddleware } from './sagas/saga';

import appConfig from '../appConfig';
import { identity } from 'lodash';
import taskReducer from './reducers/taskReducer';

const configureStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    router: routerReducer,
    taskList: taskReducer
  });

  // Create the store
  const compose = appConfig.enableReduxDevTools ? composeWithDevTools : identity;

  return createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware, routerMiddleware)));
};

export { configureStore };
