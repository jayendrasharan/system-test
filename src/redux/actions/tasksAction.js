import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  TOGGLE_TASK_STATE,
} from "../actionTypes/tasks";
import { getTodos } from "../selectors/tasks";

const buildTaskItem = (body) => {
  const { title, description, dueDate, priority } = body;
  return {
    id: uuidv4(),
    completed: true,
    title,
    description,
    createdOn: moment().toDate().toISOString().slice(0, 10),
    dueDate: moment(dueDate).toDate().toISOString().slice(0, 10),
    priority,
  };
};

const addTask = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK,
      payload: buildTaskItem(payload),
    });
  };
};

const editTask = (taskId, payload) => {
  return (dispatch, getState) => {
    let allTasks = [...getTodos(getState())];
    let updatedTasksList = allTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...payload,
          dueDate: moment(payload.dueDate).toDate().toISOString().slice(0, 10),
        };
      }
      return task;
    });

    dispatch({
      type: EDIT_TASK,
      payload: updatedTasksList,
    });
  };
};

const deleteTask = (taskId) => {
  return (dispatch, getState) => {
    let allTasks = [...getTodos(getState())];
    let taskIndex = allTasks.forEach((task, index) => {
      if (task.id === taskId) return index;
    });

    if (taskIndex) {
      allTasks = [
        ...allTasks.slice(0, taskIndex),
        ...allTasks.slice(taskIndex + 1, allTasks.length),
      ];
    }
    dispatch({
      type: DELETE_TASK,
      payload: allTasks.filter((task) => task.id !== taskId),
    });
  };
};

const toggleTaskStatus = (taskIds) => {
  return (dispatch, getState) => {
    let allTasks = [...getTodos(getState())].map((task) =>
      !taskIds.includes(task.id)
        ? task
        : {
            ...task,
            completed: !task.completed,
          }
    );
    return dispatch({
      type: TOGGLE_TASK_STATE,
      payload: allTasks,
    });
  };
};

export { addTask, deleteTask, editTask, toggleTaskStatus };
