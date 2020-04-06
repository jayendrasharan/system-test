import { combineReducers } from "redux";
import tasks from "./tasks";
import tabReducers from "./tabReducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  tasks,
  tabReducers
});

export default rootReducer;
