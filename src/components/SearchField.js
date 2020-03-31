import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodoAction } from "../actions/todoAction";

const SearchField = ({ addTodo, addTodo }) => {
  return <p>Search Box</p>;
};

SearchField.propTypes = {
  todos: PropTypes.array
};

SearchField.defaultProps = {
  addTodo: () => {}
};

const mapStateToProps = state => {
  const { todoReducer } = state;
  return {
    todos: get(todoReducer, "todos")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: payload => dispatch(addTodoAction(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
