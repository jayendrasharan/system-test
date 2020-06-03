import {convertFormDataToJSON} from "../lib/utils/form_data_util";

export const TODO_ACTIONS = {
    ADD_NEW_TASK: 'add_new_task',
    UPDATE_TASK: 'update_existing_task',
    REMOVE_TASK: 'remove_task',
    CHANGE_TASKS_STATUS: 'change_status_of_task',
    SET_GROUP_BY: 'set_group_by',
    SET_SORT_COLUMN: 'set_sort_column_direction',
    SET_SEARCH_TERM: 'set_search_term',
    SET_CURRENT_SELECTION: 'set_current_selection',
    SET_ACTION: 'set_action',
    TOGGLE_LOADING: 'toggle_loading_state',
    SET_PROCESSING: 'set_action_as_in_progress',
}

export function addNewTask(dispatch,message,formData){
    dispatch({type:TODO_ACTIONS.SET_PROCESSING});
    //API call goes here. success scenario simulated. FormData is considered as a response as well
    setTimeout(()=>{
        dispatch({type:TODO_ACTIONS.ADD_NEW_TASK,payload:formData});
        message.showToastMessage({message:"Task added successfully",variant:"success"})
    },1000);
}

export function updateTask(dispatch,message,formData){
    dispatch({type:TODO_ACTIONS.SET_PROCESSING});
    //API call goes here. success scenario simulated. FormData is considered as a response as well
    setTimeout(()=>{
        dispatch({type:TODO_ACTIONS.UPDATE_TASK,payload:formData});
        message.showToastMessage({message:"Task Updated successfully",variant:"success"})
    },1000);
}

export function deleteTask(dispatch,message,formData){
    dispatch({type:TODO_ACTIONS.SET_PROCESSING});
    //API call goes here. success scenario simulated. FormData is considered as a response as well
    setTimeout(()=>{
        dispatch({type:TODO_ACTIONS.REMOVE_TASK,payload:formData});
        message.showToastMessage({message:"Task removed successfully",variant:"success"})
    },1000);
}

export function setAction(dispatch,actionType) {
    dispatch({type:TODO_ACTIONS.SET_ACTION,payload:actionType});
}

export function setCurrentSelection(dispatch,data) {
    dispatch({type:TODO_ACTIONS.SET_CURRENT_SELECTION,payload:data});
}

export function changeTaskStatus(dispatch,message,task,status) {
    dispatch({type:TODO_ACTIONS.TOGGLE_LOADING});
    setTimeout(()=>{
        dispatch({type:TODO_ACTIONS.CHANGE_TASKS_STATUS,payload:{task:task,status:status}});
        message.showToastMessage({message:"Task status updated successfully",variant:"success"})
    },1000);
}

export function setSearchText(dispatch,searchText) {
    dispatch({type:TODO_ACTIONS.SET_SEARCH_TERM,payload:searchText})
}

export function setSortBy(dispatch,sortBy) {
    dispatch({type:TODO_ACTIONS.SET_SORT_COLUMN,payload:sortBy});
}

const TodoActions = {
    addNewTask,
    updateTask,
    deleteTask,
    setAction,
    setCurrentSelection,
    changeTaskStatus,
    setSearchText,
    setSortBy
}

export default TodoActions;