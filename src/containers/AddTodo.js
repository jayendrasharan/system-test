import { connect } from 'react-redux'
import { toggleOverlay, addTodo } from '../actions'
import AddToDo from '../components/AddToDo'

const mapStateToProps = (state) => ({
  overlayActive: state.overlayReducer.overlayActive === true,
  editToDoId: state.overlayReducer.forId,
  todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
  toggleOverlay: (id) => dispatch(toggleOverlay(id)),
  addTodo: (todo) => dispatch(addTodo(todo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToDo)
