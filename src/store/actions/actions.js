

export const fetchTodos = payload => ({
  type: 'FETCH_TODOS',
  payload
});

export const updateActiveTab = payload => ({
  type: 'UPDATE_ACTIVE_TAB',
  payload
});

export const deleteTodo = payload => ({
  type: 'DELETE_TODO',
  payload
});

export const addTodo = payload => ({
  type: 'ADD_TODO',
  payload
});

export const updateTodo = payload => ({
  type: 'UPDATE_TODO',
  payload
});