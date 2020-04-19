/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:06 PM
 */
import * as AppActionTypes from "../actionTypes/app";

const INITIAL_STATE = {
    showDialog: false,
    sortKey: null,
    sortOrder: 0,
    groupByKey: "",
    progressState: {
        api_pending: false,
    }
}

const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionTypes.APP_SHOW_MODAL:
            return {
                ...state,
                showDialog: true,
                ...action.payload
            }
        case AppActionTypes.APP_HIDE_MODAL:
            return {
                ...state,
                showDialog: false,
            }
        case AppActionTypes.SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload.sortOrder,
                sortKey: action.payload.sortKey,
            }
        case AppActionTypes.SET_GROUPBY_KEY:
            return {
                ...state,
                groupByKey: action.payload,
            }
        case AppActionTypes.API_STARTED:
            return {
                ...state,
                progressState: {
                    ...state.progressState,
                    api_pending: true,
                }
            }
        case AppActionTypes.API_COMPLETED:
            return {
                ...state,
                progressState: {
                    ...state.progressState,
                    api_pending: false,
                }
            }
        default:
            return {...state};
    }
}

export default appReducer;