import { types } from '../constants';

export const addTaskToList = (data) => {
    console.log("--action method called", data);
    return {
        type: types.ADD_TASK,
        payload: data
    }
}

export const clearAddTaskState = () => {
    return {
        type: types.CLEAR_ADD_TASK_STATE
    }
}