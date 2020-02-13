import data from '../.mock-data/todo-list.json';
import {
  CHANGE_GROUPBY, RESET_STATE, DELETE_TODO, CHANGE_TODO_STATUS, CHANGE_CURRENT_TAB
} from '../actions/todo';

export const initialState = {
  allTasks: data,
  visibleTasks: data,
  groupBy: 'none',
  searchTerm: '',
  sortBy: 'title',
  sortOrder: 'ASC',
  selectedTab: 'all'
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
        visibleTasks: state.visibleTasks.filter(i => i.id !== payload.id),
        allTasks: state.allTasks.filter(i => i.id !== payload.id)
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
        visibleTasks: state.visibleTasks.map(callback),
        allTasks: state.allTasks.map(callback)
      }
    }
    case CHANGE_CURRENT_TAB: {
      return {
        ...state,
        selectedTab: payload.value,
        visibleTasks: payload.value === 'all' ? state.allTasks : state.allTasks.filter(i => i.currentState === payload.value)
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