import {initialState} from '../store/initialState'

export const  modalReducer = (state=initialState.modalReducer,action) => {
    switch (action.type) {
        case "MODAL_ON":
           return {...state.showModal,showModal:action.payload}
        case "MODAL_OFF":
            return {...state.modelData,showModal:action.payload }
        case "CLOSE_GRP":
                return {...state,...state.showGroupBy,showGroupBy:action.payload}
        case "CLOSE_SRCH":
            return {...state,...state.showSrch,showSrch:action.payload}
        default:
            return state;
    }

}