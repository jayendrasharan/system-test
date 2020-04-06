import {
    ADD_TASK,
    OPEN_TASK,
    SHOW_COMPLETED,
    SHOW_PENDING
  } from "../actions/taskTypes";
  
  const initialState = {};
  
  const totalTasksList = [];
  const totalTasksCount = totalTasksList.length;
  initialState.totalTasksCount = 0;
  initialState.totalTasksList = totalTasksList;
  const tasks = (state = { initialState }, actions) => {
    switch (actions.type) {
      case ADD_TASK:
        return {
          ...state,
          taskid: totalTasksCount + 1,
          text: actions.text,
          isCompleted: actions.isCompleted
        };
      case OPEN_TASK:
        return "Open Task";
      //action.taskid
      case SHOW_COMPLETED:
        return "Completed Task";
      //action.taskids.filter(task => (task.isCompleted === true))
      case SHOW_PENDING:
        return actions.taskids.filter(task => task.isCompleted === false);
      default:
        return state;
    }
  };
  
  export default tasks;
  