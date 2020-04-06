import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import ShowAllTasksView from "../components/showAllTasksView";

const mapStateToProps = state => {
  console.log("######## state in showAllTaks :", state);
  const data = state;
  return {
    taskids: data.totalTasksAdded || 0
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllTasksView);
