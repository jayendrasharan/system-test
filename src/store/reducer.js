import {
  FETCH_ALL_TODO_LIST,
  SORT_ACTION,
  SELECT_ACTION,
  SELECT_ALL_ACTION,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from "./actionTypes";
import { filterHandler } from "../utils/utils";
import tableConfig from "../config/tableConfig";

const initialState = {
  todoList: [],
  loading: false,
  error: true,
  tabs: ["ALL", "PENDING", "COMPLETED"],
  activeTab: "ALL",
  activeSortColumn: null,
  columns: tableConfig,
};

const sortByColumn = (state, action) => {
  const { columns } = state;
  const { payload } = action;
  let columnsNew = columns.map((rec, ind) => {
    if (rec.key == payload.key) {
      return {
        ...rec,
        asc: !rec.asc,
        active: true,
      };
    } else {
      return {
        ...rec,
        asc: false,
        active: false,
      };
    }
  });
  return {
    ...state,
    activeSortColumn: action.payload,
    columns: columnsNew,
  };
};

const loadTodoItems = (state, action) => {
  const { activeSortColumn, columns } = state;
  return {
    ...state,
    todoList: action.payload,
    loading: false,
  };
};

const selectTodoItem = (state, action) => {
  let index = state.todoList.findIndex((todo) => todo.id == action.payload.id);
  let updatedTodoList = [...state.todoList];
  updatedTodoList[index] = {
    ...updatedTodoList[index],
    selected: !updatedTodoList[index].selected,
  };
  return {
    ...state,
    todoList: updatedTodoList,
  };
};

const selectAllTodoItems = (state, action) => {
  let updatedTodoList = state.todoList.map((todo) => ({
    ...todo,
    selected: !todo.selected,
  }));
  return {
    ...state,
    todoList: updatedTodoList,
  };
};

const showSpinner = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const hideSpinner = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TODO_LIST:
      return loadTodoItems(state, action);
    case SORT_ACTION:
      return sortByColumn(state, action);
    case SELECT_ACTION:
      return selectTodoItem(state, action);
    case SELECT_ALL_ACTION:
      return selectAllTodoItems(state, action);
    case SHOW_SPINNER:
      return showSpinner(state);
    case HIDE_SPINNER:
      return hideSpinner(state);
    default:
      return state;
  }
};

export default reducer;
