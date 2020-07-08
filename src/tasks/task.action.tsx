import { CLEAR_TASK, DELETE_TASK, FEED_TASKS, FILTER_TASKS, LOADING, SAVE_TASK, SORT_BY_CUSTOM, SORT_BY_DEFAULT, VIEW_OR_EDIT_TASK } from './task.constants';

const delay = (ms: number) => new Promise((resolve: any) =>
    setTimeout(resolve, ms)
);
  
export function init() {
    return async (dispatch: any) => {
        return dispatch({
            type: FEED_TASKS
        });
    }
}

export function clearTask() {
    return async (dispatch: any) => {
        return dispatch({
            type: CLEAR_TASK
        });
    }
}

export function deleteTask(mode: any, id: any) {
    return async (dispatch: any) => {
        return dispatch({
            type: DELETE_TASK,
            id,
            mode
        });
    }
}

export function getTasks(status: string) {
    return async (dispatch: any) => {
        dispatch({type: LOADING})
        return delay(2000).then(() => {
            return dispatch({
                type: FILTER_TASKS,
                status
            })
        });
    }
}

export function getSortedTasks(id: string, action: any) {
    if (action.sortPriority) {
        return async (dispatch: any) => {
            return dispatch({
                type: SORT_BY_CUSTOM,
                id,
                customSort: action.sortPriority
            });
        }
    } else {
        return async (dispatch: any) => {
            return dispatch({
                type: SORT_BY_DEFAULT,
                id
            });
        }
    }
}

export function saveTasks(task: any, status?: string) {
    console.log('SAVE TASK')
    return (dispatch: any) => {
        dispatch({type: LOADING})
        return delay(2000).then(() => {
            dispatch({type: SAVE_TASK, task})
        }).then(() => {
            dispatch({type: FILTER_TASKS, status})
        })
    }
}

export function viewEditTasks(mode: string, id: string) {
    return async (dispatch: any) => {
        return dispatch({
            type: VIEW_OR_EDIT_TASK,
            id,
            mode
        });
    }
}