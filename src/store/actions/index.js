import { types } from '../constants';

export const addTaskToList = (data) => {
    return {
        type: types.ADD_TASK,
        payload: data
    }
}