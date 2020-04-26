import {initialState} from '../store/initialState';


export const  tabReducer = (state=initialState.tabReducer,action) => {
    switch (action.type) {
        case "GET_ALL_TASKS":
            return  {...state,taskDetails: [...state.taskDetails,updatedPayload]}
        default:
            return state;
    }

}