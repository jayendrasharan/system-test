

const combReducer = (state = {todos: [], activeTab: 'all-tasks', alltodos:[]}, action) =>{
  switch(action.type){
    case 'FETCH_TODOS':
      return {...state, todos: action.payload, alltodos: action.payload};
      case 'UPDATE_ACTIVE_TAB':
        const todos = state.alltodos.filter(x=> (action.payload === 'completed' ? x.currentState === false : x.currentState === true ))
        return {...state, activeTab: action.payload, todos: action.payload === 'all-tasks' ? state.alltodos : todos}
      case 'DELETE_ROW':
        const alltodos1 = state.alltodos.filter(row => row.id !== action.payload.id);
        const todos1 = state.todos.filter(row => row.id !== action.payload.id);
        return {...state, todos: todos1, alltodos: alltodos1}
    default:
      return state;
  }
}

export default combReducer;