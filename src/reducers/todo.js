import data from '../.mock-data/todo-list.json';
import {
  CHANGE_GROUPBY, RESET_STATE, DELETE_TODO,
  CHANGE_TODO_STATUS, CHANGE_CURRENT_TAB,
  SORT_COLUMN, OPEN_ADD_TASK_MODAL, CLOSE_TASK_MODAL,
  OPEN_EDIT_TASK_MODAL, SUBMIT_FORM
} from '../actions/todo';

export const initialState = {
  currentId: data.map(i => i.id).sort((a, b) => a-b).reverse()[0] || 1,
  tasks: data,
  groupBy: 'none',
  searchTerm: '',
  sortBy: 'title',
  sortOrder: 'ASC',
  selectedTab: 'all',
  openModal: false,
  selectedTask: {}
}

export const initializeState = (state) => state;

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_GROUPBY:
      return {
        ...state,
        groupBy: payload.value
      }
    case DELETE_TODO: {
      return {
        ...state,
        tasks: state.tasks.filter(i => i.id !== payload.id)
      }
    }
    case CHANGE_TODO_STATUS: {
      const callback = (i) => {
        if(i.id === payload.id) {
          i.currentState = i.currentState === 'open' ? 'done' : 'open';
        }
        return {...i};
      }
      return {
        ...state,
        tasks: state.tasks.map(callback),
      }
    }
    case CHANGE_CURRENT_TAB: {
      return {
        ...state,
        selectedTab: payload.value,
      }
    }
    case SORT_COLUMN: {
      const { columnName } = payload
      const sortOrder = state.sortBy !== columnName ? state.sortOrder : state.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      const callback = (a, b) => {
        if(a[columnName] < b[columnName]) return sortOrder === 'ASC' ? -1 : 1
        else if(a[columnName] > b[columnName]) return sortOrder === 'ASC' ? 1 : -1;
        else return 0;
      }
      return {
        ...state,
        sortOrder,
        sortBy: columnName,
        tasks: state.tasks.sort(callback)
      }
    }
    case OPEN_ADD_TASK_MODAL: {
      return {
        ...state,
        openModal: true
      }
    }
    case OPEN_EDIT_TASK_MODAL: {
      return {
        ...state,
        openModal: true,
        selectedTask: state.tasks.filter(task => task.id === payload.id)[0] // not used find as less browser support.
      }
    }
    case CLOSE_TASK_MODAL: {
      return {
        ...state,
        openModal: false,
        selectedTask: {}
      }
    }
    case SUBMIT_FORM: {
      return {
        ...state,
        tasks: [...state.tasks, {id: state.currentId + 1, currentState: 'open', ...payload, createdAt: (new Date()).toLocaleDateString()}],
        openModal: false,
        selectedTask: {},
        currentId: state.currentId + 1
      }
    }
    case RESET_STATE:
      return initializeState(initialState)
    default:
      return {
        ...state,
        ...payload
      }
  }
}