

export const fetchTodos = payload => ({
  type: 'FETCH_TODOS',
  payload
});

export const updateActiveTab = payload => ({
  type: 'UPDATE_ACTIVE_TAB',
  payload
});

export const deleteRow = payload => ({
  type: 'DELETE_ROW',
  payload
});