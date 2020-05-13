import { connect } from 'react-redux';
import ToDoApp from '../../../Components/organisms/ToDoApp';
import { addTask, deleteTask, toggleTaskStatus, editTask } from './actions';

const mapDispatchToProps = dispatch => ({
  addTask: taskInfo => {
    dispatch(addTask(taskInfo));
  },
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  toggleTaskStatus: taskId => dispatch(toggleTaskStatus(taskId)),
  editTask: editTaskInfo => dispatch(editTask(editTaskInfo)),
});
const mapStateToProps = state => ({
  taskList: state.taskState.taskList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
