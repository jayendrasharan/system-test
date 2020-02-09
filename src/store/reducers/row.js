

const row = (state = {}, action) =>{
  switch(action.type){
    case 'DELETE_ROW':
      //return state.init.todos.filter(todo => todo.id !== action.payoad.id);
      return state
    default:
      return state
  }
}

export default row;