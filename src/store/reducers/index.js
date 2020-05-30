import { types } from "../constants"

const initialState = {
    taskList: "",
    taskAdded: false
}

export const task = (state = initialState, action) => {
    console.log("reducer called", action)
    switch (action.type) {
        case types.ADD_TASK:
            return {
                taskList: action.payload,
                taskAdded: true
            }
        case types.CLEAR_ADD_TASK_STATE:
            return {
                taskList: "",
                taskAdded: false
            }
        default:
            return state

    }
}