import React, { Component } from "react";
import "./AllTasks.css";
import { Task } from "../Task/Task";

export class AllTasks extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="allTaskaContent w3-display-container">
        <div className="header">
          <span className="tabButton active">All Tasks</span>
          <span className="tabButton">Completed</span>
          <span className="tabButton" style={{ borderRight: "none" }}>
            Pending
          </span>
        </div>
        <div className="tasksContainer">
          {data.map((taskData) => (
            <Task
              key={taskData.id}
              id={taskData.id}
              currentState={taskData.currentState}
              title={taskData.title}
              createdAt={taskData.createdAt}
              dueDate={taskData.dueDate}
              priority={taskData.priority}
              closeOpenClicked={this.props.closeOpenClicked}
              removeTaskClicked={this.props.removeTaskClicked}
              editTaskClicked={this.props.editTaskClicked}
            />
          ))}
        </div>
        <div className="w3-display-bottomright addButtonDiv">
          <button className="button" onClick={this.props.addButtonClicked}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default AllTasks;
