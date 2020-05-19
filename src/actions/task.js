let todoID = 0;
export const addNewTask = (task_info) =>{
    return (dispatch)=>{
        dispatch({type:'ADD_TASK',payload:Object.assign({},task_info,{id:todoID++,complete:false, currdate:Date.now(), open:false})});
    }
}
export const editOpenTask = (task_info) => {
    return (dispatch) => {
        dispatch({type:'EDIT_TASK', payload:task_info});
    }
}

export const searchKeyword = (keyword) => {
    return (dispatch) => {
        dispatch({type:'SEARCH_TASK', payload:keyword});
    }
}

export const addNewFilter = (val) => {
    return (dispatch) => {
        dispatch({type:'FILTER_TASK', payload:val});
    }
}

export const completedTask = (val) => {
    return (dispatch) => {
        dispatch({type:'COMPLETE_TASK', payload:val});
    }
}


export const deleteTask = (id) =>{
    return (dispatch) => {
        dispatch({type:'DELETE_TASK',payload:id});
    }
}

export const resetSearch = () => {
    return   (dispatch) => {
        dispatch({type:'RESET_SEARCH'})
    }
}
export const setSortingTask = (sortConf) =>{
    return (dispatch)=>{
        dispatch({type:'SET_SORT_FIELD',payload:sortConf});
    }
}
