import React from "react";

export default function ToDoList({
  data,
  openViewModel,
  deleteToDo,
  toggleStatusToDo,
  editToDo,
}) {
  return data.map((todo) => (
    <tr
      key={todo.id}
      className={
        (todo.isCompleted ? "table-success" : "") +
        " " +
        (todo.haveSearchString ? "table-danger" : "")
      }
      onClick={() => {
        openViewModel(todo.id);
      }}
    >
      <td className="align-middle" style={{ width: "20px" }}>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={`todocheck-${todo.id}`}
          />
          <label
            className="custom-control-label"
            htmlFor={`todocheck-${todo.id}`}
          ></label>
        </div>
      </td>
      <td className="align-middle">{todo.title}</td>
      <td className="align-middle">{todo.priority}</td>
      <td className="align-middle">{todo.createdAt}</td>
      <td className="align-middle">{todo.dueDate}</td>
      <td className="align-middle p-0">
        <button
          className="btn bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            editToDo(todo.id);
          }}
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          className="btn bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            deleteToDo(todo.id);
          }}
        >
          <i className="fa fa-trash-alt"></i>
        </button>

        <button
          className="btn bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            toggleStatusToDo(todo.id);
          }}
        >
          <span className={todo.isCompleted ? "d-none" : ""}>
            <i className="fa fa-check"></i>
          </span>
          <span className={todo.isCompleted ? "" : "d-none"}>
            <i className="fa fa-redo"></i>
          </span>

          {/* <i className={todo.isCompleted ? "fa fa-redo" : "fa fa-check"}></i> */}
        </button>
      </td>
      <td className="align-middle">
        {todo.isCompleted ? "Completed" : "Pending"}
      </td>
    </tr>
  ));
}
