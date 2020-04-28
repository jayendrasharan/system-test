import React, { Component } from "react";
import "./TaskForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: props.summary,
      description: props.description,
      priority: props.priority,
      dueDate: props.dueDate === "" ? props.dueDate : new Date(props.dueDate),
      taskCreationDate: props.taskCreationDate,
      summaryValidation: true,
      descriptionValidation: true,
      priorityValidation: true,
      dueDateValidation: true,
    };
  }

  handleInputOnChange = (element) => {
    this.setState({ [element.target.name]: element.target.value });
    if (
      element.target.name === "priority" &&
      element.target.value.trim() !== ""
    ) {
      this.setState({ priorityValidation: true });
    }
  };
  handleDueDateChange = (date) => {
    let todaysDate = new Date();
    if (date >= todaysDate) {
      this.setState({ dueDate: date, taskCreationDate: todaysDate });
    } else alert("Due date cant be less than todays date");
  };
  hanldeOnBlur = (element) => {
    if (
      this.state[element.target.name].trim() === "" ||
      this.state[element.target.name].trim().length < 10
    ) {
      this.setState({ [`${element.target.name}Validation`]: false });
      return;
    } else {
      this.setState({ [`${element.target.name}Validation`]: true });
    }
    if (
      (element.target.name === "summary" &&
        this.state[element.target.name].trim().length > 140) ||
      (element.target.name === "description" &&
        this.state[element.target.name].trim().length > 500)
    ) {
      this.setState({ [`${element.target.name}Validation`]: false });
    } else {
      this.setState({ [`${element.target.name}Validation`]: true });
    }
  };

  handleAddClick = () => {
    if (this.state.summary.trim() === "") {
      this.setState({ summaryValidation: false });
      return;
    }
    if (this.state.description.trim() === "") {
      this.setState({ descriptionValidation: false });
      return;
    }
    if (this.state.priority.trim() === "") {
      this.setState({ priorityValidation: false });
      return;
    }

    if (this.state.dueDate === "") {
      this.setState({ dueDateValidation: false });
      return;
    }
    if (
      this.state.summaryValidation &&
      this.state.descriptionValidation &&
      this.state.priorityValidation &&
      this.state.dueDateValidation
    )
      this.props.addTask(
        this.state.summary,
        this.state.description,
        this.state.priority,
        this.state.dueDate.toLocaleDateString(),
        this.state.taskCreationDate.toLocaleDateString()
      );
  };

  handleEditClick = () => {
    if (this.state.summary.trim() === "") {
      this.setState({ summaryValidation: false });
      return;
    }
    if (this.state.description.trim() === "") {
      this.setState({ descriptionValidation: false });
      return;
    }
    if (this.state.priority.trim() === "") {
      this.setState({ priorityValidation: false });
      return;
    }
    if (this.state.dueDate === "") {
      this.setState({ dueDateValidation: false });
      return;
    }

    if (
      this.state.summaryValidation &&
      this.state.descriptionValidation &&
      this.state.priorityValidation &&
      this.state.dueDateValidation
    )
      this.props.EditTask(
        this.state.summary,
        this.state.description,
        this.state.priority,
        this.state.dueDate.toLocaleDateString(),
        this.props.id
      );
  };

  render() {
    return (
      <div class="w3-modal" style={{ display: "block" }}>
        <div class="w3-modal-content taskFormContent w3-animate-top">
          <div
            className="formTitle"
            style={{ textAlign: "center", fontSize: 30 }}
          >
            {this.props.purpose === "AddTask"
              ? "Add Task"
              : this.props.purpose === "DeleteConfirm"
              ? "Confirm Delete"
              : this.props.purpose === "EditTask"
              ? "Edit Task"
              : this.props.purpose === "TaskShow"
              ? "Task Details"
              : ""}
          </div>
          <div class="w3-container">
            <div className="line">
              Summary :
              <input
                value={this.state.summary}
                onChange={this.handleInputOnChange}
                onBlur={this.hanldeOnBlur}
                disabled={
                  this.props.purpose === "DeleteConfirm" ||
                  this.props.purpose === "TaskShow"
                    ? true
                    : false
                }
                name="summary"
                type="text"
                className={`w3-input ${
                  this.state.summaryValidation ? "" : "w3-border w3-border-red"
                }`}
              />
              {this.state.summaryValidation ? (
                ""
              ) : (
                <label className="errorMessage w3-animate-bottom">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  Minimum 10 characters and maximum 140 characters
                </label>
              )}
            </div>
            <div className="line">
              Description :
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleInputOnChange}
                onBlur={this.hanldeOnBlur}
                disabled={
                  this.props.purpose === "DeleteConfirm" ||
                  this.props.purpose === "TaskShow"
                    ? true
                    : false
                }
                name="description"
                className={`w3-input ${
                  this.state.descriptionValidation
                    ? ""
                    : "w3-border w3-border-red"
                }`}
              />
              {this.state.descriptionValidation ? (
                ""
              ) : (
                <label className="errorMessage w3-animate-bottom">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  Minimum 10 characters and maximum 500 characters
                </label>
              )}
            </div>
            <div className="w3-row line">
              <div className="w3-third  w3-col">
                Priority :
                <select
                  disabled={
                    this.props.purpose === "DeleteConfirm" ||
                    this.props.purpose === "TaskShow"
                      ? true
                      : false
                  }
                  className={`w3-select w3-regular w3-border ${
                    this.state.priorityValidation ? "w3-white" : "w3-red"
                  }`}
                  value={this.state.priority}
                  onChange={this.handleInputOnChange}
                  name="priority"
                  style={{
                    width: "120px",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                >
                  <option value="" disabled selected>
                    Select Priority
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div className="w3-third w3-col" style={{ marginTop: 7 }}>
                {this.props.purpose === "DeleteConfirm" ||
                this.props.purpose === "TaskShow" ? (
                  <span>
                    Creation Date:{" "}
                    <input
                      type="text"
                      value={this.state.taskCreationDate}
                      disabled={true}
                    />
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="w3-third w3-col" style={{ marginTop: 7 }}>
                Due Date:{" "}
                {this.props.purpose === "DeleteConfirm" ||
                this.props.purpose === "TaskShow" ? (
                  <input
                    type="text"
                    disabled={true}
                    value={this.state.dueDate.toLocaleDateString()}
                  />
                ) : (
                  <DatePicker
                    selected={this.state.dueDate}
                    onChange={this.handleDueDateChange}
                  />
                )}
              </div>
            </div>
            <div className="buttonContainer">
              <span className="">
                {this.props.purpose === "DeleteConfirm" ? (
                  <button
                    onClick={() =>
                      this.props.DeleteConfirmedClicked(this.props.id)
                    }
                    className="formButton"
                  >
                    Yes Delete
                  </button>
                ) : this.props.purpose === "EditTask" ? (
                  <button onClick={this.handleEditClick} className="formButton">
                    Update
                  </button>
                ) : this.props.purpose === "TaskShow" ? (
                  ""
                ) : (
                  <button onClick={this.handleAddClick} className="formButton">
                    Save
                  </button>
                )}
              </span>
              <span className="">
                <button
                  className="formButton"
                  onClick={this.props.cancelClicked}
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
