import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  API_CALL_COMPLETED,
  API_CALL_STARTED,
  RETAIN_TODOS
} from "../constants";

export const addTodo = payload => ({
  type: ADD_TODO,
  payload
});

export const editTodo = (index, payload) => ({
  type: EDIT_TODO,
  index,
  payload
});

export const deleteTodo = index => ({
  type: DELETE_TODO,
  index
});

export const retainTodo = todos => ({
  type: RETAIN_TODOS,
  todos
});

export const isLoading = loading => {
  if (loading) {
    return {
      type: API_CALL_STARTED
    };
  }
  return {
    type: API_CALL_COMPLETED
  };
};
