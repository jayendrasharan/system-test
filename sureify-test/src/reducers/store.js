import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import initialData from '../initial-data.json';
import configData from "../formField-config.json";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreFn = initialState =>
    createStore(
        combineReducers({...reducers }), {
            tasks: {
                tasksList: initialData
            },
            config: {
                configData
            },
            ...initialState
        },
        composeEnhancers(applyMiddleware(thunk))
    );

export const store = createStoreFn();