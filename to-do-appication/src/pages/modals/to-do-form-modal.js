 const ToDoFormModal = 
 {
    id: {
        label: 'ID',
        value: -1,
        isRequired: false,
        errorMessage: '',
        helperText: '',
        pattern: ''
    },

    currentState: {
        label: 'Current State',
        value: false,
        isRequired: false,
        errorMessage: '',
        helperText: '',
        pattern: ''
    },

    title: {
        label: 'Title',
        value: '',
        isRequired: true,
        errorMessage: '',
        helperText: 'Title should not be empty',
        pattern: '^.{10,140}$'
    },

    description: {
        label: 'Description',
        value: '',
        isRequired: true,
        errorMessage: '',
        helperText: 'Description should not be empty',
        pattern: '^.{10,500}$'
    },

    createdAt: {
        label: 'Created At',
        value: new Date(),
        isRequired: false,
        errorMessage: '',
        helperText: '',
        pattern: ''
    },

    dueDate: {
        label: 'Due Date',
        value:  new Date(),
        isRequired: false,
        errorMessage: '',
        helperText: '',
        pattern: ''
    },

    priority: {
        label: 'Priority',
        value: 0,
        isRequired: false,
        errorMessage: '',
        helperText: '',
        pattern: ''
    }


}

export default ToDoFormModal;