import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import AddtaskModal from '../components/AddtaskModal'

const mapStateToProps = state => ({
  task: state.task
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddtaskModal)