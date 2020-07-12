import { v4 } from "uuid";

export let todos = [
    {
        id: v4(),
        currentState: 0,
        title: "First Todo Task",
        description: "This is the First task",
        createdAt: new Date().toLocaleDateString(),
        dueDate: "2020-07-15",
        priority: 1,
    },
    {
        id: v4(),
        currentState: 1,
        title: "Second Todo Task",
        description: "This is the Second task",
        createdAt: new Date().toLocaleDateString(),
        dueDate: "2020-07-19",
        priority: 3,
    }
]