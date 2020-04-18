/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 9:57 PM
 */
import {ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const INITIAL_STATE = {
    tasks: [
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464b",
            title: "Lorem Ipsum task",
            description: "Nulla eu libero vulputate, condimentum leo nec, eleifend nisl.",
            currentState: true,
            createdOn: "12-04-2020",
            dueDate: "21-04-2020",
            priority: "none"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464c",
            title: "Bla Bla Task",
            description: "Praesent efficitur magna in nunc dictum, vel rutrum sapien tincidunt.",
            currentState: false,
            createdOn: "13-04-2020",
            dueDate: "17-04-2020",
            priority: "medium"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464d",
            title: "Zen task",
            description: "Sed et ipsum in ante consequat maximus.",
            currentState: true,
            createdOn: "14-04-2020",
            dueDate: "18-04-2020",
            priority: "high"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464e",
            title: "Some other task",
            description: "Integer eget lacus ut sem pellentesque dapibus a non nisi.",
            currentState: true,
            createdOn: "15-04-2020",
            dueDate: "16-04-2020",
            priority: "low"
        },
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