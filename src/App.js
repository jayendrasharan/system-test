import React, { Component } from "react";
import "./App.css";
import { AllTasks } from "./AllTasks/AllTasks";
import { NavBar } from "./NavBar/NavBar";
import { TaskForm } from "./TaskForm/TaskForm";

window.id = 3;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      taskFormDisplay: false,
      summary: "",
      description: "",
      priority: "",
      dueDate: "",
      taskCreationDate: "",
      purpose: "AddTask",
      id: "",
    };
  }

  handleAddTask = (summary, description, priority, dueDate, creationDate) => {
    let newTask = {
      id: ++window.id,
      currentState: true,
      title: summary,
      description: description,
      createdAt: creationDate,
      dueDate: dueDate,
      priority: priority,
    };
    let tempData = this.state.data;
    tempData.push(newTask);
    tempData.sort(this.sortByPropertyDescOrder("id"));
    this.setState({ data: tempData }, () => {
      console.log(this.state.data);
    });
    this.setState({ taskFormDisplay: false });
  };

  handleTaskCardClick = (id) => {
    let dataToBeShown = this.state.data.filter((element) => element.id === id);
    this.setState({
      taskFormDisplay: true,
      summary: dataToBeShown[0].title,
      description: dataToBeShown[0].description,
      priority: dataToBeShown[0].priority,
      dueDate: dataToBeShown[0].dueDate,
      taskCreationDate: dataToBeShown[0].createdAt,
      id: id,
      purpose: "TaskShow",
    });
    console.log(
      "task creation data from task card click",
      dataToBeShown[0].createdAt
    );
  };

  handleEditTaskClick = (id) => {
    let dataToBeEdited = this.state.data.filter((element) => element.id === id);
    this.setState({
      taskFormDisplay: true,
      summary: dataToBeEdited[0].title,
      description: dataToBeEdited[0].description,
      priority: dataToBeEdited[0].priority,
      dueDate: dataToBeEdited[0].dueDate,
      taskCreationDate: dataToBeEdited[0].createdAt,
      id: id,
      purpose: "EditTask",
    });
  };

  handleRemoveTaskClick = (id) => {
    let dataToBeDeleted = this.state.data.filter(
      (element) => element.id === id
    );
    this.setState({
      taskFormDisplay: true,
      summary: dataToBeDeleted[0].title,
      description: dataToBeDeleted[0].description,
      priority: dataToBeDeleted[0].priority,
      dueDate: dataToBeDeleted[0].dueDate,
      taskCreationDate: dataToBeDeleted[0].createdAt,
      id: id,
      purpose: "DeleteConfirm",
    });
  };

  handleTaskCloseOpenClick = (id) => {
    let tempData = this.state.data;
    tempData.forEach((element) => {
      if (element.id === id) {
        element.currentState = !element.currentState;
      }
    });
    this.setState({ data: tempData });
  };

  handleAddButtonClick = () => {
    this.setState({
      taskFormDisplay: true,
      summary: "",
      description: "",
      priority: "",
      dueDate: "",
      id: "",
      purpose: "AddTask",
    });
  };

  handleTaskFormCancelClick = () => {
    this.setState({ taskFormDisplay: false });
  };

  handleDeleteConfirmed = (id) => {
    let newData = this.state.data.filter((element) => element.id !== id);
    this.setState({ data: newData, taskFormDisplay: false });
  };

  handleEditTask = (summary, description, priority, dueDate, id) => {
    let dataToBeEdited = this.state.data.filter((element) => element.id === id);
    if (
      dataToBeEdited[0].title.trim() === summary.trim() &&
      dataToBeEdited[0].description.trim() === description.trim() &&
      dataToBeEdited[0].priority.trim() === priority.trim() &&
      dataToBeEdited[0].dueDate.trim() === dueDate.trim()
    ) {
      this.setState({
        taskFormDisplay: false,
      });
    } else {
      let tempData = this.state.data;
      tempData.forEach((element) => {
        if (element.id === id) {
          element.title = summary;
          element.description = description;
          element.priority = priority;
          element.dueDate = dueDate;
        }
      });
      this.setState({
        taskFormDisplay: false,
      });
    }
  };

  sortByPropertyDescOrder = (property) => {
    return function (a, b) {
      if (a[property] < b[property]) return 1;
      else if (a[property] > b[property]) return -1;
      return 0;
    };
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        {this.state.taskFormDisplay && (
          <TaskForm
            id={this.state.id}
            summary={this.state.summary}
            description={this.state.description}
            priority={this.state.priority}
            dueDate={this.state.dueDate}
            taskCreationDate={this.state.taskCreationDate}
            cancelClicked={this.handleTaskFormCancelClick}
            addTask={this.handleAddTask}
            EditTask={this.handleEditTask}
            purpose={this.state.purpose}
            DeleteConfirmedClicked={this.handleDeleteConfirmed}
          />
        )}
        <NavBar />
        <div className="body">
          <div className="box">
            <AllTasks
              data={data}
              addButtonClicked={this.handleAddButtonClick}
              taskcardClicked={this.handleTaskCardClick}
              editTaskClicked={this.handleEditTaskClick}
              removeTaskClicked={this.handleRemoveTaskClick}
              closeOpenClicked={this.handleTaskCloseOpenClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
