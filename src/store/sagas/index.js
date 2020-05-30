import { types } from "../constants";
import { takeLatest, all, call, put } from 'redux-saga/effects';

function addNewTask(data) {
    return data
}

export function* addNewTaskSaga(action) {
    console.log("addNewTaskSaga -----", action)
    try {
        const response = yield call(addNewTask, action.payload);
        yield put({ type: types.ADD_TASK, payload: response });
    }
    catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([
        yield takeLatest(types.ADD_TASK, addNewTask)
    ])
}