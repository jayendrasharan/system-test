

const combReducer = (state = {todos: [], activeTab: 'all-tasks', alltodos:[]}, action) =>{
  switch(action.type){
    case 'FETCH_TODOS':
      return {...state, todos: action.payload, alltodos: action.payload};
    case 'UPDATE_ACTIVE_TAB':
      const todos = state.alltodos.filter(x=> (action.payload === 'completed' ? x.currentState === false : x.currentState === true ))
      return {...state, activeTab: action.payload, todos: action.payload === 'all-tasks' ? state.alltodos : todos}
    case 'DELETE_TODO':
      return {...state, 
        todos: state.todos.filter(row => row.id !== action.payload.id), 
        alltodos: state.alltodos.filter(row => row.id !== action.payload.id)
      }
    case 'ADD_TODO':
      const todo = {...action.payload, id: state.alltodos.length+1}
      return {...state,
        todos: [...state.todos, todo],
        alltodos: [...state.alltodos, todo]
      }
    case 'UPDATE_TODO':
      return {...state,
        todos: state.todos.reduce((a,c) => {return c.id === action.payload.id ? [...a, action.payload] : [...a, c]},[]),
        alltodos: state.alltodos.reduce((a,c) => {return c.id === action.payload.id ? [...a, action.payload] : [...a, c]},[])
      }

    default:
      return state;
  }
}

export default combReducer;