import data from '../.mock-data/todo-list.json';
import {
  CHANGE_GROUPBY, RESET_STATE
} from '../actions/todo';
import { StateType, ActionType } from '../react-app-env'

export const initialState = {
  list: data,
  groupBy: 'none',
  searchTerm: '',
  sortBy: 'title',
  sortOrder: 'ASC'
}

export const initializeState = (state: StateType) => state;

export default (state: StateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_GROUPBY:
      return {
        ...state,
        groupBy: payload.value
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