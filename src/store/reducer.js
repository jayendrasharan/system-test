import {
  FETCH_ALL_TODO_LIST,
  SORT_ACTION,
  SELECT_ACTION,
  SELECT_ALL_ACTION,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from "./actionTypes";
import { filterHandler } from "../utils/utils";

const initialState = {
  todoList: [],
  loading: false,
  error: true,
  tabs: ["ALL", "PENDING", "COMPLETED"],
  activeTab: "ALL",
  activeSortColumn: null,
  selectedGroupBy: null,
  groupByOptions: [
    {
      key: "createdAt",
      title: "Created On",
    },
    {
      key: "dueDate",
      title: "Due Date",
    },
    {
      key: "priority",
      title: "Priority",
    },
  ],
  columns: [
    {
      title: "Description",
      key: "description",
      sort: false,
      active: false,
      asc: false,
      allowGroupBy: false,
      allowSearch: true,
      display: false,
    },
    {
      title: "Summary",
      key: "title",
      sort: true,
      active: true,
      asc: false,
      allowGroupBy: false,
      allowSearch: true,
      display: true,
    },
    {
      title: "Status",
      key: "currentState",
      sort: true,
      active: false,
      asc: false,
      allowGroupBy: false,
      allowSearch: false,
      display: true,
    },
    {
      title: "Priority",
      key: "priority",
      sort: true,
      active: false,
      asc: false,
      allowGroupBy: true,
      allowSearch: false,
      display: true,
    },
    {
      title: "Created on",
      key: "createdAt",
      sort: true,
      active: false,
      asc: false,
      allowGroupBy: true,
      allowSearch: false,
      display: true,
    },
    {
      title: "Due Date",
      key: "dueDate",
      sort: true,
      active: false,
      asc: false,
      allowGroupBy: true,
      allowSearch: false,
      display: true,
    },
    {
      title: "Actions",
      key: "actions",
      sort: false,
      active: false,
      asc: false,
      allowGroupBy: false,
      allowSearch: false,
      display: true,
    },
  ],
};

const sortDataByColumn = (data, column) => {
  if (column) {
    return data.sort(filterHandler(column.key, !column.asc));
  }
  return data;
};

const applySearch = (data, searchString, columns) => {
  if (searchString && searchString.trim()) {
    return data.filter((item) => {
      let found = false;
      columns.forEach((col) => {
        if (col.allowSearch) {
          if (item[col.key] && item[col.key].includes(searchString)) {
            found = true;
          }
        }
      });
      return found;
    });
  }
  return data;
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
