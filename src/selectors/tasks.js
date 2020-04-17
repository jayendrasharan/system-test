/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:26 PM
 */
import {createSelector} from "reselect";

const getTodos = (state) => state.tasksState.tasks;
const getSortOrder = (state) => state.appState.sortOrder
const getSortKey = (state) => state.appState.sortKey

const makeAllTasks = () => {
    return createSelector(
        [getTodos, getSortOrder, getSortKey],
        (tasks, sortOrder, sortKey) => {
            if (sortOrder && sortKey) {
                switch (sortOrder) {
                    // Handle Sort order "Ascending"
                    case 1:
                        return tasks.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
                    // Handle Sort order "Descending"
                    case -1:
                        return tasks.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
                    // Default Sort
                    default:
                        return tasks
                }
            }
            return tasks || [];
        }
    )
}

const getPendingTasks = (tasks) => tasks.filter(task => task && task.currentState);

const getCompletedTasks = (tasks) => tasks.filter(task => task && !task.currentState);

const getTasksByGroup = (tasks) => {
    // const allTasks = state.tasksState.tasks;
    return tasks;
}

export {
    makeAllTasks,
    getPendingTasks,
    getCompletedTasks,
    getTasksByGroup,
}