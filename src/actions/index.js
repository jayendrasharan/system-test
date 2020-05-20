export const addTodo = text => ({
  type: 'ADD_TODO',
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const toggleOverlay = (id) => ({
  type: "TOGGLE_OVERLY",
  id
})

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id
})

export const markAsDone = id => ({
  type: 'MARK_AS_COMPLETED',
  id
})

export const markAsUnDone = id => ({
  type: 'MARK_AS_NOTCOMPLETED',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
