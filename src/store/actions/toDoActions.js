import createFetchActions from './createFetchActions';
import { createActions } from 'redux-actions';

const fetchTaskListActions = createFetchActions('TASK_LIST');
const { addTaskAction, editTaskAction, deleteTaskAction, changeTaskStateAction } = createActions(
  {},
  'ADD_TASK_ACTION',
  'EDIT_TASK_ACTION',
  'DELETE_TASK_ACTION',
  'CHANGE_TASK_STATE_ACTION'
);

export { fetchTaskListActions, addTaskAction, editTaskAction, deleteTaskAction, changeTaskStateAction };
