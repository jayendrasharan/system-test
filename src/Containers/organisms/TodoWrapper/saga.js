import { put, takeLatest } from 'redux-saga/effects';

import { addTaskSucess,completeTaskSucess } from './actions';
import { todoActions } from './constants';

export function* loadAddTaskSaga(taskId) {
  try {
    yield setTimeout(() => {
      console.log('in load add task Saga');
    }, 1000);
    yield put(addTaskSucess(taskId));
  } catch (err) {
    console.log('in error');
  }
}

export function* loadCompleteTaskSaga(taskId) {
  try {
    yield setTimeout(() => {
      console.log('in load add task Saga');
    }, 1000);
    yield put(completeTaskSucess(taskId));
  } catch (err) {
    console.log('in error');
  }
}

export default function* fetchToDoTaskSaga() {
  yield takeLatest(todoActions.completeTask, loadAddTaskSaga);
  yield takeLatest(todoActions.completeTask, loadCompleteTaskSaga);
}
