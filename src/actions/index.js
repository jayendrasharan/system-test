import {
  ADD_TASK,
  SHOW_ALLTASKS,
  SHOW_COMPLETED,
  SHOW_PENDING
} from "./taskTypes";

export const addTaskAction = formfields => ({
  type: ADD_TASK,
  formfields
});
export const ShowAllTasksAction = taskids => ({
  type: SHOW_ALLTASKS,
  taskids
});
export const ShowCompletedTasksAction = taskids => ({
  type: SHOW_COMPLETED,
  taskids
});
export const ShowPendingTasksAction = taskids => ({
  type: SHOW_PENDING,
  taskids
});
