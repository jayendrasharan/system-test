import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoObj: {
        id: Math.random().toString(36).substr(2, 5),
        summary: "",
        description: "",
        priority: "",
        createdOn: new Date(),
        dueDate: new Date(),
        checked: false,
      },
      allTask: this.props.allTask,
      pendingTask: this.props.pendingTask,
      populateTask: this.props.populateTask,
    };
  }

  handleChange(task, e) {
    const { name, value } = e.target;
    let todoObj = this.state.todoObj;
    switch (name) {
      case "summary":
        todoObj.summary = value;
        break;
      case "description":
        todoObj.description = value;
        break;
      case "priority":
        todoObj.priority = value;
        break;
      default:
        break;
    }
    this.setState({
      todoObj,
      [name]: value,
    });
    if (task) {
      const {
        summary,
        description,
        priority,
      } = this.state.todoObj;
      if (summary) {
        this.state.allTask[task.index].summary = summary;
        this.state.pendingTask[task.index].summary = summary;
      }
      if (priority) {
        this.state.allTask[task.index].priority = priority;
        this.state.pendingTask[task.index].priority = priority;
      }
      if (description) {
        this.state.pendingTask[task.index].description = description;
        this.state.allTask[task.index].description = description;
      }
      this.setState({
        allTask: this.state.allTask,
        pendingTask: this.state.pendingTask,
      });
    }
  }

  handleChangeDate(date) {
    let todoObj = this.state.todoObj;
    todoObj.dueDate = date;
    this.setState({
      todoObj: todoObj,
    });
  }

  onSave(task, e) {
    e.preventDefault();
    if (!task) {
      this.setState({
        allTask: this.state.allTask.push(this.state.todoObj),
        pendingTask: this.state.pendingTask.push(this.state.todoObj),
      });
    }

    window.localStorage.setItem("storeAll", JSON.stringify(this.state.allTask));
    window.localStorage.setItem(
      "storePending",
      JSON.stringify(this.state.pendingTask)
    );
    this.props.closePopup();
  }

  render() {
    return (
      <React.Fragment>
        <div className="popup">
          <div className="popup_inner">
            <form onSubmit={(e) => this.onSave(this.state.populateTask, e)}>
              <div className="row">
                <div class="col-sm-12">
                  <div className="form-group">
                    <label>Summary</label>
                    <input
                      type="text"
                      className="form-control"
                      name="summary"
                      onChange={(e) =>
                        this.handleChange(this.state.populateTask, e)
                      }
                      defaultValue={
                        this.state.populateTask
                          ? this.state.populateTask.summary
                          : ""
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      onChange={(e) =>
                        this.handleChange(this.state.populateTask, e)
                      }
                      defaultValue={
                        this.state.populateTask
                          ? this.state.populateTask.description
                          : ""
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="form-group">
                    Priority: &nbsp;
                    <div className="form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="priority"
                        onChange={(e) =>
                          this.handleChange(this.state.populateTask, e)
                        }
                        defaultValue="none"
                        defaultChecked={
                          this.state.populateTask &&
                          this.state.populateTask.priority == "none"
                            ? true
                            : true
                        }
                      />
                      None
                    </div>
                    <div className="form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="priority"
                        onChange={(e) =>
                          this.handleChange(this.state.populateTask, e)
                        }
                        defaultValue="low"
                        defaultChecked={
                          this.state.populateTask &&
                          this.state.populateTask.priority == "low"
                            ? true
                            : false
                        }
                      />
                      Low
                    </div>
                    <div className="form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="priority"
                        onChange={(e) =>
                          this.handleChange(this.state.populateTask, e)
                        }
                        defaultValue="medium"
                        defaultChecked={
                          this.state.populateTask &&
                          this.state.populateTask.priority == "medium"
                            ? true
                            : false
                        }
                      />
                      Medium
                    </div>
                    <div className="form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="priority"
                        onChange={(e) =>
                          this.handleChange(this.state.populateTask, e)
                        }
                        defaultValue="high"
                        defaultChecked={
                          this.state.populateTask &&
                          this.state.populateTask.priority == "high"
                            ? true
                            : false
                        }
                      />
                      High
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="form-group">
                    Due Date: &nbsp;
                    <DatePicker
                      selected={
                        this.state.populateTask && this.state.populateTask.date
                          ? this.state.populateTask.date
                          : this.state.todoObj.dueDate
                      }
                      onChange={(e) =>
                        this.handleChangeDate(this.state.populateTask, e)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <button className="btn btn-primary">Save</button>
                <button
                  className="btn btn-primary"
                  onClick={this.props.closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Popup;
