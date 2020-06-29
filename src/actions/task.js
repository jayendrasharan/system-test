export function addTask(task) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'ADD_TASK_SUCCESS',
                payload: task
            });
        }, 1000);
    }
}

export function updateTask(task) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'UPDATE_TASK_SUCCESS',
                payload: task
            });
        }, 1000);
    }
}

export function deleteTask(id) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'DELETE_TASK_SUCCESS',
                id
            });
        }, 1000);
    }
}

export function bulkDelete(idsArr) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'BULK_DELETE_SUCCESS',
                payload: idsArr
            });
        }, 1000);
    }
}

export function bulkUpdate(tasksArr) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'BULK_UPDATE_SUCCESS',
                payload: tasksArr
            });
        }, 1000);
    }
}