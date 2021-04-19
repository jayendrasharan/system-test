import { v4 as uuidv4 } from 'uuid';

const Todo = () => ({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    currentState: true,
    createdAt: new Date()
})

const intialState = {
    isLoading: false,
    searchKeyword: '',
    groupBy: '',
    tasks: [],
    modal: {
        isOpen: false,
        isReadOnly: false,
        isEdit: false,
        isDeleteModal: false,
        title: '',
        todo: null
    }       
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'LOADER': 
            return {
                ...state,
                isLoading: true
            }
        case "ADD_TODO":
            let todo = { ...action.payload, createdAt: new Date(), id: uuidv4() }
            console.log(todo)
            return { 
                ...state, 
                isLoading: false,
                tasks: [ ...state.tasks, todo ],
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen,                    
                }
            }

        case "EDIT_TODO":
            let updatedTodo = { ...action.payload, createdAt: new Date() }
            let tasks = state.tasks.map((task)=>{
                if(task.id === updatedTodo.id) {
                    return updatedTodo;
                } else {
                    return task;
                }
            })
            return { 
                ...state, 
                tasks: tasks,
                isLoading: false,
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen,
                }
            }
        
        case "DELETE_TODO":
            return { 
                ...state, 
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen,
                    isReadOnly: true,
                    isDeleteModal: true,
                    title: 'Do you want to delete this task?',
                    todo: { ...action.payload }
                }
            }
        case "CONFIRM_DELETE_TODO":
            return { 
                ...state, 
                tasks: state.tasks.filter((task)=>{
                    if(task.id !== action.payload.id) {
                        return true;
                    }
                }),
                modal: {
                    ...state.modal,
                    isDeleteModal: false
                }
            }
        case "TOGGLE_MODAL": {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen
                }
            }
        }
        case "VIEW_TODO_MODAL": {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isReadOnly: true,
                    title: 'View Todo',
                    todo: { ...action.payload },
                    isOpen: !state.modal.isOpen
                }
            }
        }
        case "ADD_TODO_MODAL": {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isReadOnly: false,
                    isEdit: false,
                    title: 'Add Todo',
                    todo: { ...Todo() },
                    isOpen: !state.modal.isOpen
                }
            }
        }
        case "EDIT_TODO_MODAL": {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isReadOnly: false,
                    isEdit: true,
                    title: 'Edit Todo',
                    todo: { ...action.payload },
                    isOpen: !state.modal.isOpen
                }
            }
        }
        case "TOGGLE_TODO_STATUS": {
            return {
                ...state,
                tasks: state.tasks.map((task)=>{
                    if(task.id === action.payload.id) {
                        return { ...task, currentState: !task.currentState };
                    } else {
                        return task;
                    }
                }) 
            }
        }
        case "TODO_SEARCH": {
            return {
                ...state,
                searchKeyword: action.payload
            }
        }
        case "TODO_GROUPS": {
            return {
                ...state,
                groupBy: action.payload
            }
        }
        default:
            return state;
    }
}
 
export default reducer;