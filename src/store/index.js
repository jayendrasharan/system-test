import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Reducer';

const reducer = combineReducers({rootReducer});

const store = createStore(reducer, applyMiddleware(thunk));


export default store;