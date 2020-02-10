const SHOW_ALL = "SHOW_ALL";
const SHOW_PENDING = "SHOW_PENDING";
const SHOW_COMPLETED = "SHOW_COMPLETED";

export const showAll = () => {
  return {
    type: SHOW_ALL
  };
};

export const showPending = () => {
  return {
    type: SHOW_PENDING
  };
};

export const showCompleted = () => {
  return {
    type: SHOW_COMPLETED
  };
};

const FilterReducer = (
  state = {
    showAll: true,
    showPending: false,
    showCompleted: false
  },
  action
) => {
  switch (action.type) {
    case SHOW_ALL:
      return { showAll: true, showPending: false, showCompleted: false };
    case SHOW_PENDING:
      return { showAll: false, showPending: true, showCompleted: false };
    case SHOW_COMPLETED:
      return { showAll: false, showPending: false, showCompleted: true };
    default:
      return state;
  }
};

export default FilterReducer;
