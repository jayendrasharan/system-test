
const cancelReducer = (state, action) => {
    switch(action.type){
        case "TODO_DETAILS_CANCEL":
        return{
            ...state.todoDetails,
            rowId : 1,
            summary : '',
            description:'',
            priority: '',
            dueDate:'',
            createdOn:'',
            todoStateCompleted : false
        }
        default:
            return state.cancelDetails
    }
}

export default cancelReducer;