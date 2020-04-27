import React, { Component } from "react";
import "./TaskForm.css";

export class TaskForm extends Component {
  constructor(props) {
    console.log(props.summary);
    super(props);
    this.state = {
      summary: props.summary,
      description: props.description,
      priority: props.priority,
      dueDate: props.dueDate,
      summaryValidation: true,
      descriptionValidation: true,
      priorityValidation: true,
      dueDateValidation: true,
    };
  }

  handleInputOnChange = (element) => {
    this.setState({ [element.target.name]: element.target.value });
  };
  hanldeOnBlur = (element) => {
    if (this.state[element.target.name].trim() === "") {
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
    if (this.state.dueDate.trim() === "") {
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
        this.state.dueDate
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
    if (this.state.dueDate.trim() === "") {
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
        this.state.dueDate,
        this.props.id
      );
  };

  render() {
    return (
      <div class="w3-modal" style={{ display: "block" }}>
        <div class="w3-modal-content modalContent taskFormContent">
          <div style={{ textAlign: "center", fontSize: 30 }}>
            {this.props.purpose === "AddTask"
              ? "Add Task"
              : this.props.purpose === "DeleteConfirm"
              ? "Confirm Delete"
              : this.props.purpose === "EditTask"
              ? "Edit Task"
              : ""}
          </div>
          <div class="w3-container">
            <div className="line">
              Summary :
              <input
                value={this.state.summary}
                onChange={this.handleInputOnChange}
                onBlur={this.hanldeOnBlur}
                disabled={this.props.purpose === "DeleteConfirm" ? true : false}
                name="summary"
                type="text"
                className={`w3-input ${
                  this.state.summaryValidation ? "" : "w3-border w3-border-red"
                }`}
              />
            </div>
            <div className="line">
              Description :
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleInputOnChange}
                onBlur={this.hanldeOnBlur}
                disabled={this.props.purpose === "DeleteConfirm" ? true : false}
                name="description"
                className={`w3-input ${
                  this.state.descriptionValidation
                    ? ""
                    : "w3-border w3-border-red"
                }`}
              />
            </div>
            <div className="w3-row line">
              <div className="w3-half s6 w3-col">
                Priority :
                <select
                  disabled={
                    this.props.purpose === "DeleteConfirm" ? true : false
                  }
                  className={`w3-select w3-regular w3-border ${
                    this.state.priorityValidation ? "w3-white" : "w3-red"
                  }`}
                  value={this.state.priority}
                  onChange={this.handleInputOnChange}
                  name="priority"
                  style={{
                    width: "80px",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                >
                  <option value="" disabled selected>
                    None
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="w3-half s6 w3-col" style={{ marginTop: 7 }}>
                Due Date:
                <input
                  onChange={this.handleInputOnChange}
                  onBlur={this.hanldeOnBlur}
                  disabled={
                    this.props.purpose === "DeleteConfirm" ? true : false
                  }
                  name="dueDate"
                  type="text"
                  value={this.state.dueDate}
                  style={{ marginLeft: 5 }}
                  className={`${
                    this.state.dueDateValidation
                      ? ""
                      : "w3-border w3-border-red"
                  }`}
                />
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
