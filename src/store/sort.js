const SORT_BY_SUMMARY = "SORT_BY_SUMMARY";
const SORT_BY_PRIORITY = "SORT_BY_PRIORITY ";
const SORT_BY_CREATED_ON = "SORT_BY_CREATED_ON";
const SORT_BY_DUE_DATE = "SORT_BY_DUE_DATE";
const SORT_BY_ACTIONS = "SORT_BY_ACTIONS";

export const sortBySummary = () => {
  return {
    type: SORT_BY_SUMMARY
  };
};

export const sortByPriority = () => {
  return {
    type: SORT_BY_PRIORITY
  };
};

export const sortByCreatedOn = () => {
  return {
    type: SORT_BY_CREATED_ON
  };
};

export const sortByDueDate = () => {
  return {
    type: SORT_BY_DUE_DATE
  };
};

export const sortByActions = () => {
  return {
    type: SORT_BY_ACTIONS
  };
};

const SortReducer = (
  state = {
    sortBy: null,
    type: null
  },
  action
) => {
  switch (action.type) {
    case SORT_BY_SUMMARY:
      if (state.sortBy === "title") {
        return { sortBy: "title", type: !state.type };
      } else return { sortBy: "title", type: true };
    case SORT_BY_PRIORITY:
      if (state.sortBy === "priority") {
        return { sortBy: "priority", type: !state.type };
      } else return { sortBy: "priority", type: true };
    case SORT_BY_CREATED_ON:
      if (state.sortBy === "created_on") {
        return { sortBy: "created_on", type: !state.type };
      } else return { sortBy: "created_on", type: true };
    case SORT_BY_DUE_DATE:
      if (state.sortBy === "due_date") {
        return { sortBy: "due_date", type: !state.type };
      } else return { sortBy: "due_date", type: true };
    case SORT_BY_ACTIONS:
      if (state.sortBy === "actions") {
        return { sortBy: "actions", type: !state.type };
      } else return { sortBy: "actions", type: true };

    default:
      return state;
  }
};

export default SortReducer;
