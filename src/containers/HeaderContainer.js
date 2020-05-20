import { connect } from 'react-redux'
import { toggleOverlay } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, id) => ({
  triggerAddNew: () => dispatch(toggleOverlay(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
