import { combineReducers } from 'redux';
import todoReducer from "./todoReducer";
import uiReducer from './uiReducer';

export default combineReducers({
	todos: todoReducer,
	ui: uiReducer
})