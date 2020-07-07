import { taskConstants } from "../_constants";

const initialState = {
  //data: [],
  loading: false,
  //error: ''
};

export function task(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case taskConstants.CREATE_TASK:
      return {
        ...state,
        createTask: action.data,
      };

    case taskConstants.SUCCESS_CREATE_TASK:
      return {
        ...state,
        createTask: action.data,
      };

    case taskConstants.ERROR_CREATE_TASK:
      return {
        ...state,
        createTask: action.data,
      };

    case taskConstants.UPDATE_TASK:
      return {
        ...state,
        createTask: action.data,
      };

    case taskConstants.LOAD_TASK:
      return {
        ...state,
        data: action.data,
      };
    case taskConstants.DELETE_TASK:
      return {
        ...state,
        data: action.data,
      };
    case taskConstants.SUCCESS_LOAD_TASK:
      return {
        ...state,
        data: action.data,
      };
    case taskConstants.ERROR_LOAD_TASK:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
}
