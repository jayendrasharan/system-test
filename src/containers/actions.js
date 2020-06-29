export const addTaskAction = (payload, toggleModal) => (dispatch) => {
  dispatch({ type: "ADDING_TASK" });
  setTimeout(() => {
    toggleModal();
    dispatch({
      type: "ADDED_TASK",
      payload: {
        ...payload,
        _id: new Date().getTime(),
        currentState: true,
        createdAt: new Date().getTime(),
      },
    });
  }, 1000);
};

export const editTaskAction = (payload) => (dispatch) => {
  dispatch({ type: "EDITING_TASK" });
  setTimeout(() => {
    dispatch({
      type: "EDITED_TASK",
      payload: payload,
    });
  }, 0);
};

export const deleteTaskAction = (payload) => (dispatch) => {
  dispatch({ type: "DELETING_TASK" });
  setTimeout(() => {
    dispatch({
      type: "DELETED_TASK",
      payload: payload,
    });
  }, 0);
};

export const closeTaskAction = (payload) => (dispatch) => {
  dispatch({ type: "CLOSING_TASK" });
  setTimeout(() => {
    dispatch({
      type: "CLOSED_TASK",
      payload: payload,
    });
  }, 0);
};

export const handleGlobalSearch = (payload) => (dispatch) => {
  dispatch({ type: "SEARCH_KEY_CHANGE", payload });
};

export const updateTabState = (payload) => (dispatch) => {
  dispatch({ type: "UPDATE_TAB_STATE", payload });
};

export const toggleEditAction = (payload) => (dispatch) => {
  dispatch({ type: "TOGGLE_EDIT", payload });
};
