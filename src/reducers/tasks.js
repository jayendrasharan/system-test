/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 9:57 PM
 */
import {TOGGLE_TASK_STATE} from "../actionTypes/tasks";

const INITIAL_STATE = {
    tasks: [
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464b",
            title: "Task 1",
            description: "Nulla eu libero vulputate, condimentum leo nec, eleifend nisl.",
            currentState: true,
            createdOn: "12-04-2020",
            dueDate: "21-04-2020",
            priority: "low"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464c",
            title: "Task 2",
            description: "Praesent efficitur magna in nunc dictum, vel rutrum sapien tincidunt.",
            currentState: false,
            createdOn: "13-04-2020",
            dueDate: "21-04-2020",
            priority: "medium"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464d",
            title: "Task 3",
            description: "Sed et ipsum in ante consequat maximus.",
            currentState: true,
            createdOn: "14-04-2020",
            dueDate: "21-04-2020",
            priority: "high"
        },
        {
            id: "cc10c8c7-86eb-405d-8ac2-9708fa87464e",
            title: "Task 4",
            description: "Integer eget lacus ut sem pellentesque dapibus a non nisi.",
            currentState: true,
            createdOn: "15-04-2020",
            dueDate: "21-04-2020",
            priority: "low"
        },
    ]
}

const tasksReducer = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_TASK_STATE:
            return {
                ...state,
                tasks: [
                    ...action.payload,
                ]
            }
        default:
            return {
                ...INITIAL_STATE,
            };
    }
}

export default tasksReducer;