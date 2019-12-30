import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import AsyncReducer from "./async";
import FormEditReducer from "./formEdit";
import FilterReducer from "./filter";
import SortReducer from "./sort";
import TodoReducer from "./todo";

const reducer = combineReducers({
  todos: TodoReducer,
  formEdit: FormEditReducer,
  filter: FilterReducer,
  sort: SortReducer,
  isFetching: AsyncReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

if (process.env.NODE_ENV === "development") {
  window.store = store;
}

export default store;
