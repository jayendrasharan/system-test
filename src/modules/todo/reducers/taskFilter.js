const defaultFilter = 'PENDING';

const filter = (state = defaultFilter, action) => {
    switch (action.type) {
        case 'ALL':
            state = 'ALL'
            break;
        case 'PENDING':
            state = 'PENDING'
            break;
        case 'COMPLETED':
            state = 'COMPLETED'
            break;
    }
    return state;
}

export default filter;