export const routes = [
    {
        title: "All Tasks",
        url: "all",
    },
    {
        title: "Completed Tasks",
        url: "completed",
    },
    {
        title: "Pending Tasks",
        url: "pending",
    },
]

export const CurrentStates = [
    {
        label: "Pending",
        url: "pending",
        value: 0
    },
    {
        label: "Completed",
        url: "completed",
        value: 1
    }
]

export const fields = [
    {
        label: "Summary",
        value: "title",
        sortby: true,
        groupby: false,
        searchby: true,
        view: true,
    },
    {
        label: "Priority",
        value: "priority",
        sortby: true,
        groupby: true,
        searchby: false,
        view: true,
    },
    {
        label: "Created On",
        value: "createdAt",
        sortby: true,
        groupby: true,
        searchby: false,
        view: true,
    },
    {
        label: "Due Date",
        value: "dueDate",
        sortby: true,
        groupby: true,
        searchby: false,
        view: true,
    },
    {
        label: "Current State",
        value: "currentState",
        sortby: true,
        groupby: false,
        searchby: false,
        view: false,
    },
    {
        label: "Description",
        value: "description",
        sortby: false,
        groupby: false,
        searchby: true,
        view: false,
    },
    {
        label: "Actions",
        value: "",
        sortby: false,
        groupby: false,
        searchby: false,
        view: true,
    }
];

export const Priorities = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "High",
}

export const CrudActions = {
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
    Check: "Check",
}

export const priorityOptions = [
    {
        label: "None",
        value: 0,
    },
    {
        label: "Low",
        value: 1,
    },
    {
        label: "Medium",
        value: 2,
    },
    {
        label: "High",
        value: 3,
    },
];

