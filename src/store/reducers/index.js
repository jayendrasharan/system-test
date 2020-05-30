import { types } from "../constants"

const initialState = {
    data: ''
}

export const task = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TASK:
            return {
                data: action.payload
            }
        default:
            return state

    }
}