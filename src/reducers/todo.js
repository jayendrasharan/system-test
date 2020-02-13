import data from '../.mock-data/todo-list.json';
import {
  CHANGE_GROUPBY, RESET_STATE, DELETE_TODO
} from '../actions/todo';

export const initialState = {
  list: data,
  groupBy: 'none',
  searchTerm: '',
  sortBy: 'title',
  sortOrder: 'ASC'
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
        list: state.list.filter(i => i.id !== payload.id)
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