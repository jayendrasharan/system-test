import {
  FETCH_ALL_TODO_LIST,
  FETCH_OPEN_TODO_LIST,
  FETCH_COMPLETED_TODO_LIST,
  SORT_ACTION,
} from "./actionTypes";
import { filterHandler } from "../utils/utils";

const initialState = {
  todoList: [],
  pendingList: [],
  completedList: [],
  loading: false,
  error: true,
  tabs: {
    ALL: "ALL",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
  },
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
      title: "Summary",
      key: "title",
      sort: true,
      active: true,
      asc: false,
    },
    {
      title: "Status",
      key: "currentState",
      sort: true,
      active: false,
      asc: false,
    },
    {
      title: "Priority",
      key: "priority",
      sort: true,
      active: false,
      asc: false,
    },
    {
      title: "Created on",
      key: "createdAt",
      sort: true,
      active: false,
      asc: false,
    },
    {
      title: "Due Date",
      key: "dueDate",
      sort: true,
      active: false,
      asc: false,
    },
    {
      title: "Actions",
      key: "actions",
      sort: false,
      active: false,
      asc: false,
    },
  ],
};

const sortDataByColumn = (data, column) => {
  if (column) {
    return data.sort(filterHandler(column.key, !column.asc));
  }
  return data;
};

const sortByColumn = (state, action) => {
  const {
    tabs,
    activeTab,
    columns,
    todoList,
    completedList,
    pendingList,
  } = state;
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
  let data = {};
  switch (activeTab) {
    case tabs.ALL:
      data = { todoList: [...sortDataByColumn(todoList, payload)] };
      break;
    case tabs.COMPLETED:
      data = { completedList: [...sortDataByColumn(completedList, payload)] };
      break;
    case tabs.PENDING:
      data = { pendingList: [...sortDataByColumn(pendingList, payload)] };
      break;
    default:
      data = {};
  }
  return {
    ...state,
    activeSortColumn: action.payload,
    columns: columnsNew,
    ...data,
  };
};

const loadTodoItems = (state, action) => {
  const { activeSortColumn } = state;
  return {
    ...state,
    todoList: sortDataByColumn(action.payload, activeSortColumn),
  };
};

const loadCompletedTodoItems = (state, action) => {
  const { activeSortColumn } = state;
  return {
    ...state,
    pendingList: sortDataByColumn(action.payload, activeSortColumn),
  };
};

const loadOpenTodoItems = (state, action) => {
  const { activeSortColumn } = state;
  return {
    ...state,
    completedList: sortDataByColumn(action.payload, activeSortColumn),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TODO_LIST:
      return loadTodoItems(state, action);
    case FETCH_OPEN_TODO_LIST:
      return loadOpenTodoItems(state, action);
    case FETCH_COMPLETED_TODO_LIST:
      return loadCompletedTodoItems(state, action);
    case SORT_ACTION:
      return sortByColumn(state, action);
    default:
      return state;
  }
};

export default reducer;
