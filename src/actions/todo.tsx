import config from '../config';
import { ConfigType, optionType } from '../react-app-env';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS'

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
export const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB';
export const SORT_COLUMN = 'SORT_COLUMN';

export const CHANGE_GROUPBY = 'CHANGE_GROUPBY';

export const OPEN_ADD_TASK_MODAL = 'OPEN_ADD_TASK_MODAL';
export const CLOSE_TASK_MODAL = 'CLOSE_TASK_MODAL';
export const OPEN_EDIT_TASK_MODAL = 'OPEN_EDIT_TASK_MODAL';

export const SEARCH_TASKS = 'SEARCH_TASKS';

export const SUBMIT_FORM = 'SUBMIT_FORM';

export const RESET_STATE = 'RESET_STATE';

export const allowedCurrentStates = ['open', 'done']

export const allowedPriorities = ['none', 'low', 'medium', 'high']

export const tabbarOptions = [{ id: 'all', label: 'All Tasks'}, { id: 'open', label: 'Pending Tasks' }, { id: 'done', label: 'Completed Tasks' }];

export const inputPrioritySelectionOptions = [{ id: 'none', label: 'None'}, { id: 'low', label: 'Low'}, { id: 'medium', label: 'Medium'}, { id: 'high', label: 'High' }]

export const groupByOptions = config.reduce<optionType[]>((acc: optionType[], cur: ConfigType) => {
  if(cur.allowGroupBy) return [...acc, {id: cur.id, label: cur.label}]
  return acc;
}, [])

export const sortByOptions = config.reduce<string[]>((acc: string[], cur: ConfigType) => {
  if(cur.allowSortBy) return [...acc, cur.name]
  return acc;
}, [])

export const searchOptions = config.reduce<string[]>((acc: string[], cur: ConfigType) => {
  if(cur.allowSearch) return [...acc, cur.name]
  return acc;
}, [])

export const initialTaskObj = {
  id: -1,
  currentState: 'open',
  title: '',
  description: '',
  createdAt: '',
  dueDate: '',
  priority: 'none'
}