
const Todo = () => ({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    currentState: 'open',
    createdAt: new Date()
})

const intialState = {
    tasks: [{
        id: 1,
        title: 'Interview',
        description: 'React Interview',
        dueDate: '2020-10-10',
        priority: 'Low',
        currentState: 'open',
        createdAt: new Date()
    }],
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
        case "ADD_TODO":
            let length = state.tasks.length-1;
            let lastId = length>0 ? state.tasks[length].id : 1;
            let id = isNaN(lastId) ? 1 : lastId+1;
            let todo = { ...action.payload, createdAt: new Date(), id: id }
            return { 
                ...state, 
                tasks: [ ...state.tasks, todo ],
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen
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
                modal: {
                    ...state.modal,
                    isOpen: !state.modal.isOpen
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
                        return { ...task, currentState: task.currentState === 'open' ? 're-open' : 'open' };
                    } else {
                        return task;
                    }
                }) 
            }
        }
        default:
            return state;
    }
}
 
export default reducer;