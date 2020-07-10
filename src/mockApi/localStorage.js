import { TODO_STATUS, TODO_PRIORITY } from "../constants";
import { getUUID } from "./utils";
import sampleDate from "./testData";

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

if (!getItem("todoList")) {
  setItem("todoList", sampleDate);
}

export const getTodoList = () => {
  return getItem("todoList") || [];
};

export const getPendingTodoList = () => {
  let todoList = getTodoList();
  return todoList.filter((todo) => todo["currentState"] === TODO_STATUS.OPEN);
};

export const getCompletedTodoList = () => {
  let todoList = getTodoList();
  return todoList.filter(
    (todo) => todo["currentState"] === TODO_STATUS.COMPLETED
  );
};

export const addTodo = (todo) => {
  let todoList = getTodoList();
  let newTodo = { ...todo, id: getUUID() };
  setItem("todoList", [...todoList, newTodo]);
  return newTodo;
};

export const deleteTodoList = (listIds) => {
  let todoList = getTodoList();
  for (let id of listIds) {
    let index = todoList.findIndex((todo) => todo.id === id);
    if (index == -1) {
      continue;
    }
    todoList.splice(index, 1);
  }
  setItem("todoList", [...todoList]);
};

export const deleteTodo = (id) => {
  if (Array.isArray(id)) {
    return deleteTodoList(id);
  }
  let todoList = getTodoList();
  let index = todoList.findIndex((todo) => todo.id === id);
  if (index == -1) {
    throw new Error("Todo doesn't exist with id:" + id);
  }
  todoList.splice(index, 1);
  setItem("todoList", [...todoList]);
};

export const updateTodo = (todo) => {
  let todoList = getTodoList();
  let index = todoList.findIndex((t) => t.id === todo.id);
  todoList[index] = { ...todo };
  setItem("todoList", [...todoList]);
  return todo;
};

export const markTodoListOpen = (listIds) => {
  let todoList = getTodoList();
  for (let id of listIds) {
    let todo = todoList.find((todo) => todo.id === id);
    todo.currentState = TODO_STATUS.OPEN;
    updateTodo(todo);
  }
  return;
};

export const markTodoOpen = (id) => {
  if (Array.isArray(id)) {
    return markTodoListOpen(id);
  }
  let todoList = getTodoList();
  let todo = todoList.find((todo) => todo.id === id);
  todo.currentState = TODO_STATUS.OPEN;
  return updateTodo(todo);
};

export const markTodoListCompleted = (listIds) => {
  let todoList = getTodoList();
  for (let id of listIds) {
    let todo = todoList.find((todo) => todo.id === id);
    todo.currentState = TODO_STATUS.COMPLETED;
    updateTodo(todo);
  }
  return;
};

export const markTodoCompleted = (id) => {
  if (Array.isArray(id)) {
    return markTodoListCompleted(id);
  }
  let todoList = getTodoList();
  let todo = todoList.find((todo) => todo.id === id);
  todo.currentState = TODO_STATUS.COMPLETED;
  return updateTodo(todo);
};
