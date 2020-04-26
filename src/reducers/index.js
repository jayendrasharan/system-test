import {combineReducers} from 'redux';
import {taskReducer} from './task'
import {modalReducer} from './modal'

export default combineReducers({
    taskReducer,modalReducer
});