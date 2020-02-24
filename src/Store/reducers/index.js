import { combineReducers } from 'redux'
import crud from './crud'
import sort from './sort'
import search from './search'
import popup from './popup'


const reducers = combineReducers({
    crud,
    sort,
    search,
    popup
})

export default reducers
