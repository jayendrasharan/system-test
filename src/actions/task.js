export function addTask(task) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'ADD_TASK_SUCCESS',
                payload: task
            });
        }, 2000);
    }
}

export function updateTask(task) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'UPDATE_TASK_SUCCESS',
                payload: task
            });
        }, 2000);
    }
}

export function deleteTask(id) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'DELETE_TASK_SUCCESS',
                id
            });
        }, 2000);
    }
}