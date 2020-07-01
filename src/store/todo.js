import dummyData from "../dummy/data";
import { apiCallStarted, apiCallCompleted } from "./async";

const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const MARK_DONE = "MARK_DONE";
const RE_OPEN = "RE_OPEN";

const initialState = dummyData;

const asyncImitator = (dispatch, action) => {
  dispatch(apiCallStarted());
  setTimeout(() => {
    dispatch(action);
    dispatch(apiCallCompleted());
  }, 500);
};

export const addTodo = data => {
  return (dispatch, getState) => {
    const { isFetching } = getState();
    if (!isFetching) {
      asyncImitator(dispatch, { type: ADD_TODO, payload: data });
    }
  };
};

export const editTodo = data => {
  return (dispatch, getState) => {
    const { isFetching } = getState();
    if (!isFetching) {
      asyncImitator(dispatch, { type: EDIT_TODO, payload: data });
    }
  };
};

export const markDone = id => {
  return (dispatch, getState) => {
    const { isFetching } = getState();
    if (!isFetching) {
      asyncImitator(dispatch, { type: MARK_DONE, payload: id });
    }
  };
};

export const reOpenTodo = id => {
  return (dispatch, getState) => {
    const { isFetching } = getState();
    if (!isFetching) {
      asyncImitator(dispatch, { type: RE_OPEN, payload: id });
    }
  };
};

export const deleteTodo = id => {
  return (dispatch, getState) => {
    const { isFetching } = getState();
    if (!isFetching) {
      asyncImitator(dispatch, { type: DELETE_TODO, payload: id });
    }
  };
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);

    case RE_OPEN:
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, currentState: false };
        }
        return todo;
      });
    case MARK_DONE:
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, currentState: true };
        }
        return todo;
      });
    case EDIT_TODO:
      const t = state.findIndex(post => post.id === action.payload.id);
      if (JSON.stringify(action.payload) === JSON.stringify(state[t]))
        return state;
      const newState = [...state];
      newState[t] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default TodoReducer;
