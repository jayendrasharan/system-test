import config from '../config';
import { ConfigType } from '../react-app-env';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_INPUT = 'CHANGE_INPUT';

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';

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