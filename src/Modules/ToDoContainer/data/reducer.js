// import { getNewTabState, getNewSearchState, getNewEditPayload } from "../helpers/reducerHelper";


const randomTasks = (limit) => {
  const intialTasks = [];

  for (let i = 0; i < limit; i++) {
    const newTask = {
      title: "Test todo" + i,
      description: "dfdfdfdffdfdf" + i,
      dueDate: "2020-06-26",
      priority: "medium",
      id: Math.random() * 1000 * new Date(),
      currentState: true,
      createdAt: new Date().toLocaleString(),
    };
    newTask.currentState = i % 2 ? true : false;
    newTask.priority = i % 2 ? 'medium' : 'high';
    intialTasks.push(newTask);
  }
  try {
    const storageItems = JSON.parse(localStorage.getItem('TODO_ITEMS'));
    if (storageItems.length > 0) {
      return storageItems;
    } else {
      localStorage.setItem('TODO_ITEMS', JSON.stringify(intialTasks))
    }
  } catch (err) {
    localStorage.setItem('TODO_ITEMS', JSON.stringify([]))
  }
  return intialTasks;

}

const initialState = {
  searchKey: "",
  todos: randomTasks(10),
  selectedTodos: [],
  currentTab: 'all',
  all: {
    sortColumn: null,
    sortOrder: "asc",
    groupBy: null,
  },
  completed: {
    sortColumn: null,
    sortOrder: "asc",
    groupBy: null,
  },
  pending: {
    sortColumn: null,
    sortOrder: "asc",
    groupBy: null,
  },
};



const updateGroupBy = (state = initialState, groupBy = null) => {
  switch (state.currentTab) {
    case 'all':
      return {
        ...state, all: { ...state.all, groupBy: groupBy }
      };
    case 'pending':
      return {
        ...state, pending: { ...state.pending, groupBy: groupBy }
      };;
    case 'completed':
      return {
        ...state, completed: { ...state.completed, groupBy: groupBy }
      };;
    default: return { ...state };
  }

}

const updateSort = (state = initialState, sortBy = {}) => {
  switch (state.currentTab) {
    case 'all':
      return {
        ...state, all: { ...state.all, sortColumn: sortBy.sortColumn, sortOrder: sortBy.sortOrder }
      };
    case 'pending':
      return {
        ...state, pending: { ...state.pending, ...sortBy }
      };;
    case 'completed':
      return {
        ...state, completed: { ...state.completed, ...sortBy }
      };;
    default: return { ...state };
  }

}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDING_TASK":
      return { ...state, isLoading: true };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...action.payload],
      };
    case "EDITING_TODO":
      return { ...state, editingTask: true };
    case "EDITED_TODO":
      return {
        ...state,
        todos: [...action.payload]
      };
    case "DELETING_TODO":
      return { ...state, isLoading: true };
    case "DELETE_TODO":
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false
      };
    case "COMPLETING_TODO":
      return { ...state, isLoading: action.payload };
    case "COMPLETE_TODO":
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false
      };
    case "LOADED_FROM_STORAGE":
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false
      };
    case "UPDATE_SEARCH_KEY":
      return { ...state, searchKey: action.payload };
    case "SET_CURRENT_TAB":
      return { ...state, currentTab: action.payload };
    case "UPDATE_GROUP_BY":
      return updateGroupBy(state, action.payload);
    case "UPDATE_SORT_BY":
      return updateSort(state, action.payload.sortBy);
    case "UPDATE_SELECTED_TODOS":
      return {
        ...state,
        selectedTodos: [...state.selectedTodos, action.payload]
      };
    default:
      return state;
  }
};

export default todoReducer;
