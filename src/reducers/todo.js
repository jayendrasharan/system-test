import data from '../.mock-data/todo-list.json';
import {
  CHANGE_GROUPBY, RESET_STATE, DELETE_TODO,
  CHANGE_TODO_STATUS, CHANGE_CURRENT_TAB,
  SORT_COLUMN, OPEN_ADD_TASK_MODAL, CLOSE_TASK_MODAL,
  OPEN_EDIT_TASK_MODAL, SUBMIT_FORM, SEARCH_TASKS,
  searchOptions
} from '../actions/todo';

export const initialState = {
  currentId: data.map(i => i.id).sort((a, b) => a-b).reverse()[0] || 1,
  allTasks: data,
  tasks: data,
  groupBy: 'none',
  searchTerm: '',
  sortBy: 'title',
  sortOrder: 'ASC',
  selectedTab: 'all',
  openModal: false,
  selectedTask: {}
}

export const initializeState = (state) => state;

const groupByCallback = (value) => (acc, cur) => {
  if(!acc[cur[value]]) {
    acc[cur[value]] = []
  }
  return {
    ...acc,
    [cur[value]]: [
      ...acc[cur[value]],
      cur
    ] 
  }
}

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_GROUPBY:
      const { value } = payload;
      return {
        ...state,
        groupBy: payload.value,
        tasks: value === 'none' ? state.allTasks : state.allTasks.reduce(groupByCallback(value), {})
      }
    case DELETE_TODO: {
      const updatedTask = state.tasks.filter(i => i.id !== payload.id)
      return {
        ...state,
        tasks: updatedTask,
        allTasks: updatedTask
      }
    }
    case CHANGE_TODO_STATUS: {
      const callback = (i) => {
        if(i.id === payload.id) {
          i.currentState = i.currentState === 'open' ? 'done' : 'open';
        }
        return {...i};
      }
      const updateTasks = state.tasks.map(callback)
      return {
        ...state,
        tasks: updateTasks,
        allTasks: updateTasks
      }
    }
    case CHANGE_CURRENT_TAB: {
      return {
        ...state,
        selectedTab: payload.value,
      }
    }
    case SORT_COLUMN: {
      const { columnName } = payload
      const sortOrder = state.sortBy !== columnName ? state.sortOrder : state.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      const callback = (a, b) => {
        if(a[columnName] < b[columnName]) return sortOrder === 'ASC' ? -1 : 1
        else if(a[columnName] > b[columnName]) return sortOrder === 'ASC' ? 1 : -1;
        else return 0;
      }
      const sortedTasks = state.tasks.sort(callback)
      return {
        ...state,
        sortOrder,
        sortBy: columnName,
        tasks: sortedTasks,
        allTasks: sortedTasks
      }
    }
    case OPEN_ADD_TASK_MODAL: {
      return {
        ...state,
        openModal: true
      }
    }
    case OPEN_EDIT_TASK_MODAL: {
      return {
        ...state,
        openModal: true,
        selectedTask: state.tasks.filter(task => task.id === payload.id)[0] // not used find as less browser support.
      }
    }
    case CLOSE_TASK_MODAL: {
      return {
        ...state,
        openModal: false,
        selectedTask: {}
      }
    }
    case SUBMIT_FORM: {
      let tasks = []
      if(payload.id === -1) {
        // For new elements which are not yet created this will be -1 and this need new states.
        const newTask = {id: state.currentId + 1, currentState: 'open', createdAt: (new Date()).toLocaleDateString()}
        tasks = [...state.tasks, {...payload, ...newTask}]
      } else {
        tasks = state.tasks.map((task) => {
          if(task.id === payload.id) {
            task = {...task, ...payload}
          }
          return task
        })
      }
      return {
        ...state,
        tasks,
        allTasks: tasks,
        openModal: false,
        selectedTask: {},
        currentId: state.currentId + 1
      }
    }
    case SEARCH_TASKS: {
      // NOTE :: Do not update allTasks column here.
      return {
        ...state,
        searchTerm: payload.value,
        tasks: state.allTasks.filter(task => searchOptions.some(option => task[option].toLowerCase().indexOf(payload.value.toLowerCase()) !== -1))
      }
    }
    case RESET_STATE:
      return initializeState(initialState)
    default:
      return {
        ...state,
        ...payload
      }
  }
}