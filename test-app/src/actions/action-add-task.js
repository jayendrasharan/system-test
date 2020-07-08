import * as actionTypes from '../actions/actionTypes';

const addTask = (taskDetails, gridData) => {
   let updatedTaskDetails=formatTaskDetails(taskDetails);
    let updatedGridData = updateGridData(gridData, updatedTaskDetails);
    return {
        type: actionTypes.ADD_TASK_SUCCESS,
        payload: { gridData: updatedGridData }
    }
}

const formatTaskDetails=(taskDetails)=>{
    let dueDate = taskDetails.dueDate;
    let createdAt=taskDetails.createdAt;
    taskDetails["dueDate"] = formatDate(dueDate);
    taskDetails["createdAt"]=formatDate(createdAt);
    return taskDetails;
}

const updateGridData = (gridData, taskDetails) => {
    gridData.allTasks.gridTableData.push(taskDetails);
    gridData.pending.gridTableData.push(taskDetails);
    return gridData;
}
const formatDate = (inputDate) => {
    var date = new Date(inputDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
}



export default addTask;
