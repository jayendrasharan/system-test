import React, { Component, Fragment } from "react";
import { Header, Footer } from "./Layouts";
import Tasks from "./ToDo Tasks";
import { lists, tasks } from "../store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
      tsk: {}
    };
  }

  getTasksByList() {
    return Object.entries(
      this.state.tasks.reduce((tasks, task) => {
        const { due } = task;
        tasks[due] = tasks[due] ? [...tasks[due], task] : [task];
        return tasks;
      }, {})
    );
  }

  handleListSelect = category => {
    this.setState({
      category
    });
  };

  handleTaskSelect = id => {
    this.setState(prevState => ({
      tsk: prevState.tasks.find(tsk => tsk.id === id)
    }));
  };

  handleTaskCreate = task => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, task]
    }));
  };

  handleTaskDelete = id =>{
    this.setState(({tasks}) =>({
      tasks : tasks.filter(tsk =>tsk.id!==id)
    }))
  }

  render() {
    const tasks = this.getTasksByList();
    var { category, tsk } = this.state;
    return (
      <Fragment>
        <Header categories={lists} onTaskCreate={this.handleTaskCreate} />

        <Tasks
          tasks={tasks}
          category={category}
          onSelect={this.handleTaskSelect}
          tsk={tsk}
          onDelete = {this.handleTaskDelete}
        />

        <Footer
          category={category}
          lists={lists}
          onSelect={this.handleListSelect}
        />
      </Fragment>
    );
  }
}

export default App;
