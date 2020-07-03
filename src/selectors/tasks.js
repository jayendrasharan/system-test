/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:26 PM
 */
import {createSelector} from "reselect";

const getTodos = (state) => state.tasksState.tasks;
const getSortOrder = (state) => state.appState.sortOrder;
const getSortKey = (state) => state.appState.sortKey;

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
                        return tasks.sort((a, b) => a["createdOn"].localeCompare(b["createdOn"]));
                }
            }
            return tasks || [];
        }
    )
}

const getPendingTasks = (tasks) => tasks.filter(task => task && task.currentState);

const getCompletedTasks = (tasks) => tasks.filter(task => task && !task.currentState);

const getTasksByGroup = (tasks, groupByKey) => {
    const groupedTasks = tasks.reduce((result, item) => {
        (result[item[groupByKey]] = result[item[groupByKey]] || []).push(item)
        return result
    }, {})
    return groupedTasks;
}

export {
    makeAllTasks,
    getPendingTasks,
    getCompletedTasks,
    getTasksByGroup,
    getTodos,
}