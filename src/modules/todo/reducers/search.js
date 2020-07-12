const defaulStatet = {
    searchText: ''
};

const search = (state = defaulStatet, action) => {
    switch (action.type) {
        case 'SEARCH':
            state.searchText = action.searchText
            break;
    }
    return {...state};
}

export default search;