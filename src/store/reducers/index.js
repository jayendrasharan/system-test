import { types } from "../constants"

const initialState = {
    list: [],
    taskList: "",
    taskAdded: false
}

export const task = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TASK:
            return {
                ...state,
                taskList: action.payload,
                taskAdded: true,
                list: state.list ? [...state.list, action.payload] : [action.payload]
            }
        case types.CLEAR_ADD_TASK_STATE:
            return {
                ...state,
                taskList: "",
                taskAdded: false
            }
        default:
            return state

    }
}