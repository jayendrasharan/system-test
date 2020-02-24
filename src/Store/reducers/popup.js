import { TOGGLE_POPUP } from '../constants/contants'

const initialState = {
    modalIsOpen: false,
    contentType: 'new',
    contentFromProps: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_POPUP:
            return {
                ...state,
                modalIsOpen: !state.modalIsOpen,
                contentType: payload.type ? payload.type : 'new',
                contentFromProps: payload.data ? payload.data : '',
            }

        default:
            return state
    }
}
