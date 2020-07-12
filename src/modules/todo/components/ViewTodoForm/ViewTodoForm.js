import {connect} from 'react-redux'
import TodoForm from '../TodoForm/TodoForm'
import '../TodoForm/TodoForm.scss';
import {addTask} from '../../actions/taskActions'
import {closeModal} from '../../../shared/actions/modalActions'

const defaultPriority = 'NONE';
const mapStateToProps = () =>({
    readOnly: true
})

const mapDispatchToProps = (dispatch) => ({
    closeModal : (task) =>  dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)