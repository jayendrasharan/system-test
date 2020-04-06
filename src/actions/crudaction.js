import { OPEN_TASK, EDIT_TASK, DELETE_TASK, CLOSE_TASK } from "./taskTypes.js";

export const openTaskAction = taskid => ({
  type: OPEN_TASK,
  taskid
});
export const editTaskAction = taskid => ({
  type: EDIT_TASK,
  taskid
});
export const deleteTasksAction = taskid => ({
  type: DELETE_TASK,
  taskid
});
export const closeTasksAction = taskid => ({
  type: CLOSE_TASK,
  taskid
});
