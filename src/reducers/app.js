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
    groupByKey: null
}

const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionTypes.APP_SHOW_MODAL:
            return {
                ...state,
                showDialog: true,
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
        default:
            return {...state};
    }
}

export default appReducer;