import React from "react";
import Loader from "react-loader-spinner";

class TodoHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTask: this.props.allTask,
      completedTask: this.props.completedTask,
      pendingTask: this.props.pendingTask,
      eventKey: this.props.eventKey,
      eventKeyProps:
        this.props.eventKey == "completed" ? "completed" : "pending",
    };
  }

  deleteTask(index, event) {
    this.state.pendingTask.forEach((e, i) => {
      if (e.id == this.state.allTask[index].id) {
        this.state.pendingTask.splice(i, 1);
      }
    });
    this.state.completedTask.forEach((e, i) => {
      if (e.id == this.state.allTask[index].id) {
        this.state.completedTask.splice(i, 1);
      }
    });
    this.state.allTask.splice(index, 1);
    this.setState({
      allTask: this.state.allTask,
      pendingTask: this.state.pendingTask,
      completedTask: this.state.completedTask,
    });
    window.localStorage.setItem("storeAll", JSON.stringify(this.state.allTask));
    window.localStorage.setItem(
      "storePending",
      JSON.stringify(this.state.pendingTask)
    );
    window.localStorage.setItem(
      "storeCompleted",
      JSON.stringify(this.state.completedTask)
    );
  }

  currentState(index, e) {
    e.target.checked ? (e.target.value = "close") : (e.target.value = "open");
    if (e.target.value == "open") {
      this.state.allTask[index].checked = false;
      this.state.pendingTask.push(this.state.allTask[index]);
      this.state.completedTask.forEach((e, i) => {
        if (e.id == this.state.allTask[index].id) {
          this.state.completedTask.splice(i, 1);
        }
      });
    } else if (e.target.value == "close") {
      this.state.allTask[index].checked = true;
      this.state.completedTask.push(this.state.allTask[index]);
      this.state.pendingTask.forEach((e, i) => {
        if (e.id == this.state.allTask[index].id) {
          this.state.pendingTask.splice(i, 1);
        }
      });
    }
    this.setState({
      completedTask: this.state.completedTask,
      pendingTask: this.state.pendingTask,
      allTask: this.state.allTask,
    });
    window.localStorage.setItem(
        "storeAll", 
        JSON.stringify(this.state.allTask)
    );
    window.localStorage.setItem(
      "storeCompleted",
      JSON.stringify(this.state.completedTask)
    );
    window.localStorage.setItem(
      "storePending",
      JSON.stringify(this.state.pendingTask)
    );
  }

  render() {
    return (
      <React.Fragment>
        <table className="table" cellSpacing="0">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Priority</th>
              <th>Created On</th>
              <th>Due Date</th>
              {this.state.eventKey == "allTasks" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.eventKey == "allTasks" &&
              this.props.allTask.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.summary}</td>
                    <td>{item.priority}</td>
                    <td>{typeof(item.createdOn)=="object"?item.createdOn.toJSON().split("T")[0]:item.createdOn.split("T")[0]}</td>
                    <td>{typeof(item.dueDate)=="object"?item.createdOn.toJSON().split("T")[0]:item.dueDate.split("T")[0]}</td>
                    <td>
                      <span onClick={() => this.props.editPopup(this, index)}>
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span onClick={this.currentState.bind(this, index)}>
                        <input
                          type="checkbox"
                          defaultValue="open"
                          checked={item.checked}
                        />
                      </span>
                      <span onClick={this.deleteTask.bind(this, index)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            {this.state.eventKey == "completed" &&
              this.props.completedTask.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.summary}</td>
                    <td>{item.priority}</td>
                    <td>{typeof(item.createdOn)=="object"?item.createdOn.toJSON().split("T")[0]:item.createdOn.split("T")[0]}</td>
                    <td>{typeof(item.dueDate)=="object"?item.createdOn.toJSON().split("T")[0]:item.dueDate.split("T")[0]}</td>
                  </tr>
                );
              })}
            {this.state.eventKey == "pending" &&
              this.props.pendingTask.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.summary}</td>
                    <td>{item.priority}</td>
                    <td>{typeof(item.createdOn)=="object"?item.createdOn.toJSON().split("T")[0]:item.createdOn.split("T")[0]}</td>
                    <td>{typeof(item.dueDate)=="object"?item.createdOn.toJSON().split("T")[0]:item.dueDate.split("T")[0]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default TodoHome;
