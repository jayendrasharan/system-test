import config from '../config';
import { ConfigType } from '../react-app-env';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS'

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
export const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB';
export const SORT_COLUMN = 'SORT_COLUMN';

export const CHANGE_GROUPBY = 'CHANGE_GROUPBY';

export const RESET_STATE = 'RESET_STATE';

export const groupByOptions = config.reduce<string[]>((acc: string[], cur: ConfigType) => {
  if(cur.allowGroupBy) return [...acc, cur.name]
  return acc;
}, [])

export const sortByOptions = config.reduce<string[]>((acc: string[], cur: ConfigType) => {
  if(cur.allowSortBy) return [...acc, cur.name]
  return acc;
}, [])

export const tabbarOptions = [{ id: 'all', label: 'All Tasks'}, { id: 'open', label: 'Pending Tasks' }, { id: 'done', label: 'Completed Tasks' }];