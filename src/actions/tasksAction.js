/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:56 PM
 */
import {DELETE_TASK, TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const buildTaskItem = (body) => {
    const {title, description, dueDate, priority} = body;
    return {
        currentState: true,
        title,
        description,
        createdAt: Date.now(),
        dueDate,
        priority,
    }
}

const addTask = (payload) => {
    return {
        ...buildTaskItem(payload),
    }
}

const deleteTask = (taskId) => {
    return (dispatch, getState) => {
        let allTasks = [...getState().tasksState.tasks];
        let taskIndex = allTasks.forEach((task, index) => {
            if (task.id === taskId) return index;
        })

        if (taskIndex) {
            allTasks = [...allTasks.slice(0, taskIndex), ...allTasks.slice(taskIndex + 1, allTasks.length)]
        }
        return dispatch({
            type: DELETE_TASK,
            payload: allTasks.filter(task => task.id !== taskId),
        })
    }
}

const toggleTaskStatus = (taskIds) => {
    return (dispatch, getState) => {
        let allTasks = [...getState().tasksState.tasks]
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
    toggleTaskStatus,
}