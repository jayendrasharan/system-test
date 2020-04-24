import React, { Component } from "react";
import "./App.css";
import { AllTasks } from "./AllTasks/AllTasks";
import { NavBar } from "./NavBar/NavBar";
import { TaskForm } from "./TaskForm/TaskForm";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 1,
          currentState: "open",
          title: "Do the dishes",
          description: "I need to do the dishes and what not",
          createdAt: "02/05/2020",
          dueDate: "02/06/2020",
          priority: "High",
        },
        {
          id: 2,
          currentState: "open",
          title: "Code hackathon",
          description: "I need to do the hackathon",
          createdAt: "04/23/2020",
          dueDate: "05/07/2020",
          priority: "Medium",
        },
        {
          id: 3,
          currentState: "close",
          title: "Read Paper",
          description: "I need to do the hackathon",
          createdAt: "04/23/2020",
          dueDate: "05/07/2020",
          priority: "Low",
        },
      ],
      taskFormDisplay: false,
    };
  }

  handleAddButtonClick = () => {
    this.setState({ taskFormDisplay: true });
  };

  handleTaskFormCancelClick = () => {
    this.setState({ taskFormDisplay: false });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        {this.state.taskFormDisplay && (
          <TaskForm cancelClicked={this.handleTaskFormCancelClick} />
        )}
        <NavBar />
        <div className="body">
          <div className="box">
            <AllTasks
              data={data}
              addButtonClicked={this.handleAddButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
