import { UPDATE_TODO, FETCH_TODOS, UPDATE_ACTIVE_TAB, DELETE_TODO, ADD_TODO, BULK_DONE, BULK_PENDING, GLOBAL_SEARCH } from "../Constant";

export const fetchTodos = payload => ({
  type: FETCH_TODOS,
  payload
});

export const updateActiveTab = payload => ({
  type: UPDATE_ACTIVE_TAB,
  payload
});

export const deleteTodo = payload => ({
  type: DELETE_TODO,
  payload
});

export const addTodo = payload => ({
  type: ADD_TODO,
  payload
});

export const updateTodo = payload => ({
  type: UPDATE_TODO,
  payload
});

export const markDone = payload => ({
  type: BULK_DONE,
  payload
});

export const markPending = payload => ({
  type: BULK_PENDING,
  payload
});

export const globalSearch = payload => ({
  type: GLOBAL_SEARCH,
  payload
})



export const asyncDeleteTodo = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(deleteTodo(payload));
    }, 500)
  }
}

export const asyncMarkDone = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(markDone(payload));
    }, 500)
  }
}

export const asyncMarkPending = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(markPending(payload));
    }, 500)
  }
}

export const asyncUpdateTodos = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(updateTodo(payload));
    }, 500)
  }
}

export const asyncFetchTodos = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(fetchTodos(payload));
    }, 1500)
  }
}

export const asyncAddTodo = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addTodo(payload));
    }, 500)
  }
}

