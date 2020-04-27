import { SET_GROUPBY_KEY, SET_SORT_ORDER } from "../actionTypes/groupBy";

export const setSort = (payload) => ({
  type: SET_SORT_ORDER,
  payload,
});

export const setGroupBy = (payload) => ({
  type: SET_GROUPBY_KEY,
  payload: payload !== "none" ? payload : "",
});
