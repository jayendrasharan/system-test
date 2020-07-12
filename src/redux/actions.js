export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SORT_TODO = "SORT_TODO";
export const SEARCH_TODO = "SEARCH_TODO";
export const GROUPBY_TODO = "GROUPBY_TODO";

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo,
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO,
        payload: todo,
    }
}

export function deleteTodo(todoId) {
    return {
        type: DELETE_TODO,
        payload: todoId,
    }
}

export function searchByTodo(label) {
    return {
        type: SEARCH_TODO,
        payload: label,
    }
}

export function sortByTodo(label) {
    return {
        type: SORT_TODO,
        payload: label,
    }
}

export function groupByTodo(label) {
    return {
        type: GROUPBY_TODO,
        payload: label,
    }
}
