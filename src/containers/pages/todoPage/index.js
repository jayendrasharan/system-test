import { connect } from 'react-redux';
import ToDoPage from './ToDoPage';
import { getTaskListSelector } from '../../../store/selectors/taskSelector';
import { fetchTaskListActions, saveTaskAction } from '../../../store/actions/toDoActions';

const mapStateToProps = state => ({
  taskList: getTaskListSelector(state)
});
const mapDispatchToProps = dispatch => ({
  fetchTaskList: payload => dispatch(fetchTaskListActions.request(payload)),
  saveTask: payload => dispatch(saveTaskAction(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
