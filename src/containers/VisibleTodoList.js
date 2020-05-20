import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters, toggleOverlay, deleteTodo, markAsDone, markAsUnDone } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  strikeThrough: state.visibilityFilter === VisibilityFilters.SHOW_ALL
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
  toggleOverlay: (id) => dispatch(toggleOverlay(id)),
  deleteTodo: id => dispatch(deleteTodo(id)),
  markAsDone: id => dispatch(markAsDone(id)),
  markAsUnDone: id => dispatch(markAsUnDone(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
