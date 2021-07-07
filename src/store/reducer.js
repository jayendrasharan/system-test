import {
  INIT_ADD_TODO,
  INIT_REMOVE_TODO,
  INIT_EDIT_TODO,
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  INIT_GROUP_BY,
  GROUP_BY,
  INIT_SORT_BY,
  SORT_BY,
  INIT_SEARCH_BY,
  SEARCH_BY,
  SWITCH_STATUS
} from './actions';

import { todosData } from './../data';

const initState = {
  loading: false,
  todos: todosData,
  showTodos: todosData
};

export default (state = initState, action) => {
  switch (action.type) {
    case INIT_ADD_TODO:
    case INIT_REMOVE_TODO:
    case INIT_EDIT_TODO:
    case INIT_GROUP_BY:
    case INIT_SORT_BY:
    case INIT_SEARCH_BY:
      return {
        ...state,
        loading: true
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        showTodos: [...state.todos, action.payload],
        loading: false
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        showTodos: state.todos.filter(todo => todo.id !== action.payload),
        loading: false
      };

    case EDIT_TODO:
      const allTodos = [...state.todos];
      const editedTodo = allTodos.find(todo => todo.id === action.payload.id);
      const editedTodoIndex = allTodos.findIndex(
        todo => todo.id === action.payload.id
      );
      const updatedTodo = {
        ...editedTodo,
        ...action.payload
      };
      allTodos.splice(editedTodoIndex, 1, updatedTodo);
      return {
        ...state,
        todos: allTodos,
        loading: false
      };
    case GROUP_BY:
      const groupedTodos = {};
      let groupByValue;
      state.todos.forEach(todo => {
        groupByValue = todo[action.payload];
        if (action.payload === 'priority') {
          groupedTodos[groupByValue.value] = groupedTodos[groupByValue.value]
            ? [...groupedTodos[groupByValue.value], todo]
            : [todo];
        } else {
          groupedTodos[groupByValue] = groupedTodos[groupByValue]
            ? [...groupedTodos[groupByValue], todo]
            : [todo];
        }
      });
      return {
        ...state,
        showTodos: groupedTodos,
        loading: false
      };
    case SORT_BY:
      let sortedTodos = [...state.todos];
      switch (action.payload) {
        case 'completed':
          sortedTodos = sortedTodos.sort((a, b) => {
            if (a.checked) return -1;
            if (b.checked) return 1;
            return 0;
          });
          break;
        case 'title':
          sortedTodos = sortedTodos.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA > titleB) return 1;
            if (titleA < titleB) return -1;
            return 0;
          });
          break;
        case 'createdAt':
          sortedTodos = sortedTodos.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          break;
        case 'dueDate':
          sortedTodos = sortedTodos.sort((a, b) => {
            return a.dueDate - b.dueDate;
          });
          break;
        case 'priority':
          sortedTodos = sortedTodos.sort((a, b) => {
            return b.priority.status - a.priority.status;
          });
          break;
        default:
          return sortedTodos;
      }
      return {
        ...state,
        showTodos: sortedTodos,
        loading: false
      };

    case SEARCH_BY:
      const filteredTodos = state.todos.filter(todo =>
        todo[action.payload.searchBy]
          .toLowerCase()
          .includes(action.payload.search.toLowerCase())
      );
      return {
        ...state,
        showTodos: filteredTodos,
        loading: false
      };
    case SWITCH_STATUS:
      const todosCopy = [...state.todos];
      const todo = todosCopy.find(todo => todo.id === action.payload.id);
      todo.checked = action.payload.checked;
      return {
        ...state,
        todos: todosCopy
      };
    default:
      return state;
  }
};
