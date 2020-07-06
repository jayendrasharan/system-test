import todoSaga  from '../Modules/ToDoContainer/data/saga';
import { all } from 'redux-saga/effects';

export default function* saga() {
  yield all([
    todoSaga(),
  ]);
}
