
export const upsert = (state,action) => {
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
}

export const sorting = (state,action) => {
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
} 