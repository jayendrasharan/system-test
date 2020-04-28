import React, { Component } from "react";
import "./Task.css";

export class Task extends Component {
  render() {
    const {
      id,
      currentState,
      title,
      createdAt,
      dueDate,
      priority,
    } = this.props;
    return (
      <div
        key={id}
        className={`taskContainer w3-animate-bottom w3-row w3-card ${
          currentState ? "openTaskBackgroundColor" : "closeTaskBackgroundColor"
        }`}
      >
        <div onClick={() => this.props.taskcardClicked(id)}>
          <div
            className={`w3-col m4 l4 s4 taskSummary ${
              currentState ? "" : "strikeThroughText"
            }`}
            style={{ textAlign: "left" }}
          >
            {title}
          </div>
          <div
            className={`w3-col m2 l2 s2 ${
              priority === "High"
                ? "w3-text-red"
                : priority === "Medium"
                ? "w3-text-yellow"
                : "w3-text-green"
            } ${currentState ? "" : "strikeThroughText"}`}
            style={{ textAlign: "left" }}
          >
            {priority}
          </div>
          <div className="w3-col m2 l2 s2" style={{ paddingRight: 2 }}>
            <div
              className={`startDate ${currentState ? "" : "strikeThroughText"}`}
            >
              {createdAt}
            </div>
          </div>
          <div
            className={`w3-col m2 l2 s2 endDate ${
              currentState ? "" : "strikeThroughText"
            }`}
          >
            {dueDate}
          </div>
        </div>
        <div className="w3-col m2 l2 s2" style={{ textAlign: "right" }}>
          <span
            className="actionButton"
            onClick={() => this.props.editTaskClicked(id)}
          >
            <i className="fa fa-pencil-square-o w3-text-blue"></i>
          </span>
          <span
            className="actionButton"
            onClick={() => this.props.removeTaskClicked(id)}
          >
            <i className="fa fa-trash w3-text-red" aria-hidden="true"></i>
          </span>
          <span
            className="actionButton"
            onClick={() => this.props.closeOpenClicked(id)}
          >
            {currentState ? (
              <i className="fa fa-check w3-text-green" aria-hidden="true"></i>
            ) : (
              <i
                className="fa fa-history w3-text-yellow  "
                aria-hidden="true"
              ></i>
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default Task;
