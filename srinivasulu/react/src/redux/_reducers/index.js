import { combineReducers } from "redux";

import { task } from "./tasks";

const rootReducer = combineReducers({
  task,
});

export default rootReducer;
