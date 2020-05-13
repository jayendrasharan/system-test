import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducer';
import allSagas from './sagas';

export const history = createBrowserHistory();
const todoSagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        todoSagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  );
  todoSagaMiddleware.run(allSagas);
  return store;
};

export default configureStore;
