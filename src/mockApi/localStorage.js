import { TODO_STATUS, TODO_PRIORITY } from "../constants";
import { getUUID } from "./utils";

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

if (!getItem("todoList")) {
  setItem("todoList", [
    {
      currentState: TODO_STATUS.OPEN,
      title: "Workout",
      description: "I have to do gym workout today.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: TODO_PRIORITY.HIGH,
    },
  ]);
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
  setItem("todoList", [...todoList, { ...todo, id: getUUID() }]);
  return newTodo;
};

export const deleteTodo = (id) => {
  let todoList = getTodoList();
  let index = todoList.findIndex((todo) => todo.id === id) || -1;
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

export const markTodoOpen = (id) => {
  let todoList = getTodoList();
  let todo = todoList.find((todo) => todo.id === id) || null;
  todo.currentState = TODO_STATUS.OPEN;
  return updateTodo(todo);
};

export const markTodoCompleted = (id) => {
  let todoList = getTodoList();
  let todo = todoList.find((todo) => todo.id === id) || null;
  todo.currentState = TODO_STATUS.COMPLETED;
  return updateTodo(todo);
};
