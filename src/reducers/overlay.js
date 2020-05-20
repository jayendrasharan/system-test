const todos = (state = {overlayActive: false, forId: ""}, action) => {
    switch (action.type) {
      case 'TOGGLE_OVERLY':
          console.log("action ", action)
        const newState = {
          ...state,
          ...{
           overlayActive: !state.overlayActive,
           forId: action.id ? action.id.id : ""
          }
        }
        console.log("newwwwwwwww ", newState)
        return newState
      default:
        return state
    }
  }
  
  export default todos
  