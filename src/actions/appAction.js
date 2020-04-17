/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:40 PM
 */
import {APP_HIDE_MODAL, APP_SHOW_MODAL, SET_SORT_ORDER} from "../actionTypes/app";

const showModal = (payload) => {
    return ({
        type: APP_SHOW_MODAL,
        payload,
    })
}

const hideModal = () => ({
    type: APP_HIDE_MODAL
})

const setSort = (payload) => ({
    type: SET_SORT_ORDER,
    payload
})

export {
    showModal,
    hideModal,
    setSort,
}