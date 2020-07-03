import {actionTypes} from '../actions/index.action'

const initialState = {
    todos : [
       
    ]
}

const indexReducer = (state = initialState, actions) => {
switch(actions.type){
    case actionTypes.INDEX_ADD_TODOS_SUCCESS : {
        return {
            todos: [
               
                actions.payload,
                ...state.todos,
                
            ]
        }
    }
    case actionTypes.INDEX_EDIT_TODOS_SUCCESS: {
        const findIndex = state.todos.findIndex(x => x.createdAt == actions.payload.createdAt)
        const todos = [...state.todos]
        todos[findIndex] = actions.payload
        todos[actions.index] = actions.todo
        return {
            todos: todos
        }
    }
    case actionTypes.INDEX_DELETE_TODOS_SUCCESS: {
        const todos = state.todos.filter((x,i) => x.createdAt != actions.payload )
        return {
            todos: todos
        }
    }
    case actionTypes.INDEX_GROUP_DELETE_SUCCESS: {
        // console.log(actions.payload)

            const todos = state.todos.filter((x) => {
                  actions.payload.forEach(element => {
                       return x.createdAt != element
                  });
            })
            //   console.log(todos)
        return {
            todos: todos
        }
    }
    default:
        return state
}
   return state
}

export default indexReducer;