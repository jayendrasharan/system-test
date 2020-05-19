import { handleActions } from 'redux-actions';
import { fetchTaskListActions, saveTaskAction } from '../actions/toDoActions';

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

    [saveTaskAction](state, { payload }) {
      const newApiResponse = [...state.apiResponse];
      newApiResponse.push(payload);
      return {
        ...state,
        apiResponse: newApiResponse
      };
    }
  },
  initialState
);

export default taskReducer;
