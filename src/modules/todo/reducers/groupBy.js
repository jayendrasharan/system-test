const defaulState = {
    groupBy: ''
};

const groupBy = (state = defaulState, action) => {
    switch (action.type) {
        case 'GROUP_BY':
            state.groupBy = action.groupBy
            break;
    }
    return {...state};
}

export default groupBy;