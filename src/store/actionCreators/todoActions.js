import todoListData from '../staticData/todoListData';

export const getAllTodos = () => {
    return dispatch => {
        dispatch(toggleBackdrop());
        setTimeout(() => {
            dispatch({
                type: "GET_TODO_LIST",
                values: {
                    data: todoListData
                }
            });
            dispatch(toggleBackdrop());
        }, 1000)
    }
}

export const searchTodoItems = value => {
    return {
        type: "SEARCH_TODO_ITEMS",
        values: {
            searchText: value
        }
    }
}

export const deleteTodo = id => {
    return dispatch => {
        dispatch(toggleBackdrop());
        setTimeout(() => {
            dispatch({
                type: "DELETE_TODO",
                values: {
                    id
                }
            });
            dispatch(toggleBackdrop());
        }, 500)

    }
}

export const toggleAlertBox = info => {
    return {
        type: "TOGGLE_ALERT_BOX",
        values: {
            ...info
        }
    }
}

export const openTodoForm = (id, isEditable) => {
    return {
        type: "TOGGLE_TODO_FORM",
        values: {
            id,
            isEditable
        }
    }
}

export const toggleTaskStatus = id => {
    return {
        type: "TOGGLE_COMPLETE",
        values: {
            id
        }
    }
}

export const saveTodoItem = values => {
    return dispatch => {
        dispatch(toggleBackdrop());
        setTimeout(() => {
            dispatch({
                type: "ADD_TODO_LIST",
                values : {
                    ...values
                }
            })
            dispatch(toggleBackdrop());
        }, 500)
    }
}

export const toggleBackdrop = () => {
    return {
        type: "TOGGLE_BACKDROP"
    }
}

export const markListAsDone = (ids) => {
    return {
        type: "MARK_LIST_DONE",
        values: {
            ids
        }
    }
}

export const markListAsPending = (ids) => {
    return {
        type: "MARK_LIST_PENDING",
        values: {
            ids
        }
    }
}