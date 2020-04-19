/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:56 PM
 */
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import {API_COMPLETED, API_STARTED, MODAL_TYPES} from "../actionTypes/app";
import {ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK_STATE} from "../actionTypes/tasks";
import {getTodos} from "../selectors/tasks";
import {hideModal} from "./appAction";

const buildTaskItem = (body) => {
    const {title, description, dueDate, priority} = body;
    return {
        id: uuidv4(),
        currentState: true,
        title,
        description,
        createdOn: moment().format("DD-MM-YYYY"),
        dueDate: dueDate,
        priority,
    }
}

const addTask = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: API_STARTED
        })

        return setTimeout(() => {
            dispatch({
                type: ADD_TASK,
                payload: buildTaskItem(payload)
            });
            dispatch(hideModal(MODAL_TYPES.DELETE_TASK_MODAL));
            dispatch({
                type: API_COMPLETED
            });
        }, 500)
    }

}

const editTask = (taskId, payload) => {
    return (dispatch, getState) => {
        let allTasks = [...getTodos(getState())];
        let updatedTasksList = allTasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...payload
                }
            }
            return task;
        })

        dispatch({
            type: API_STARTED
        })
        return setTimeout(() => {
            dispatch({
                type: EDIT_TASK,
                payload: updatedTasksList
            });
            dispatch(hideModal(MODAL_TYPES.DELETE_TASK_MODAL));
            dispatch({
                type: API_COMPLETED
            });
        }, 500)
    }
}

const deleteTask = (taskId) => {
    return (dispatch, getState) => {
        let allTasks = [...getTodos(getState())];
        let taskIndex = allTasks.forEach((task, index) => {
            if (task.id === taskId) return index;
        })

        if (taskIndex) {
            allTasks = [...allTasks.slice(0, taskIndex), ...allTasks.slice(taskIndex + 1, allTasks.length)]
        }

        dispatch({
            type: API_STARTED
        })

        return setTimeout(() => {
            dispatch({
                type: DELETE_TASK,
                payload: allTasks.filter(task => task.id !== taskId),
            });
            dispatch(hideModal(MODAL_TYPES.DELETE_TASK_MODAL));
            dispatch({
                type: API_COMPLETED
            });
        }, 500)

    }
}

const toggleTaskStatus = (taskIds) => {
    return (dispatch, getState) => {
        let allTasks = [...getTodos(getState())]
        .map(task => !taskIds.includes(task.id) ? task : {
            ...task,
            currentState: !task.currentState
        });
        return dispatch({
            type: TOGGLE_TASK_STATE,
            payload: allTasks,
        });
    }
}

export {
    addTask,
    deleteTask,
    editTask,
    toggleTaskStatus,
}