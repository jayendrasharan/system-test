import {initialState} from '../store/initialState';

const groupBy = (tasks, key) => {
    return tasks.reduce((res, val) => {
      (res[val[key]] = res[val[key]] || []).push(
        val
      );
      return res;
    }, {}); 
  };
  

export const  taskReducer = (state=initialState.taskReducer,action) => {
    switch (action.type) {
        case "ADD_TASK":
            if (!state.editedRow) {
               
                let updatedPayload = {...action.payload,taskId:state.taskIdVal}
                return {...state,taskDetails: [...state.taskDetails,updatedPayload]}
            } else {
                let oldRow = state.editedRow;
                let newRow = action.payload;
                let updatedRow = {...oldRow,...newRow};
                let id = oldRow.taskId;
                let remainingArray = state.taskDetails.filter(obj => obj.taskId !== id);
               
                return {...state,taskDetails:[...remainingArray,updatedRow]}
            }
        case "DELETE_TASK":
            let delArray = state.taskDetails.filter(obj => obj.taskId !== action.payload);

            return {...state,taskDetails:delArray}
        case "UPDATE_START":
            return {...state,editedRow:{...action.payload}};
         case "EDIT_ROW_DELETE":
             return {...state,editedRow:undefined}   
        case "DO_SORT":
            let sortedArray;
            let key = action.payload;
            let idKey = (key === "id") ? "taskId" : null ;
            let TitleKey =  (key === "Title") ? "mySummary" : null;
            let priorityKey = (key === "priority") ? "myPriority" : null;
            if (key === "dueDate") {
                let key = "myDate";
                sortedArray = state.taskDetails.sort((a,b) => {
                let aDate = new Date(a[key]);
                let bDate = new Date(b[key]);
                if (aDate < bDate) { return -1}
                if (aDate > bDate) { return +1}
                return 0;

                } );
            }
            let finalKey = TitleKey || priorityKey;
            if (finalKey) {
                sortedArray = state.taskDetails.sort((a,b) => {
                let nameA = a[finalKey].toUpperCase()
                let nameB= b[finalKey].toUpperCase()
                if (nameA < nameB) { return -1}
                if (nameA > nameB) { return +1}
                return 0;
                }
                 );
            }
            if (idKey) {
                let finalKey = idKey;
                sortedArray = state.taskDetails.sort((a,b) => a[finalKey]-b[finalKey]);
            }
            return {...state,taskDetails:[...sortedArray]};
        case "UPDATE_TASKID_COUNT" : 
            return {...state,taskIdVal:state.taskIdVal+1}
        case "TASK_COMPLETE" : 
            let getTasksList = state.taskDetails.filter(task => task.taskId === action.payload)[0];
            let updatedStatusTask = {...getTasksList,status:"COMPLETED"};
            let remainingTasks = state.taskDetails.filter(task => task.taskId !== action.payload);
            let consolidatedTasks = [...remainingTasks,updatedStatusTask];
            return {...state,taskDetails: consolidatedTasks}
        case "GET_ALL_TASKS":
            return  {...state,Alltasks: state.taskDetails}
        case "GET_COMPLETED_TASKS":
            const compKey = 'COMPLETED';
            let compTasks = state.taskDetails.filter(taskObj => taskObj.status === compKey);
        
            return  {...state,Completed: compTasks}
        case "GET_PENDING_TASKS":
            const progKey = 'IN_PROGRESS';
            let pendingTasks = state.taskDetails.filter(taskObj => taskObj.status === progKey);
            
            return  {...state,Pendings: pendingTasks}
        case "DO_SEARCH":
            let searchedArray = state.taskDetails.filter(v => v.mySummary.includes(action.payload) )
           return {...state,SearchTasks:searchedArray}
        case "DO_GROUP_BY":
            const gkey = action.payload;
            const groupByResult = groupBy(state.taskDetails,gkey);
            console.log(groupByResult,"GROUPBY");
            return {...state,groupByData:groupByResult}
        case "CLOSE_SRCH":
        default:
            return state;
    }

}