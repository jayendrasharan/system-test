const dateFormatter =  (date)=>{
    if(date){
        return new Date(date).toLocaleDateString();
    }
    return date;
}

export const fomatters = {
    createdAt: dateFormatter,
    dueDate: dateFormatter
}

export const toDoListColumns = [{
    label: 'Title',
    field: 'title',
    show: true,
    sort: true,
    allowSearch: true
}, {
    label: 'Description',
    field: 'desc',
    show: true,
    allowSearch: true
}, {
    label: 'Created Date',
    field: 'createdAt',
    show: true,
    sort: true,
    groupBy: true,
    format: fomatters.dateFormatter
}, {
    label: 'Due Date',
    field: 'dueDate',
    show: true,
    sort: true,
    groupBy: true,
    format: fomatters.dateFormatter
}, {
    label: 'Priority',
    field: 'priority',
    show: true,
    sort: true,
    groupBy: true
}, {
    label: 'Actions',
    show: true
}]

export const listFilters = [{
    value: 'ALL',
    label: 'All Tasks'
},{
    value: 'PENDING',
    label: 'Pending'
},{
    value: 'COMPLETED',
    label: 'Completed'
}]


