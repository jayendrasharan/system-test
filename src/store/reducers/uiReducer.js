const initialState = {
    isAlertOpen: false,
    alertTitle: "Alert",
    yesAction: undefined,
    noAction: undefined,
    alertMessage: "Message !!",
    isBackdropOpen: false
}


export default function (state = initialState, action) {
    const updatedState = {...state};
    switch (action.type) {
        case "TOGGLE_ALERT_BOX":
            updatedState.isAlertOpen = !updatedState.isAlertOpen;
            if(action.values){
                updatedState.alertTitle = action.values.title;
                updatedState.yesAction = action.values.yesAction;
                updatedState.noAction = action.values.noAction;
                updatedState.alertMessage = action.values.alertMessage;
            }
            break;
        case "TOGGLE_BACKDROP": 
            updatedState.isBackdropOpen = !updatedState.isBackdropOpen;
            break;
        default:
            break;
    }
    return updatedState;
}