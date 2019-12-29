import dummyData from "../dummy/data";

const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const MARK_DONE = "MARK_DONE";
const RE_OPEN = "RE_OPEN";

const initialState = dummyData;

export const addTodo = data => {
  return {
    type: ADD_TODO,
    payload: data
  };
};

export const markDone = id => {
  return {
    type: MARK_DONE,
    payload: id
  };
};

export const reOpenTodo = id => {
  return {
    type: RE_OPEN,
    payload: id
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    payload: id
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
      return state;

    default:
      return state;
  }
};

export default TodoReducer;
