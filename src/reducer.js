import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import taskReducer from './Containers/organisms/TodoWrapper/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    taskState: taskReducer,
  });
