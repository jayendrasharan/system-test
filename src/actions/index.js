
export const loader = () => ({
    type: 'LOADER',
})

export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo
})

export const editTodo = (todo) => ({
    type: 'EDIT_TODO',
    payload: todo
})

export const deleteTodo = (todo) => ({
    type: 'DELETE_TODO',
    payload: todo
})

export const confirmDelete = (todo) => ({
    type: 'CONFIRM_DELETE_TODO',
    payload: todo
})

export const toggleModal = () => ({
    type: 'TOGGLE_MODAL'
})

export const viewTodoModal = (todo) => ({
    type: 'VIEW_TODO_MODAL',
    payload: todo
})

export const editTodoModal = (todo) => ({
    type: 'EDIT_TODO_MODAL',
    payload: todo
})

export const addTodoModal = () => ({
    type: 'ADD_TODO_MODAL'
})

export const toggleTodoStatus = (todo) => ({
    type: 'TOGGLE_TODO_STATUS',
    payload: todo
})

export const searchTodo = (keyword) => ({
    type: 'TODO_SEARCH',
    payload: keyword
})

export const groupBy = (keyword) => ({
    type: 'TODO_GROUPS',
    payload: keyword
})



