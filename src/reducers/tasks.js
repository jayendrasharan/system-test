/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 9:57 PM
 */
import {ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const INITIAL_STATE = {
    tasks: []
}

const tasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TASK_STATE:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload),
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        case EDIT_TASK:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        default:
            return {
                ...state,
            };
    }
}

export default tasksReducer;