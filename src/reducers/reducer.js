//Set Initial State
const iState = {
        tasks:[],
        searchText:'',
        sortConf:{},
        filterText:''
}

//Reducer funciton take two arguments state and action. This will return a new state
const reducer = (state=iState, action) => {
    switch(action.type){
        case 'ADD_TASK':{
            const tasks = [action.payload,...state.tasks];
            let sortField = state.sortConf.srtField;
            let orderField = state.sortConf.orderField;
            if(sortField==='' || sortField==='undefined' || sortField===null) sortField = "name";
            tasks.sort( (a,b)=> {
                if(orderField==='asc') {
                    return b[sortField]>a[sortField];    
                } else {
                    return a[sortField]>b[sortField];    
                }
            } );
            return{  ...state, tasks:tasks };
        }
        case 'EDIT_TASK': {
            let task_info = action.payload;
            const tasks = state.tasks.map( (task,i)=>{
                if(action.payload.id==task.id) {  return { ...task, ...action.payload} } else{
                    return { ...task}
                }
            })
            return {...state, tasks:tasks}
        }
        case 'SEARCH_TASK':{
            const keyword = action.payload.toLowerCase();
            return {...state, searchText:keyword};
        }
        case 'DELETE_TASK':{
            let id = action.payload;
            const withoutExistTask = state.tasks.filter( task => task.id !== id );
            console.log("delete Item",withoutExistTask);
            return {...state,tasks:[...withoutExistTask]};
        }
        case 'FILTER_TASK':{
            let filterText = action.payload
            return {...state, filterText:filterText};
        }
        case 'COMPLETE_TASK':{
            let id = action.payload
            let existTask = state.tasks.filter( (task) => task.id === id ); 
            if(existTask.length>0) {
                let withoutexisttask = state.tasks.filter( (task) => task.id !== id );
                let valupdate = existTask[0].complete;
                let updatedexisttask = Object.assign({}, ...existTask, {complete:!valupdate});
                let taskc = [...withoutexisttask,updatedexisttask];
                let sortField = state.sortConf.srtField;
                let orderField = state.sortConf.orderField;
                if(sortField==='' || sortField==='undefined' || sortField===null) sortField = "name";
                taskc.sort( (a,b)=> {
                    if(orderField==='asc') {
                        return b[sortField]>a[sortField];    
                    } else {
                        return a[sortField]>b[sortField];    
                    }
                } );
                
                return {...state,tasks:taskc}
            }
           return {...state};
        }
        case 'SET_SORT_FIELD':{
           let sortField = action.payload.srtField;
            let orderField = action.payload.orderField;
            let tasks = state.tasks;
            tasks.sort( (a,b)=> {
                if(orderField==='asc') {
                    return b[sortField]>a[sortField];    
                } else {
                    return a[sortField]>b[sortField];    
                }
            } );
            return{
                ...state, tasks:tasks,  sortConf:action.payload
            };
        }
        default: return state;
    }
}

export default reducer;
