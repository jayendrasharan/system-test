import { combineReducers } from 'redux';

import { TasksReducer } from '../tasks';

export const makeRootReducer = () => {
  return combineReducers({
    tasks: TasksReducer,
  });
};

export default makeRootReducer
