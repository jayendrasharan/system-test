import { types } from '../constants';

export const addTaskToList = (data) => {
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

export const deleteTaskFromList = (data) => {
    return {
        type: types.DELETE_TASK,
        payload: data
    }
}