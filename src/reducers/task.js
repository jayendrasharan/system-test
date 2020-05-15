const initialState = {
    tasks: [],
    error: null
}

let taskReducer = (state = initialState, action = null) => {
    switch (action.type) {
        case 'ADD_TASK_SUCCESS':
            return Object.assign({}, state, {
                tasks: [...state.tasks, action.payload],
                error: null
            })
        case 'UPDATE_TASK_SUCCESS':
            const updateItemIndex = state.tasks.findIndex(t => t.id === action.payload.id);
            return Object.assign({}, state, {
                tasks: [
                    ...state.tasks.slice(0, updateItemIndex),
                    action.payload,
                    ...state.tasks.slice(updateItemIndex + 1)
                ],
                error: null
            })
        case 'DELETE_TASK_SUCCESS':
            const deleteItemIndex = state.tasks.findIndex(t => t.id === action.id);
            return Object.assign({}, state, {
                tasks: [
                    ...state.tasks.slice(0, deleteItemIndex),
                    ...state.tasks.slice(deleteItemIndex + 1)
                ],
                error: null
            })
        case 'ADD_TASK_FAILURE':
            return Object.assign({}, state, {
                error: action.payload
            })
        case 'UPDATE_TASK_FAILURE':
            return Object.assign({}, state, {
                error: action.payload
            })
        case 'DELETE_TASK_FAILURE':
            return Object.assign({}, state, {
                error: action.payload
            })
        default:
            return state
    }
};

export default taskReducer
