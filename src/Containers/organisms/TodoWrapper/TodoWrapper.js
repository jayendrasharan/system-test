import { connect } from 'react-redux';
import ToDoApp from '../../../Components/organisms/ToDoApp';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTask,
  globalDeleteAction,
  globalCompleteAction,
  toggleTaskCheckedStatus,
} from './actions';

const mapDispatchToProps = dispatch => ({
  addTask: taskInfo => {
    dispatch(addTask(taskInfo));
  },
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  toggleTaskStatus: taskId => dispatch(toggleTaskStatus(taskId)),
  editTask: editTaskInfo => dispatch(editTask(editTaskInfo)),
  globalCompleteAction: taskIds => dispatch(globalCompleteAction(taskIds)),
  globalDeleteAction: taskIds => dispatch(globalDeleteAction(taskIds)),
  toggleTaskCheckedStatus: (value,taskId) => dispatch(toggleTaskCheckedStatus(value,taskId)),
});
const mapStateToProps = state => ({
  taskList: state.taskState.taskList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
