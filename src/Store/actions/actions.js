
import { TOGGLE_POPUP, ADD_TASK, COMPLETE_TASK, DELETE_TASK, UPDATE_TASK, UPDATE_CURR_WINDOW } from '../constants/contants'

export const togglePopup = payload => {
    return {
        type: TOGGLE_POPUP,
        payload
    }
}

export const addTask = payload => {
    return {
        type: ADD_TASK,
        payload
    }
}

export const completeTask = payload => {
    return {
        type: COMPLETE_TASK,
        payload
    }
}

export const deleteTask = payload => {
    return {
        type: DELETE_TASK,
        payload
    }
}

export const updateTask = payload => {
    return {
        type: UPDATE_TASK,
        payload
    }
}

export const updateCurrWindow = payload => {
    return {
        type: UPDATE_CURR_WINDOW,
        payload
    }
}




