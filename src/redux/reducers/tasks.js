import {ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const INITIAL_STATE = {
    tasks: [
        {
            id: '6086af5b-7e10-4891-809a-55152b85f89f',
            completed: true,
            title: 'Purchase Notebook',
            description: 'notebook for Graphs',
            createdOn: '2020-04-19',
            dueDate: '2020-04-21',
            priority: 'low'
        },
        {
            id: '6086af5b-7e10-4891-809a-55152b85f89e',
            completed: true,
            title: 'Buy groceries',
            description: '3 veggies and milk',
            createdOn: '2020-04-19',
            dueDate: '2020-04-24',
            priority: 'medium'
        },
        {
            id: '6086af5b-7e10-4891-809a-55152b85f89c',
            completed: false,
            title: 'Refill Ink Pen',
            description: 'Get blue ink from desk',
            createdOn: '2020-04-18',
            dueDate: '2020-04-22',
            priority: 'none'
        },
        {
            id: '6086af5b-7e10-4891-809a-55152b85f89a',
            completed: true,
            title: 'Prepare presentation',
            description: 'Fill all the slides with Dog images',
            createdOn: '2020-04-17',
            dueDate: '2020-04-24',
            priority: 'high'
        },
        {
            id: '6086af5b-7e10-4891-809a-55152b85f89d',
            completed: true,
            title: 'Play badminton',
            description: 'Call friends to book slots.',
            createdOn: '2020-04-19',
            dueDate: '2020-04-21',
            priority: 'high'
        }
    ]
}

const tasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TASK_STATE:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload),
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        case EDIT_TASK:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        default:
            return {
                ...state,
            };
    }
}

export default tasksReducer;