export const groupByFields = [{
    value: 'none',
    label: 'None'
}, {
    value: 'createdOn',
    label: 'Created On'
}, {
    value: "dueDate",
    label: 'Due Date'
}, {
    value: "priority",
    label: 'Priority'
}];

export const priorities = [{
    value: 'none',
    label: 'None'
},{
    value: 'low',
    label: "Low"
}, {
    value: "medium",
    label: "Medium"
}, {
    value: "high",
    label: "High"
}];

export const searchableFields = ["summary", "description"];
export const sortableFields = ["summary", "priority", "dueDate", "createdOn"];
export const gridColumns = [
    { title: 'Id', field: 'id', hidden: true },
    { title: 'Summary', field: 'summary', sorting: sortableFields.includes('summary') ? true : false },
    { title: 'Priority', field: 'priority', sorting: sortableFields.includes('priority') ? true : false },
    { title: 'Created On', field: 'createdOn', type: 'datetime', sorting: sortableFields.includes('createdOn') ? true : false },
    {
        title: 'Due Date',
        field: 'dueDate',
        type: 'datetime',
        sorting: sortableFields.includes('dueDate') ? true : false
    }
]