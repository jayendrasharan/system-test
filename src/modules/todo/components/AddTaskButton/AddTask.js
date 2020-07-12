import {openModal} from '../../../shared/actions/modalActions'
import AddTaskButton from './AddTaskButton'
import AddTodo from '../AddTodoForm/AddTodo'
import {connect} from 'react-redux'


const mapDispatchToProps = dispatch =>({
    onClick: (data) => (dispatch(openModal(AddTodo, data)))
})

export default connect(null, mapDispatchToProps)(AddTaskButton)