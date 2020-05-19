import createFetchActions from './createFetchActions';
import { createActions } from 'redux-actions';

const fetchTaskListActions = createFetchActions('TASK_LIST');
const { saveTaskAction } = createActions({}, 'SAVE_TASK_ACTION');

export { fetchTaskListActions, saveTaskAction };
