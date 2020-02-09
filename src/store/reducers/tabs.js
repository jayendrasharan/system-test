

const tabs = (state = {activeTab: 'all-tasks'}, action) =>{
  switch(action.type){
    case 'UPDATE_ACTIVE_TAB':
      return {...state, activeTab: action.payload}
    default:
      return state
  }
}

export default tabs;