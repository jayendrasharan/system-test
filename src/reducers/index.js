/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 9:53 PM
 */

import {combineReducers} from "redux";
import appReducer from "./app";
import tasksReducer from './tasks';

export default combineReducers({
    appState: appReducer,
    tasksState: tasksReducer,
})