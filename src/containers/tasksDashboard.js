import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
//import TaskList from '../components/TaskList'
import TasksDashBoardView from "../components/tasksDashBoardView";

const visibleTasks = (tasks, filter) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return tasks.filter(t => t.isCompleted);
    case "SHOW_PENDING":
      return tasks.filter(t => !t.isCompleted);
    case "SHOW_ALLTASKS":
    default:
      return tasks;
  }
};

const mapStateToProps = state => {
  console.log("********* state in taskDashboard :", state);
  return {
    tasks: visibleTasks(state.tasks, state.filter)
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

const tasksDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksDashBoardView);

export default tasksDashboard;
