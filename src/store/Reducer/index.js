import { FETCH_TODOS, UPDATE_ACTIVE_TAB, DELETE_TODO, ADD_TODO, UPDATE_TODO, BULK_DONE, BULK_PENDING, GLOBAL_SEARCH } from "../Constant";

export const initialState = {
    todos: [],
    activeTab: 'all-tasks',
    alltodos: []
}

export const rootReducer = (state = initialState, action) =>{
    let ids;
    switch(action.type){
      case FETCH_TODOS:
        return {...state, todos: action.payload, alltodos: action.payload};
        case ADD_TODO:
          const todo = {...action.payload, id: state.alltodos.length+1}
          return {...state,
            todos: [...state.todos, todo],
            alltodos: [...state.alltodos, todo]
          }
        case UPDATE_TODO:
          return {...state,
            todos: state.todos.reduce((a,c) => {return c.id === action.payload.id ? [...a, action.payload] : [...a, c]},[]),
            alltodos: state.alltodos.reduce((a,c) => {return c.id === action.payload.id ? [...a, action.payload] : [...a, c]},[])
          }
      case UPDATE_ACTIVE_TAB:
        const todos = state.alltodos.filter(x=> (action.payload === 'completed' ? x.currentState === false : x.currentState === true ))
        return {...state, activeTab: action.payload, todos: action.payload === 'all-tasks' ? state.alltodos : todos}
      case DELETE_TODO:
        ids = action.payload.map(x=>x.id)
        return {...state, 
          todos: state.todos.filter(row => !ids.includes(row.id)), 
          alltodos: state.alltodos.filter(row => !ids.includes(row.id))
        }
      case BULK_DONE:
        ids = action.payload.map(x=>x.id);
        return {...state,
          todos: state.todos.map(x => {return ids.includes(x.id) ? {...x, currentState: false} : {...x}}),
          alltodos: state.alltodos.map(x => {return ids.includes(x.id) ? {...x, currentState: false} : {...x}})
        }
      case BULK_PENDING:
        ids = action.payload.map(x=>x.id);
        return {...state,
          todos: state.todos.map(x => {return ids.includes(x.id) ? {...x, currentState: true} : {...x}}),
          alltodos: state.alltodos.map(x => {return ids.includes(x.id) ? {...x, currentState: true} : {...x}}),
        }
      case GLOBAL_SEARCH:
        return {...state,
          todos: state.alltodos.filter(x=> {return x.title && x.title.toLowerCase().includes(action.payload.search) || x.title.toLowerCase().includes(action.payload.search)})
        }
      default:
        return state;
    }
  }

