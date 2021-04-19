import { all } from 'redux-saga/effects';
import fetchToDoTaskSaga from '../src/Containers/organisms/TodoWrapper/saga';
export default function* rootSaga() {
  yield all([fetchToDoTaskSaga()]);
}
