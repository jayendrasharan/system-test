/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:06 PM
 */
import * as AppActionTypes from "../actionTypes/app";

const INITIAL_STATE = {
    showDialog: false,
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
        default:
            return state
    }
}

export default appReducer;