import {
  addTodo,
  editTodo,
  deleteTodo,
  isLoading,
  retainTodo
} from "./todoActionCreater";

export const addTodoAction = todo => dispatch => {
  dispatch(isLoading(true));
  setTimeout(() => {
    dispatch(addTodo(todo));
    dispatch(isLoading(false));
  }, 1000);
};

export const editTodoAction = (index, todo) => dispatch => {
  dispatch(isLoading(true));
  setTimeout(() => {
    dispatch(editTodo(index, todo));
    dispatch(isLoading(false));
  }, 1000);
};

export const deleteTodoAction = index => dispatch => {
  dispatch(isLoading(true));
  setTimeout(() => {
    dispatch(deleteTodo(index));
    dispatch(isLoading(false));
  }, 1000);
};

export const retainTodoAction = todos => dispatch => {
  dispatch(retainTodo(todos));
};
