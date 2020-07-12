const defaultState = {
    show: false
}

const loader = (state = defaultState, action) => {
    switch (action.type) {
        case 'ASYNC_IN_PROGRESS':
            state.show = true
            break;
        case 'ASYNC_COMPLETED':
            state.show = false
        break;
    }
    return {...state};
}

export default loader;