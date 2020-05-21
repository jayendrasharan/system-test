import { v4 as uuidv4 } from 'uuid';

export const list_action = (duplicate_data, itemkey, itemvalue) => {
    return dispatch => {
        switch (itemkey) {
            case 'delete':
                if (window.confirm('Do you want to delete it ?')) {
                    let task = duplicate_data.filter(data => data.id !== itemvalue)
                    dispatch(onupdate_data(task))
                }
                break;
            case 'done':
                duplicate_data.forEach(ele => {
                    if (ele.id === itemvalue) {
                        ele.isComplete = true
                    }
                })
                dispatch(onupdate_data(duplicate_data))
                break;
            case 're-open':
                duplicate_data.forEach(ele => {
                    if (ele.id === itemvalue) {
                        ele.isComplete = false
                    }
                })
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
            isComplete: false,
            id: uuidv4()
        }
        duplicate_data.push(new_data)
        dispatch(onupdate_data(duplicate_data))
    }
}

export const validate = (state) => {
    if (state.summary.length < 10) {
        alert('Summary length should be min 10')
        return true
    }
    if (state.description.length < 10) {
        alert('Description length should be min 10')
        return true
    }
    if (state.due_date === '') {
        alert('Please select due date')
        return true
    }

}



export const update_tag = (duplicate_data, state, index) => {
    return dispatch => {
        duplicate_data.forEach(task => {
            if (task.id === index) {
                task.summary = state.summary
                task.description = state.description
                task.priority = state.priority
                task.due_date = state.due_date
            }
        })
        dispatch(onupdate_data(duplicate_data))
    }
}

export const onupdate_data = (update_data) => {
    return {
        type: 'add_tag',
        value: { add_tag: update_data }
    };
}