import { put, takeLatest } from 'redux-saga/effects';
import { addTaskSucess } from './actions';
import { todoActions } from './constants';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* loadAddTaskSaga({taskInfo}) {
  try {
    yield delay(3000);
    yield put(addTaskSucess(taskInfo));
  } catch (err) {
    // can add the dispatcher of error functionality
    console.log('redux saga error');
  }
}

export default function* fetchToDoTaskSaga() {
  yield takeLatest(todoActions.addTask, loadAddTaskSaga);
}
