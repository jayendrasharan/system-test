import { todoDetailsReducer, deleteTodoReducer, completeTodoReducer, editTodoReducer, showProgressBarReducer, editTodoDetailsReducer } from './todoDetailsReducer';
import todoDetailsArrayReducer from './todoDetailsReducer'
import cancelReducer from './cancelReducer';
import { act } from '@testing-library/react';

const rootReducer = ({ todoDetails, todoDetailsArray, deletedItems, completeTodo, editTodo, cancelDetails, showProgressBar }, action) => {
  return {
    todoDetails: todoDetailsReducer({ todoDetails }, action),
    todoDetailsArray: todoDetailsArrayReducer({ todoDetailsArray }, action),
    cancelDetails: cancelReducer({ todoDetails }, action),
    deletedItems: deleteTodoReducer({ deletedItems }, action),
    completeTodo: completeTodoReducer({ completeTodo }, action),
    editTodo: editTodoReducer({ editTodo }, action),
    showProgressBar: showProgressBarReducer({ showProgressBar }, action)
  }
}

const convertDate = (date) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(date)
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate()),].join('-')
}

export const initialState = {
  todoDetails: {
    rowId: 1,
    summary: '',
    description: '',
    priority: '',
    createdOn: convertDate(new Date()),
    dueDate: '',
    todoStateCompleted: false,
    isRowEdited: false,
    todoDetailsErrors: {
      summary: '',
      description: ''
    }
  },
  todoDetailsArray: [],
  deletedItems: [],
  completeTodo: {
    todoStateCompleted: false,
  },
  editTodo: {
    summary: '',
    description: '',
    priority: '',
    dueDate: '',
    rowId: 1,
    isRowEdited: false,
    createdOn: '',
    currentStatus: "",
    editTodoDetailsErrors: {
      summary: '',
      description: ''
    }
  },
  cancelDetails: {
    summary: '',
    description: '',
    priority: '',
    dueDate: '',
  },
  showProgressBar: {
    show: false
  }
}

export default rootReducer;