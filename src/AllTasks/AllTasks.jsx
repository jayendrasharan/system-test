import React, { Component } from "react";
import "./AllTasks.css";
import { Task } from "../Task/Task";

export class AllTasks extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      tab: "alltask",
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      if (this.state.tab === "alltask") {
        this.handleAllTaskTabClick();
      }
      if (this.state.tab === "completed") {
        this.handleCompletedTabClick();
      }
      if (this.state.tab === "pending") {
        this.handlePendingTabClick();
      }
    }
  };

  handleAllTaskTabClick = () => {
    this.setState({ data: this.props.data, tab: "alltask" });
  };

  handleCompletedTabClick = () => {
    let tempData = this.props.data.filter(
      (element) => element.currentState === false
    );
    this.setState({ data: tempData, tab: "completed" });
  };
  handlePendingTabClick = () => {
    let tempData = this.props.data.filter(
      (element) => element.currentState === true
    );
    this.setState({ data: tempData, tab: "pending" });
  };
  render() {
    const { data, tab } = this.state;
    return (
      <div className="allTaskaContent w3-display-container">
        <div className="header">
          <span
            className={`tabButton ${tab === "alltask" ? "active" : ""}`}
            onClick={this.handleAllTaskTabClick}
          >
            All Tasks
          </span>
          <span
            className={`tabButton ${tab === "completed" ? "active" : ""}`}
            onClick={this.handleCompletedTabClick}
          >
            Completed
          </span>
          <span
            className={`tabButton ${tab === "pending" ? "active" : ""}`}
            style={{ borderRight: "none" }}
            onClick={this.handlePendingTabClick}
          >
            Pending
          </span>
        </div>
        <div className="tasksContainer">
          {data.length <= 0 ? (
            <div className="nothingToShow">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              Nothing to show
            </div>
          ) : (
            ""
          )}
          {data.map((taskData) => (
            <Task
              key={taskData.id}
              id={taskData.id}
              currentState={taskData.currentState}
              title={taskData.title}
              createdAt={taskData.createdAt}
              dueDate={taskData.dueDate}
              priority={taskData.priority}
              taskcardClicked={this.props.taskcardClicked}
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
