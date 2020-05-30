import { types } from "../constants"

const initialState = {
    taskList: []
}

export const task = (state = initialState, action) => {
    console.log("reducer called", action)
    switch (action.type) {
        case types.ADD_TASK:
            return {
                taskList: action.payload
            }
        default:
            return state

    }
}