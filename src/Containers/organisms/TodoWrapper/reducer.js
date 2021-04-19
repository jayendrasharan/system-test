/* eslint-disable no-unused-vars */
import { todoActions } from './constants';
import { updateObject } from '../../../shared/Utilities/utility';

const initialState = {
  taskList: [],
  isFetching: false,
};

const taskReducer = (state = initialState, action) => {
  const { type, taskId, taskInfo,taskIds,isChecked } = action;
  switch (type) {
    case todoActions.addTask: {
      return updateObject(state,{isFetching: true});
      // const newTaskList = [...state.taskList];
      // newTaskList.unshift(taskInfo);
      // return updateObject(state, { taskList: newTaskList });
    }
    case todoActions.addTaskSucess: {
     const newTaskList = [...state.taskList];
     newTaskList.push(taskInfo);
     console.log(newTaskList,'newTaskkust',taskInfo);
     return updateObject(state, { taskList: newTaskList,isFetching:false });
    }
    case todoActions.editTask: {
      const index = state.taskList.findIndex(
        task => task.currentDate === taskInfo.currentDate,
      );
      const newTask = updateObject(state.taskList[index], taskInfo);
      const newTaskList = Object.assign([...state.taskList], {
        [index]: newTask,
      });
      const updatedObject = updateObject(state, { taskList: newTaskList });
      return updatedObject;
    }
    case todoActions.toggleTaskStatus: {
      const index = state.taskList.findIndex(
        task => task.currentDate === taskId,
      );
      const newTask = updateObject({}, state.taskList[index]);
      newTask.isCompleted = !newTask.isCompleted;
      const newTaskList = Object.assign([...state.taskList], {
        [index]: newTask,
      });
      return updateObject(state, { taskList: newTaskList });
    }
    case todoActions.deleteTask: {
      const index = state.taskList.findIndex(
        task => task.currentDate === taskId,
      );
      const newTaskList = [...state.taskList];
      newTaskList.splice(index, 1);
      return updateObject(state, { taskList: newTaskList });
    }
    case todoActions.globalCompleteAction: {
      const newTaskList = state.taskList.map(item => {
        if (taskIds.includes(item.currentDate)) {
          return updateObject(item, { isCompleted: true });
        }
        return item;
      });
      return updateObject(state, { taskList: newTaskList });
    }
    case todoActions.globalDeleteAction: {
      const newTaskList = state.taskList.filter(item => !taskIds.includes(item.currentDate));
      return updateObject(state,{taskList:newTaskList});
    }
    case todoActions.toggleTaskCheckedStatus : {
      const index = state.taskList.findIndex(
        task => task.currentDate === taskId,
      );
      const newTask = updateObject(state.taskList[index], {isChecked});
      const newTaskList = Object.assign([...state.taskList], {[index]: newTask});
      return updateObject(state,{taskList:newTaskList});
    }
    default:
      return state;
  }
};

export default taskReducer;
