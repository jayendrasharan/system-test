export const validate = (state) => {
    if (state.summary.length < 10) {
        alert('Summary length should be min 10')
        return true
    }
    if (state.description.length < 10) {
        alert('Description length should be min 10')
        return true
    }
    if (state.dueDate === '') {
        alert('Please select due date')
        return true
    }

}