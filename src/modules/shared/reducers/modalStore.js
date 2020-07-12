const initialState = {
    show: false,
    children: null,
    modalData: {}
}
const modalStore = (state = initialState, action) =>{
    switch (action.type) {
        case 'OPEN_MODAL':
            state.show = true;
            state.modalData = action.data;
            state.children = action.children;
            break;
        case 'CLOSE_MODAL':
            state.show = false;
            state.children = null;
            break;
    }
    return {...state};
}

export default modalStore;