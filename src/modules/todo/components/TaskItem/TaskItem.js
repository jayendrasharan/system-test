import {deleteTask, reopenTask, completeTask} from '../../actions/taskActions'
import {connect} from 'react-redux';
import TaskItemView from './TaskItemView'
import {openModal} from '../../../shared/actions/modalActions'
import ConfirmationDialog from '../../../shared/components/ConfirmationDialog/ConfirmationDialog'
import EditToDo from '../EditToDoForm/EditToDo'
import ViewTodoForm from '../ViewTodoForm/ViewTodoForm'
import {closeModal} from '../../../shared/actions/modalActions'
import { asyncWrapper } from '../../actions/asyncActions';


const mapStateToProps = state => ({
    searchText : state.search.searchText
})

const mapDispatchToProps = (dispatch) => ({
    deleteTask:  (id) =>asyncWrapper(dispatch, () => {
        dispatch(deleteTask(id));
        dispatch(closeModal());
    }),
    confirmDelete: (confirmAction, cancelAction) => (dispatch(openModal(ConfirmationDialog, {message: 'Are you sure you want to delete the task', confirmAction, cancelAction}))),
    completeTask: (id) => asyncWrapper(dispatch, ()=>dispatch(completeTask(id))),
    closeModal : (task) =>  dispatch(closeModal()),
    reopenTask: (id) => asyncWrapper(dispatch, ()=>dispatch(reopenTask(id))),
    editTask: (data) => asyncWrapper(dispatch, ()=>(dispatch(openModal(EditToDo, {title: 'Edit To Do', data, readOnly : false, wrapperClass:  "add-form-modal"})))),
    viewTask: (data) => asyncWrapper(dispatch, ()=>(dispatch(openModal(ViewTodoForm, {title: 'View To Do', data, readOnly : true}))))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemView);