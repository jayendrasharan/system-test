import { combineReducers } from "redux";
import groupByReducer from "./groupBy";
import tasksReducer from "./tasks";

export default combineReducers({
  groupByState: groupByReducer,
  tasksState: tasksReducer,
});
