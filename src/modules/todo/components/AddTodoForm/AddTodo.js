import {connect} from 'react-redux'
import AddTodoForm from './AddTodoForm'
import '../TodoForm/TodoForm.scss';
import {addTask} from '../../actions/taskActions'
import {closeModal} from '../../../shared/actions/modalActions'
import { asyncWrapper } from '../../actions/asyncActions';

const defaultPriority = 'NONE';
const mapStateToProps = () =>({
    data: {
        title: '',
        desc: '',
        dueDate: '',
        priority: defaultPriority
    },
    readOnly: false
})

const mapDispatchToProps = (dispatch) => ({
    addTask: (task) => asyncWrapper(dispatch, ()=>{
        dispatch(addTask(task));
        dispatch(closeModal());
    }),
    closeModal : (task) =>  dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm)