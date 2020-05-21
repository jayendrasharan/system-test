import { handleActions } from 'redux-actions';
import { fetchTaskListActions, addTaskAction, editTaskAction, deleteTaskAction, changeTaskStateAction } from '../actions/toDoActions';
import { getUpdatedResponse } from './util/ReducerUtil';

const initialState = {
  apiResponse: {}
};
const taskReducer = handleActions(
  {
    [fetchTaskListActions.triggered](state) {
      return { ...initialState };
    },

    [fetchTaskListActions.succeeded](state, { payload }) {
      return {
        ...state,
        apiResponse: [...payload]
      };
    },

    [fetchTaskListActions.failed](state, { payload }) {
      return { ...state, error: payload.error_description };
    },

    [addTaskAction](state, { payload }) {
      const newApiResponse = getUpdatedResponse(state, 0, 0, payload);
      return {
        ...state,
        apiResponse: newApiResponse
      };
    },

    [editTaskAction](state, { payload }) {
      const newApiResponse = getUpdatedResponse(state, payload.key, 1, payload);
      return {
        ...state,
        apiResponse: newApiResponse
      };
    },
    [deleteTaskAction](state, { payload }) {
      const newApiResponse = [...state.apiResponse];
      newApiResponse.splice(payload.key, 1);
      return {
        ...state,
        apiResponse: newApiResponse
      };
    },
    [changeTaskStateAction](state, { payload }) {
      const newApiResponse = getUpdatedResponse(state, payload.key, 1, payload);
      return {
        ...state,
        apiResponse: newApiResponse
      };
    }
  },
  initialState
);

export default taskReducer;
