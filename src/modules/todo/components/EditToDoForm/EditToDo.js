import {connect} from 'react-redux'
import TodoForm from '../TodoForm/TodoForm'
import '../TodoForm/TodoForm.scss';
import {updateTask} from '../../actions/taskActions'
import {closeModal} from '../../../shared/actions/modalActions'
import EditToDoForm from './EditToDoForm'
import { asyncWrapper } from '../../actions/asyncActions';

const defaultPriority = 'NONE';
const mapStateToProps = () =>({
    readOnly: false
})

const mapDispatchToProps = (dispatch) => ({
    updateTask: (id, task) => asyncWrapper(dispatch,()=>{
        dispatch(updateTask(id, task));
        dispatch(closeModal());
    }),
    closeModal : (task) =>  dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditToDoForm)