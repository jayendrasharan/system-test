import CreateReducer from '../lib/utils/create_reducer';
import {TODO_ACTIONS} from "../actions/todo_actions";

const task = [
    {
        id: Date.now(),
        title: "Todo sample task 1",
        description:"Simple todo task list",
        priority: 'high',
        currentState:false,
        createdAt: "03/06/2020",
        dueDate: "03/06/2020"
    },
    {
        id: Date.now(),
        title: "Todo sample task 2",
        description:"Simple todo task list",
        priority: 'medium',
        currentState:true,
        createdAt: "03/06/2020",
        dueDate: "03/06/2020"
    }
]

export const INITIAL_TODO_STATE = {
    loading:false,
    tasks:task,
    currentSelection:{},
    action:null,
    groupBy:null,
    searchText:'',
    sortDirection:'asc',
    processing:false
};

const todoReducer = CreateReducer(INITIAL_TODO_STATE, {
    [TODO_ACTIONS.TOGGLE_LOADING](state,action){
        return {
            ...state,
            loading: !state.loading
        }
    },
    [TODO_ACTIONS.SET_PROCESSING](state,action){
        return {
            ...state,
            processing: true
        }
    },
    [TODO_ACTIONS.ADD_NEW_TASK](state,action){
        return {
            ...INITIAL_TODO_STATE,
            groupBy:state.groupBy,
            searchText: state.searchText,
            tasks: [action.payload].concat(state.tasks)
        }
    },
    [TODO_ACTIONS.UPDATE_TASK](state,action){
        const currentUpdateTask = action.payload;
        const updatedTasks = state.tasks.map(task => {
            if(task.id === currentUpdateTask.id){
                return currentUpdateTask;
            }
            return task
        })
        return {
            ...INITIAL_TODO_STATE,
            groupBy:state.groupBy,
            searchText: state.searchText,
            tasks:updatedTasks
        }
    },
    [TODO_ACTIONS.REMOVE_TASK](state,action){
        const deletedTaskId = action.payload.id;
        const updatedTaskList = state.tasks.filter(task => task.id !== deletedTaskId);
        return {
            ...INITIAL_TODO_STATE,
            groupBy:state.groupBy,
            searchText: state.searchText,
            tasks:updatedTaskList
        }
    },
    [TODO_ACTIONS.SET_CURRENT_SELECTION](state,action){
        return {
            ...state,
            currentSelection: action.payload
        }
    },
    [TODO_ACTIONS.CHANGE_TASKS_STATUS](state,action){
        const currentUpdateTask = action.payload.task;
        const updatedTaskList = state.tasks.map(task => {
            if(task.id === currentUpdateTask.id){
                return {
                    ...currentUpdateTask,
                    processing:false,
                    currentState:action.payload.status
                };
            }
            return task
        })
        return {
            ...state,
            loading: false,
            tasks: updatedTaskList
        }
    },
    [TODO_ACTIONS.SET_ACTION](state,action){
        return {
            ...state,
            action:action.payload || null
        }
    },
    [TODO_ACTIONS.SET_SEARCH_TERM](state,action){
        return {
            ...state,
            searchText: action.payload || ""
        }
    }
})

export default todoReducer;