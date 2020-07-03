import * as AppActionTypes from "../actionTypes/groupBy";

const INITIAL_STATE = {
  sortKey: null,
  sortOrder: 0,
  groupByKey: "",
};

const groupByReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload.sortOrder,
        sortKey: action.payload.sortKey,
      };
    case AppActionTypes.SET_GROUPBY_KEY:
      return {
        ...state,
        groupByKey: action.payload,
      };
    default:
      return { ...state };
  }
};

export default groupByReducer;
