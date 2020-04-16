/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:56 PM
 */
import {TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const buildTaskItem = (body) => {
    const {title, description, dueDate, priority} = body;
    return {
        currentState: true,
        title,
        description,
        createdAt: new Date.now(),
        dueDate,
        priority,
    }
}

const addTask = (payload) => {
    return {
        ...buildTaskItem(payload),
    }
}

const toggleTaskStatus = (taskIds) => {
    return (dispatch, getState) => {
        let allTasks = [...getState().tasksState.tasks];
        allTasks.forEach(task => {
            if (taskIds.includes(task.id)) {
                task["currentState"] = !task.currentState;
            }
            return task;
        })
        return dispatch({
            type: TOGGLE_TASK_STATE,
            payload: allTasks,
        });
    }
}

export {
    addTask,
    toggleTaskStatus,
}