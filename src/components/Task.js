import React from "react";

const Task = ({ taskid, task }) =>
  task ? (
    <tr id={taskid}>
      <td>{task.isCompleted ? "Completed" : "Pending"}</td>
      <td>{task.Summary}</td>
      <td>{task.Priority}</td>
      <td>{task.duDate}</td>
    </tr>
  ) : (
    <tr id="0">
      <td>Loading...</td>
    </tr>
  );

export default Task;
