import { all } from "redux-saga/effects";

import { taskOperations } from "./taskssaga";

export default function* rootSaga() {
  yield all([
    // actionWatcher(),
    taskOperations(),
  ]);
}
