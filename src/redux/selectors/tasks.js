import { createSelector } from "reselect";

const getTodos = (state) => state.tasksState.tasks;
const getSortOrder = (state) => state.groupByState.sortOrder;
const getSortKey = (state) => state.groupByState.sortKey;

const getFormattedTodos = createSelector(
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
          return tasks.sort((a, b) =>
            a["createdOn"].localeCompare(b["createdOn"])
          );
      }
    }
    return tasks || [];
  }
);

const getPendingTasks = (tasks) =>
  tasks.filter((task) => task && task.completed);

const getCompletedTasks = (tasks) =>
  tasks.filter((task) => task && !task.completed);

export {
  getFormattedTodos,
  getPendingTasks,
  getCompletedTasks,
  getTodos,
};
