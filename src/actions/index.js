let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const editTodo = (id, todo) => {
  return {
    type: 'EDIT_TODO',
    id: id,
    todo
  }
}

export const updateTodo = (id, todo) => {
  return {
    type: 'UPDATE_TODO',
    id: id,
    todo
  }
}

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    id: id
  }
}
export const viewTodo = (id, todo) => {
  return {
    type: 'VIEW_TODO',
    id: id,
    todo
  }
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}