import {
  getTodoList,
  getPendingTodoList,
  getCompletedTodoList,
  addTodo,
  deleteTodo,
  markTodoCompleted,
  markTodoOpen,
  updateTodo,
} from "./localStorage";

const Promisify = (func, ...args) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let res = func(...args);
        resolve(res);
      } catch (error) {
        reject({
          msg: error.message,
        });
      }
    }, 3000);
  });

export const fetchAllTodoList = () => {
  return Promisify(getTodoList);
};

export const fetchPendingTodoList = () => {
  return Promisify(getPendingTodoList);
};

export const fetchCompletedTodoList = () => {
  return Promisify(getCompletedTodoList);
};

export const addTodoItem = (todo) => {
  return Promisify(addTodo, todo);
};

export const updateTodoItem = (todo) => {
  return Promisify(updateTodo, todo);
};

export const deleteTodoItem = (id) => {
  return Promisify(deleteTodo, id);
};

export const markTodoItemComplete = (id) => {
  return Promisify(markTodoCompleted, id);
};

export const markTodoItemOpen = (id) => {
  return Promisify(markTodoOpen, id);
};
