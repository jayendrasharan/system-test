import {
  fetchAllTodoList,
  fetchCompletedTodoList,
  fetchPendingTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
  markTodoItemOpen,
  markTodoItemComplete,
} from "../mockApi/api";
import {
  FETCH_ALL_TODO_LIST,
  SHOW_ERROR,
  FETCH_COMPLETED_TODO_LIST,
  FETCH_OPEN_TODO_LIST,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MARK_TODO_OPEN,
  MARK_TODO_COMPLETE,
  SHOW_SPINNER,
  SORT_ACTION,
  SELECT_ACTION,
  SELECT_ALL_ACTION,
  HIDE_SPINNER,
} from "./actionTypes";

const handleError = (err, dispatch) => {
  dispatch({
    type: SHOW_ERROR,
    payload: err.msg,
  });
  dispatch(hideSpinner());
};

const showSpinner = (dispatch) => {
  dispatch({
    type: SHOW_SPINNER,
  });
};

const hideSpinner = () => {
  return {
    type: HIDE_SPINNER,
  };
};

export const sortByColumn = (column) => {
  return {
    type: SORT_ACTION,
    payload: column,
  };
};

export const selectTodoItem = (todo) => {
  return {
    type: SELECT_ACTION,
    payload: todo,
  };
};

export const selectAllTodoItems = () => {
  return {
    type: SELECT_ALL_ACTION,
  };
};

export const loadTodoItems = () => {
  return (dispatch) => {
    showSpinner(dispatch);
    fetchAllTodoList()
      .then((res) => {
        dispatch({
          type: FETCH_ALL_TODO_LIST,
          payload: res,
        });
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const loadCompletedTodoItems = () => {
  return (dispatch) => {
    showSpinner(dispatch);
    fetchCompletedTodoList()
      .then((res) => {
        dispatch({
          type: FETCH_COMPLETED_TODO_LIST,
          payload: res,
        });
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const loadOpenTodoItems = () => {
  return (dispatch) => {
    showSpinner(dispatch);
    fetchPendingTodoList()
      .then((res) => {
        dispatch({
          type: FETCH_OPEN_TODO_LIST,
          payload: res,
        });
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const addTodo = (todo, callback) => {
  return (dispatch) => {
    showSpinner(dispatch);
    addTodoItem(todo)
      .then((res) => {
        callback(res);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const updateTodo = (todo, callback) => {
  return (dispatch) => {
    showSpinner(dispatch);
    updateTodoItem(todo)
      .then((res) => {
        /*dispatch({
          type: UPDATE_TODO,
          payload: res,
        });*/
        callback(res);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const deleteTodo = (id, callback) => {
  return (dispatch) => {
    showSpinner(dispatch);
    deleteTodoItem(id)
      .then((res) => {
        /*dispatch({
          type: DELETE_TODO,
          payload: res,
        });*/
        callback(res);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const markTodoOpen = (id, callback) => {
  return (dispatch) => {
    showSpinner(dispatch);
    markTodoItemOpen(id)
      .then((res) => {
        /*dispatch({
          type: MARK_TODO_OPEN,
          payload: res,
        });*/
        callback(res);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};

export const markTodoCompleted = (id, callback) => {
  return (dispatch) => {
    showSpinner(dispatch);
    markTodoItemComplete(id)
      .then((res) => {
        /*dispatch({
          type: MARK_TODO_COMPLETE,
          payload: res,
        });*/
        callback(res);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
};
