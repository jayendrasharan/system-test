import { takeLatest, takeEvery, fork, cancel } from 'redux-saga/effects';

function* cancelWorkerSaga(task) {
  yield cancel(task);
}

function* authSaga() {
  const workerTask = yield fork(takeEvery);
  yield fork(takeLatest, cancelWorkerSaga, workerTask);
}

export default authSaga;
