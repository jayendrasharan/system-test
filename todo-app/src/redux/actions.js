

export const CREATE_TODO = 'CREATE_TODO';

export const addTodos =  todo => ({
    type: CREATE_TODO,
    payload: {todo}
})


export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodos = todo => ({
    type: REMOVE_TODO,
    payload: {todo}
})


export const EDIT_TODO = 'EDIT_TODO';

export const editTodos = todo => ({
    type: EDIT_TODO,
    payload: {todo}
})

export const TODO_STATUS_UPDATE = 'TODO_STATUS_UPDATE';

export const todoStatusUpdate = todo => ({
    type: TODO_STATUS_UPDATE,
    payload: {todo}
})


export const SEARCH_TODO_TEXT = 'SEARCH_TODO_TEXT';

export const searchTodoText = text => ({
    type: SEARCH_TODO_TEXT,
    payload: {text}
})

export const LOAD_TODO_PROGRESS = 'LOAD_TODO_PROGRESS';

export const loadTodosProgress = () => ({
    type: LOAD_TODO_PROGRESS,
})

export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';

export const loadTodosSuccess = todos => ({
    type: LOAD_TODO_SUCCESS,
    payload: {todos},
})

export const LOAD_TODO_FAILURE = 'LOAD_TODO_FAILURE';

export const loadTodosFailure = () => ({
    type: LOAD_TODO_FAILURE,
})