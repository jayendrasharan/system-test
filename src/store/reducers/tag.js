const initialState = {
    tags: []
};

const Sample = (state = initialState, action) => {
    switch (action.type) {
        case 'add_tag':
            return {
                ...state,
                tags: action.value.add_tag
            }
        default:
            return state;
    }
};

export default Sample;