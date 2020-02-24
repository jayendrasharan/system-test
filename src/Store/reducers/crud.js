import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, UPDATE_TASK, UPDATE_CURR_WINDOW } from '../constants/contants';
import { Data } from '../../mockData';

const initialState = {
    allTasks: Data,
    id: Data.length,
    currWindow: 'all'
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

        //Create a task

        case ADD_TASK:
            const addedId = payload;
            addedId.id = state.id + 1;
            return {
                ...state,
                allTasks: [...state.allTasks, addedId],
                id: state.id + 1
            }

        //Complete a task
        case COMPLETE_TASK:
            const myFunc = item => {
                if (item.id === payload) {
                    item.currentState = !item.currentState;
                }
                return { ...item };
            }
            const completedTasks = state.allTasks.map(myFunc)
            return {
                ...state,
                allTasks: completedTasks,
            }

        //Delete a task
        case DELETE_TASK:
            const filteredTasks = state.allTasks.filter(item => item.id !== payload)
            return {
                ...state,
                allTasks: filteredTasks,
            }

        //update a task
        case UPDATE_TASK:
            const rawTasks = state.allTasks.filter(item => item.id !== payload.id)
            return {
                ...state,
                allTasks: [...rawTasks, payload],
            }

        case UPDATE_CURR_WINDOW:
            return {
                ...state,
                currWindow: payload
            }

        default:
            return state
    }
}
