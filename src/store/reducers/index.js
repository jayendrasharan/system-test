import { combineReducers } from 'redux';

import init from './init';
import tabs from './tabs';
import row from './row';

export default combineReducers({
  init,
  tabs,
  row
});