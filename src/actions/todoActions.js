// import axios from 'axios';
import { ADDING_TASK, ADD_TASK, ERROR_SUM, SORT_COLUMN, ERROR_DES, EDIT_TASK, DELETE_TASK, TASK_STATUS_UPDATE, GROUP_BY, SEARCH_ITEM } from './types';
import {store} from '../store';

export const addingTask = () => {
    return {
        type: ADDING_TASK
    }
}

export const addTask = (data) => dispatch => {
    dispatch(addingTask());
    setTimeout(()=>{dispatch({
        type: ADD_TASK,
        payload: data
    })}, 2000)
    
}

export const errorSum = (msg) => dispatch => {
    dispatch({
        type : ERROR_SUM,
        payload : msg
    })
}

export const errorDes = (msg) => dispatch => {
    dispatch({
        type : ERROR_DES,
        payload : msg
    })
}

export const editTask = (data) => dispatch => {
    dispatch(addingTask());
    setTimeout(()=>{dispatch({
        type: EDIT_TASK,
        payload: data
    })}, 2000)
    
}

export const deleteTask  = (ind, id) => dispatch => {
    dispatch(addingTask());
    setTimeout(()=>{dispatch({
        type : DELETE_TASK,
        payload:ind,
        id
    })}, 2000)
}

export const taskStatusUpdate  = (data) => dispatch => {
    dispatch(addingTask());
    setTimeout(()=>{dispatch({
        type : TASK_STATUS_UPDATE,
        payload:data
    })}, 2000)
}

export const sortColumn = (col) => dispatch => {
    dispatch({
        type : SORT_COLUMN,
        payload : col
    })
}

export const groupBy = (item) => dispatch => {
    const currentState = store.getState().todoData.todo;
    dispatch(addingTask());
    setTimeout(()=> {
        dispatch({
            type : GROUP_BY,
            currentState,
            item
        })
    }, 1000)
}

export const searchItem = (item) =>dispatch=> {
    dispatch({
        type: SEARCH_ITEM,
        item
    })
}