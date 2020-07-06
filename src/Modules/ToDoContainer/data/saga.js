import {
    put,
    takeLatest,
    all,
} from 'redux-saga/effects';
// import { orderBy, mapKeys, isEmpty } from 'lodash';
import todoApi from '../../../todoApi';

export default function* todoSaga() {
    try {
        yield all([
            takeLatest('SET_SEARCH_KEY', setSearchKey),
            takeLatest('UPDATE_ITEM_STATE', setItemComplete),
            takeLatest('DELETE_TODO_FROM_STORAGE', deleteTodoItem),
            takeLatest('ADD_ITEM_STORAGE', addTodoItem),
            takeLatest('EDIT_ITEM_STORAGE', editTodoItem),
        ]);
    } catch (error) {
        return;
    }
}
export function* setSearchKey(action) {

    try {
        if (action.payload !== '') {
            yield put({ type: 'UPDATE_SEARCH_KEY', payload: action.payload });
        }
    } catch (error) {
        yield put({ type: 'UPDATE_SEARCH_KEY', payload: '' });
    }
}

export function* setItemComplete(action) {

    try {
        if (action.payload) {
            yield put({ type: 'COMPLETING_TODO', payload: true });
            const updatedTodos = yield todoApi.completeTodo(action.payload);
            yield put({ type: 'COMPLETE_TODO', payload: updatedTodos });
        }
    } catch (error) {
        yield put({ type: 'COMPLETING_TODO', payload: false });
    }
}

export function* deleteTodoItem(action) {
    try {
        if (action.payload) {
            yield put({ type: 'DELETING_TODO', payload: true });
            const updatedTodos = yield todoApi.deleteFromStorage(action.payload);
            yield put({ type: 'DELETE_TODO', payload: updatedTodos });
        }
    } catch (error) {
        yield put({ type: 'DELETING_TODO', payload: false });
    }
}

export function* addTodoItem(action) {
    try {
        if (action.payload) {
            yield put({ type: 'ADDING_TODO', payload: true });
            const updatedTodos = yield todoApi.addToStorage(action.payload);
            yield put({ type: 'ADD_TODO', payload: updatedTodos });
        }
    } catch (error) {
        yield put({ type: 'ADDING_TODO', payload: false });
    }
}
export function* editTodoItem(action) {
    try {
        if (action.payload) {
            yield put({ type: 'EDITING_TODO', payload: true });
            const updatedTodos = yield todoApi.editToStorage(action.payload);
            yield put({ type: 'EDITED_TODO', payload: updatedTodos });
        }
    } catch (error) {
        yield put({ type: 'EDITING_TODO', payload: false });
    }
}

