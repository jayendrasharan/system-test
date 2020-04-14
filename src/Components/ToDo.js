import React from "react";
import ToDoList from "./ToDoList";

import { ToDoConsumer } from "../context";

export default function ToDo() {
  return (
    <ToDoConsumer>
      {(value) => {
        const allTodos = value.allTodos;
        return (
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20px" }}>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rootCheck"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="rootCheck"
                    ></label>
                  </div>{" "}
                </th>
                <th scope="col">Title</th>
                <th scope="col">Priority</th>
                <th scope="col" onClick={() => value.sortToDo("createdAt")}>
                  Created On
                </th>
                <th scope="col">Due On</th>
                <th scope="col">Action</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <ToDoList
                data={allTodos}
                openViewModel={value.openViewModel}
                deleteToDo={value.deleteToDo}
                editToDo={value.editToDo}
                toggleStatusToDo={value.toggleStatusToDo}
              />
            </tbody>
          </table>
        );
      }}
    </ToDoConsumer>
  );
}
