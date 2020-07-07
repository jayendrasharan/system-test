import { connect } from 'react-redux';
import ToDoPage from './ToDoPage';
import { getTaskListSelector } from '../../../store/selectors/taskSelector';
import { fetchTaskListActions, addTaskAction, editTaskAction, deleteTaskAction, changeTaskStateAction } from '../../../store/actions/toDoActions';

const mapStateToProps = state => ({
  taskList: getTaskListSelector(state)
});
const mapDispatchToProps = dispatch => ({
  fetchTaskList: payload => dispatch(fetchTaskListActions.request(payload)),
  addTask: payload => dispatch(addTaskAction(payload)),
  editTask: payload => dispatch(editTaskAction(payload)),
  deleteTask: payload => dispatch(deleteTaskAction(payload)),
  changeTaskState: payload => dispatch(changeTaskStateAction(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
