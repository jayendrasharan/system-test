

const init = (state = {todos: []}, action) =>{
  switch(action.type){
    case 'FETCH_TODOS':
      return {...state, todos: action.payload};
    default:
      return state;
  }
}

export default init;