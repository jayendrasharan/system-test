export const list_action = (duplicate_data, itemkey, itemvalue) => {
    return dispatch => {
        switch (itemkey) {
            case 'delete':
                duplicate_data.splice(itemvalue, 1)
                dispatch(onupdate_data(duplicate_data))
                break;
            case 'done':
                duplicate_data[itemvalue].isComplete = true
                dispatch(onupdate_data(duplicate_data))
                break;
            case 're-open':
                duplicate_data[itemvalue].isComplete = false
                dispatch(onupdate_data(duplicate_data))
                break;
        }
    }
}

export const add_new_tag = (duplicate_data, state) => {
    return dispatch => {
        const new_data = {
            summary: state.summary,
            description: state.description,
            priority: state.priority,
            due_date: state.due_date,
            created_date: new Date().toDateString(),
            isComplete: false
        }
        duplicate_data.push(new_data)
        dispatch(onupdate_data(duplicate_data))
    }
}

export const onupdate_data = (update_data) => {
    return {
        type: 'add_tag',
        value: { add_tag: update_data }
    };
}