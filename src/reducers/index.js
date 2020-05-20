import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import overlayReducer from './overlay'

export default combineReducers({
  todos,
  visibilityFilter,
  overlayReducer
})
