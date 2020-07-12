
export const addTask = (task) => ({
    type: 'ADD_TASK',
    task: {...task, status: 'PENDING', id: Date.now(), createdAt: (new Date().toString())}
})

export const deleteTask = (taskid) => ({
    type: 'DELETE_TASK',
    id: taskid
})

export const completeTask = (taskid) => ({
    type: 'COMPLETE_TASK',
    id: taskid
})

export const sortTasks = (field, sort) => ({
    type: 'SORT_TASK',
    sort,
    field
})

export const searchTask = (searchText) =>({
    type: 'SEARCH',
    searchText
})

export const groupTask = (groupBy) =>({
    type: 'GROUP_BY',
    groupBy
})


export const markTaskDone = (taskid) => ({
    type: 'TASK_DONE',
    id: taskid
})

export const reopenTask = (taskid) => ({
    type: 'REOPEN_TASK',
    id: taskid
})

export const updateTask = (taskid, task) => ({
    type: 'UPDATE_TASK',
    id: taskid,
    task
})

export const filterTasks = (type) => ({
    type
})