import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';

export default (initialState = {}) => {

  const middleware = [thunk]

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleware))
  )

  return store;
}
