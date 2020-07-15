
import {combineReducers, createStore, applyMiddleware} from 'redux'


import {todos, isLoading} from './redux/reducers';
import logger from 'redux-logger';

const reducers = {todos, isLoading}

const rootReducer = combineReducers(reducers);


const middleWares = [logger]



export const configureStore = () => createStore(rootReducer, applyMiddleware(...middleWares))


// combine reducers, create store, apply middlewares