import React from "react";
import uuid from "react-uuid";

import { sample } from "./Data";
import customeDate from "./utility/date";

const ToDoContext = React.createContext();

class ToDoProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: [],
      ToDo: {
        id: uuid(),
        title: "",
        summary: "",
        createdAt: customeDate(),
        dueDate: customeDate(),
        priority: "none",
        isCompleted: false,
      },
      isModelOpen: false,
      isViewModelOpen: false,
      searchStr: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      ToDo: {
        ...this.state.ToDo,
        [e.target.id]: e.target.value,
      },
    });
  };

  validateSaveTodo = () => {
    if (this.state.ToDo.title.length < 10) {
      alert("Please Enter Title above 10 Charecters...");
    } else if (this.state.ToDo.summary.length < 10) {
      alert("Please Enter Summary atleast 10 Charecters...");
    } else {
      this.saveNewToDo(this.state.ToDo);
      this.setState({
        ...this.state,
        ToDo: {
          id: uuid(),
          title: "",
          summary: "",
          createdAt: customeDate(),
          dueDate: customeDate(),
          priority: "none",
          isCompleted: false,
        },
        isModelOpen: false,
      });
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      allTodos: [...this.state.allTodos, ...sample],
    });
  }

  openViewModel = (id) => {
    let todo = this.state.allTodos.find((todo) => (todo.id === id ? todo : ""));
    console.log(todo);
    this.setState({
      ...this.state,
      ToDo: todo,
      isViewModelOpen: true,
    });
  };

  closeViewModel = () => {
    this.setState({
      ...this.state,
      isViewModelOpen: false,
    });
  };

  openModel = () => {
    this.setState({
      ...this.state,
      isModelOpen: true,
    });
  };

  closeModel = () => {
    this.setState({
      ...this.state,
      isModelOpen: false,
    });
  };

  saveNewToDo = (todo) => {
    let alltodos = this.state.allTodos;
    let index = alltodos.findIndex((Todo) => Todo.id === todo.id);
    if (index !== -1) {
      alltodos[index] = todo;
    } else {
      alltodos.push(todo);
    }
    this.setState(() => {
      return {
        ...this.state,
        allTodos: [...alltodos],
      };
    });
    this.closeModel();
  };

  deleteToDo = (id) => {
    let alltodos = this.state.allTodos.filter((todo) => todo.id !== id);
    this.setState({
      ...this.state,
      allTodos: alltodos,
    });
  };

  editToDo = (id) => {
    let todo = this.state.allTodos.find((todo) => todo.id === id);
    this.setState({
      ...this.state,
      ToDo: todo,
      isModelOpen: true,
    });
  };

  toggleStatusToDo = (id) => {
    let alltodos = this.state.allTodos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState({
      ...this.state,
      allTodos: alltodos,
    });
  };

  searchToDo = (str) => {
    console.log(str);
    let alltodo = this.state.allTodos.map((todo) => {
      if (
        (todo.title.toUpperCase().search(str.toUpperCase()) !== -1 ||
          todo.summary.toUpperCase().search(str.toUpperCase()) !== -1) &&
        str !== ""
      ) {
        return { ...todo, haveSearchString: true };
      } else {
        return { ...todo, haveSearchString: false };
      }
    });

    this.setState({
      ...this.state,
      allTodos: alltodo,
    });
  };

  handleStrChange = (e) => {
    this.setState(
      {
        ...this.state,
        searchStr: e.target.value,
      },
      () => this.searchToDo(this.state.searchStr)
    );
  };

  sortToDo = (key) => {
    let alltodo = this.state.allTodos.sort((a, b) => a[key] > b[key]);
    console.log(alltodo);
    this.setState({
      ...this.state,
      allTodos: alltodo,
    });
  };

  render() {
    return (
      <ToDoContext.Provider
        value={{
          ...this.state,
          openModel: this.openModel,
          closeModel: this.closeModel,
          saveNewToDo: this.saveNewToDo,
          closeViewModel: this.closeViewModel,
          openViewModel: this.openViewModel,
          deleteToDo: this.deleteToDo,
          handleChange: this.handleChange,
          validateSaveTodo: this.validateSaveTodo,
          editToDo: this.editToDo,
          toggleStatusToDo: this.toggleStatusToDo,
          searchToDo: this.searchToDo,
          handleStrChange: this.handleStrChange,
          sortToDo: this.sortToDo,
        }}
      >
        {this.props.children}
      </ToDoContext.Provider>
    );
  }
}

const ToDoConsumer = ToDoContext.Consumer;

export { ToDoProvider, ToDoConsumer };
