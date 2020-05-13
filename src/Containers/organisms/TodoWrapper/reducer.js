/* eslint-disable no-unused-vars */
import { todoActions } from './constants';
import { updateObject } from '../../../shared/Utilities/utility';

const initialState = {
  taskList: [],
  isFetching: false,
};

const taskReducer = (state = initialState, action) => {
  const { type, taskId, taskInfo } = action;
  switch (type) {
    case todoActions.addTask: {
      // return Object.assign(...state, { isFetching: true });
      const newTaskList = [...state.taskList];
      newTaskList.push(taskInfo);
      const newState = Object.assign(
        { ...state },
        {
          isFetching: false,
          taskList: newTaskList,
        },
      );
      return newState;
    }
    case todoActions.addTaskSucess: {
      const newTaskList = [...initialState.taskList];
      newTaskList.push(taskId);
      return Object.assign(...state, {
        isFetching: false,
        taskList: newTaskList,
      });
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
      console.log(updatedObject, 'updateObject', 'in reducer');
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
    // case cartActions.incrementQunatity: {
    //   const newProducts = [...state.products];
    //   const index = state.products.findIndex(
    //     item => item.productId === productId
    //   );
    //   const newProduct = { ...newProducts[index] };
    //   newProduct.quantity += 1;
    //   Object.assign(newProducts, { [index]: newProduct });
    //   //   const newArray = Object.assign([...newProducts], { [index]: newProduct });
    //   return Object.assign({}, { ...state }, { products: newProducts });
    //   //   const newProduct = state.products[index];
    //   //   newProduct.quantity += 1;
    //   //   const newState = { ...state };
    //   //   newState.products.splice(index, 1, newProduct);
    //   //   return newState;
    // }
    // case cartActions.decrementQunatity: {
    //   const newProducts = [...state.products];
    //   console.log(newProducts);
    //   const index = state.products.findIndex(
    //     item => item.productId === productId
    //   );
    //   const newProduct = { ...state.products[index] };
    //   if (newProduct.quantity > 0) {
    //     newProduct.quantity -= 1;
    //   }
    //   Object.assign(newProducts, { [index]: newProduct });
    //   return Object.assign({}, state, { products: newProducts });
    // }
    // case cartActions.addInCart: {
    //   const newCartList = [...state.products];
    //   const index = state.products.findIndex(
    //     item => item.productId === productId
    //   );
    //   const cartItem = { ...newCartList[index] };
    //   cartItem.isOrdered = true;
    //   Object.assign(newCartList, { [index]: cartItem });
    //   return Object.assign({}, state, { products: newCartList });
    // }
    default:
      return state;
  }
};

export default taskReducer;
