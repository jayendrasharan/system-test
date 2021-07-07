import { takeEvery, put, delay } from 'redux-saga/effects';

import {
  INIT_ADD_TODO,
  INIT_REMOVE_TODO,
  INIT_EDIT_TODO,
  INIT_GROUP_BY,
  INIT_SORT_BY,
  INIT_SEARCH_BY,
  addTodo,
  removeTodo,
  editTodo,
  groupBy,
  sortBy,
  searchBy
} from './actions';

const time = 2000;

function* add({ payload }) {
  yield delay(time);
  yield put(addTodo(payload));
}

function* remove({ payload }) {
  yield delay(time);
  yield put(removeTodo(payload));
}

function* edit({ payload }) {
  yield delay(time);
  yield put(editTodo(payload));
}

function* group({ payload }) {
  // yield delay(time);
  yield put(groupBy(payload));
}

function* sort({ payload }) {
  // yield delay(time);
  yield put(sortBy(payload));
}

function* search({ payload }) {
  yield put(searchBy(payload));
}

function* rootSaga() {
  yield takeEvery(INIT_ADD_TODO, add);
  yield takeEvery(INIT_REMOVE_TODO, remove);
  yield takeEvery(INIT_EDIT_TODO, edit);
  yield takeEvery(INIT_GROUP_BY, group);
  yield takeEvery(INIT_SORT_BY, sort);
  yield takeEvery(INIT_SEARCH_BY, search);
}

export default rootSaga;
