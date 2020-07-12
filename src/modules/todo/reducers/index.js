import modalStore from '../../shared/reducers/modalStore'
import { combineReducers } from 'redux';
import tasksState from './tasks'
import filter from './taskFilter'
import search from './search'
import groupBy from './groupBy'
import loader from './../../shared/reducers/loader';

export default combineReducers({modalStore, tasksState, filter, search, groupBy, loader});