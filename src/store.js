import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootReducer from "./containers/reducer";
import thunk from "redux-thunk";

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ root: rootReducer }),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
