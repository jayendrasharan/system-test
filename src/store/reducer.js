import { combineReducers } from 'redux';
import todoReducer from '../Modules/ToDoContainer/data/reducer';;


export default combineReducers({
    'TODO': todoReducer,
});
