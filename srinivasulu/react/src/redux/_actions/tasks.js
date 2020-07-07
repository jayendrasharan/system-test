import { taskConstants } from "../_constants";

export function addNewTask(data) {
  return { type: taskConstants.CREATE_TASK, data };
}

export function updatTask(data) {
  return { type: taskConstants.UPDATE_TASK, data };
}

export function newTaskSuccess(data) {
  return { type: taskConstants.SUCCESS_CREATE_TASK, data };
}

export function newTaskError(data) {
  return { type: taskConstants.ERROR_CREATE_TASK, data };
}
export function getAllTasks(data = "") {
  return { type: taskConstants.LOAD_TASK, data };
}

export function deleteTasks(data) {
  return { type: taskConstants.DELETE_TASK, data };
}
export function getAllTasksSuccess(data) {
  return { type: taskConstants.SUCCESS_LOAD_TASK, data };
}

export function getAllTasksError() {
  return { type: taskConstants.ERROR_LOAD_TASK };
}
