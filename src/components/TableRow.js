import React from "react";
import { connect } from "react-redux";

import Button from "./Button";
import {
  compareValues,
  getFilteredList,
  prioritySort,
  timeSortCreatedOn,
  timeSortDueDate,
  actionSort
} from "../utils";

const TableRow = ({ todos, filterBy, handleTableRowClick, sort }) => {
  let filteredTodos = getFilteredList(todos, filterBy);

  if (sort.sortBy === "title") {
    let order = sort.type ? "asc" : "desc";
    const newTodos = filteredTodos.sort(compareValues("title", order));
    filteredTodos = newTodos;
  }

  if (sort.sortBy === "priority") {
    const newTodos = filteredTodos.sort(prioritySort);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "created_on") {
    const newTodos = filteredTodos.sort(timeSortCreatedOn);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "due_date") {
    const newTodos = filteredTodos.sort(timeSortDueDate);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "actions") {
    const newTodos = filteredTodos.sort(actionSort);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  return filteredTodos.map((todo, index) => (
    <tr key={index} onClick={e => handleTableRowClick(e, todo.id)}>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.title}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.priority}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.createdAt}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.dueDate}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {actions(todo.currentState)}
      </td>
    </tr>
  ));
};

const actions = currentState => {
  if (currentState)
    return (
      <div className="todo-item action">
        <Button name={"Re-Open"} class_="re-open" />
      </div>
    );
  return (
    <div className="todo-item action">
      <Button name="Edit" class_="edit" />
      <Button name="Delete" class_="delete" />
      <Button name="Done" class_="done" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filterBy: state.filter,
    sort: state.sort
  };
};

export default connect(mapStateToProps)(TableRow);
