import { getNewTabState, getNewSearchState, getNewEditPayload } from "../helpers/reducerHelper";

const initialState = {
  searchKey: "",
  tasks: [
    {
      title: "Test",
      description: "dfdfdfdffdfdf",
      dueDate: "2020-06-26",
      priority: "low",
      _id: 1592389862176,
      currentState: true,
      createdAt: 1592389862176,
    },
    {
      title: "Abhi",
      description: "ffffdfdfdffdfdf",
      dueDate: "2020-06-26",
      priority: "low",
      _id: 1592389862175,
      currentState: true,
      createdAt: 1592389862176,
    },
    {
      title: "Abhi",
      description: "ffffdfdfdffdfdf",
      dueDate: "2020-06-26",
      priority: "low",
      _id: 1592389862170,
      currentState: true,
      createdAt: 1592389862176,
    },
  ],
  addingTask: false,
  deletingTask: false,
  editingTask: false,
  closingTask: false,
  showEditModal: null,
  editPayload: null,
  allTab: {
    sortBy: null,
    sortOrder: "asc",
    groupBy: null,
  },
  completedTab: {
    sortBy: null,
    sortOrder: "asc",
    groupBy: null,
  },
  pendingTab: {
    sortBy: null,
    sortOrder: "asc",
    groupBy: null,
  },
  searchResult: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDING_TASK":
      return { ...state, addingTask: true };
    case "ADDED_TASK":
      return {
        ...state,
        addingTask: false,
        tasks: [action.payload, ...state.tasks],
      };
    case "EDITING_TASK":
      return { ...state, editingTask: true };
    case "EDITED_TASK":
      return {
        ...state,
        editingTask: false,
        tasks: [...state.tasks].map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DELETING_TASK":
      return { ...state, deletingTask: true };
    case "DELETED_TASK":
      return {
        ...state,
        deletingTask: false,
        tasks: [...state.tasks].filter((item) => item._id !== action.payload),
      };
    case "CLOSING_TASK":
      return { ...state, closingTask: true };
    case "CLOSED_TASK":
      return {
        ...state,
        closingTask: false,
        tasks: [...state.tasks].map((item) =>
          item._id === action.payload ? { ...item, currentState: !item.currentState } : { ...item }
        ),
      };
    case "SEARCH_KEY_CHANGE":
      return getNewSearchState(state, action.payload);
    case "TOGGLE_EDIT":
      return getNewEditPayload(state, action.payload);
    case "UPDATE_TAB_STATE":
      return getNewTabState(state, action.payload);
    default:
      return state;
  }
};

export default appReducer;
