import { todoActions } from './constants';

export const toggleTaskStatus = taskId => ({
  type: todoActions.toggleTaskStatus,
  taskId,
});
export const completeTaskSucess = taskId => ({
  type: todoActions.completeTaskSucess,
  taskId,
});
export const toggleTaskCheckedStatus = (isChecked, taskId) => ({
  type: todoActions.toggleTaskCheckedStatus,
  taskId,
  isChecked,
});

export const deleteTaskSucess = taskId => ({
  type: todoActions.deleteTaskSucess,
  taskId,
});

export const deleteTask = taskId => ({
  type: todoActions.deleteTask,
  taskId,
});
export const addTask = taskInfo => ({
  type: todoActions.addTask,
  taskInfo,
});

export const editTask = taskInfo => ({
  type: todoActions.editTask,
  taskInfo,
});

export const addTaskSucess = taskId => ({
  type: todoActions.addTaskSucess,
  taskId,
});

export const globalDeleteAction = taskIds => ({
  type: todoActions.globalDeleteAction,
  taskIds,
});
export const globalCompleteAction = taskIds => ({
  type: todoActions.globalCompleteAction,
  taskIds,
});
