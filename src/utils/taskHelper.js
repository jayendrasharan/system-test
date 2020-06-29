import { orderBy } from 'lodash';

export const getOrderedTasks = (tasks, sortEle) => {
    return orderBy(tasks, Object.keys(sortEle)[0], Object.values(sortEle)[0]);
}

export const getFilteredTasks = (tasks, deleteTasks) => tasks.filter(t => deleteTasks.findIndex(a => a === t.id) === -1);

export const getUpdatedTasks = (tasks, updatedTasks) => {
    for (let t of updatedTasks) {
        const index = tasks.findIndex(task => task.id === t.id);
        if (index !== -1) {
            tasks[index] = t;
        }
    }
    return tasks;
}