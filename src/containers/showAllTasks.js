import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
//import TaskList from '../components/TaskList'
import DashBoardBar from '../components/DashBoardBar'


const visibleTasks = (tasks, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return tasks.filter(t => t.isCompleted)
    case 'SHOW_PENDING':
      return tasks.filter(t => !t.isCompleted)
    case 'SHOW_ALLTASKS':
    default:
      return tasks
  }
}


const mapStateToProps = state => ({
  tasks: visibleTasks(state.tasks, state.filter)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
})

const ShowTaskTabs = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardBar)

export default ShowTaskTabs