import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import DashBoardBar from "../components/DashBoardBar";

const mapStateToProps = state => ({
  taskids: state.taskids
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardBar);
