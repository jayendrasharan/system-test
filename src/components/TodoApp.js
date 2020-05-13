import React, { Component } from "react";
import Modal from "./Modal/Modal";
import TodoLists from "./TodoLists";
import Header from "./Header";

class TodoApp extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      isShowing: false,
      currentState: false,
      title: "",
      description: "",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "None",
      sortType: "asc",
      isAll: true,
      isPending: false,
      isCompleted: false,
      readonly: false,
      dataList: [
        {
          id: 123,
          isShowing: false,
          currentState: true,
          title: "Rahul",
          description: "Gym from tommorrow",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: "XLow",
          readonly: false,
        },
        {
          id: 212,
          isShowing: false,
          currentState: false,
          title: "Sahil",
          description: "Check garage",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: "YMedium",
          readonly: false,
        },
        {
          id: 323,
          isShowing: false,
          currentState: false,
          title: "Tanu",
          description: "Buy Groceries",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: "ZHigh",
          readonly: false,
        },
        {
          id: 343,
          isShowing: false,
          currentState: false,
          title: "Saurabh",
          description: "Prepare Chart",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: "WNone",
          readonly: false,
        },
      ],
    };
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("State is updated")
    );
  };

  handleChangeDate = (date) => {
    this.setState({
      dueDate: date,
    });
  };

  openModalHandler = () => {
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  handleSubmit = (e) => {
    if (this.state.title.length <= 5 || this.state.description.length <= 5) {
      return alert(
        "Please enter summary/description with minLength of 5 words"
      );
    }
    this.closeModalHandler();
    let idPresent = this.state.dataList.findIndex(
      (list) => list.id === this.state.id
    );
    const {
      id,
      currentState,
      title,
      description,
      createdAt,
      dueDate,
      priority,
      dataList,
    } = this.state;

    // For Editing checking index is present and then update the array of datalist

    if (idPresent > 0) {
      const listToAdd = {
        id: this.state.id,
        currentState: this.state.currentState,
        title: this.state.title,
        description: this.state.description,
        createdAt: this.state.createdAt,
        dueDate: this.state.dueDate,
        priority: this.state.priority,
      };
      const updateList = this.state.dataList.map((list) => {
        if (list.id === this.state.id) return listToAdd;
        else return list;
      });
      this.setState({
        id: id + 1,
        currentState: false,
        title: "",
        description: "",
        createdAt: new Date(),
        dueDate: new Date(),
        priority: "None",
        dataList: updateList,
      });
    } else {
      const newDataList = [
        ...dataList,
        {
          id: id + 1,
          currentState,
          title,
          description,
          createdAt,
          dueDate,
          priority,
        },
      ];

      this.setState({
        id: id + 1,
        currentState: false,
        title: "",
        description: "",
        createdAt: new Date(),
        dueDate: new Date(),
        priority: "None",
        dataList: newDataList,
      });
    }
  };

  handleEdit = (e, id) => {
    e.stopPropagation();
    this.openModalHandler();
    const list = this.state.dataList.find((item) =>
      item.id === id ? item : ""
    );
    return this.setState({
      id: list.id,
      currentState: list.currentState,
      title: list.title,
      description: list.description,
      createdAt: list.createdAt,
      dueDate: list.dueDate,
      priority: list.priority,
      readonly: false,
    });
  };

  handleReadOnly = (id) => {
    this.openModalHandler();
    this.state.dataList.map((list) => {
      if (list.id !== id) return null;
      return this.setState({
        id: list.id,
        currentState: list.currentState,
        title: list.title,
        description: list.description,
        createdAt: list.createdAt,
        dueDate: list.dueDate,
        priority: list.priority,
        readonly: true,
      });
    });
  };

  handleDelete = (e, id) => {
    e.stopPropagation();
    this.setState((prevState) => ({
      dataList: prevState.dataList.filter((list) => list.id !== id),
    }));
  };

  isListPending = (e, id) => {
    e.stopPropagation();
    const updateList = this.state.dataList.map((list) =>
      list.id === id ? { ...list, currentState: !list.currentState } : list
    );
    this.setState(
      {
        dataList: updateList,
      },
      () => this.forceUpdate()
    );
  };

  onSortBasedOnHeader = (sortKey, sortType) => {
    let list = this.state.dataList;
    if (sortKey === "title" || sortKey === "priority") {
      if (sortType === "asc") {
        list = list.sort(function (a, b) {
          return a[sortKey].toLowerCase() < b[sortKey].toLowerCase() ? -1 : 1;
        });
      } else {
        list = list.sort(function (a, b) {
          return b[sortKey].toLowerCase() < a[sortKey].toLowerCase() ? -1 : 1;
        });
      }
    }
    if (sortKey === "createAt" || sortKey === "dueDate") {
      if (sortType === "asc") {
        list = list.sort(function (a, b) {
          return new Date(a[sortKey]) - new Date(b[sortKey]);
        });
      } else if (sortType === "desc") {
        list = list.sort(function (a, b) {
          return new Date(b[sortKey]) - new Date(a[sortKey]);
        });
      }
    }

    if (sortKey === "currentState") {
      if (sortType === "asc") {
        list = list.sort(function (a, b) {
          return a[sortKey] === b[sortKey] ? 0 : a[sortKey] ? -1 : 1;
        });
      } else list = list.sort((a, b) => b - a).reverse();
    }

    this.setState(
      {
        dataList: list,
        sortType: sortType === "asc" ? "desc" : "asc",
      },
      () => this.forceUpdate()
    );
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  handleCheckbox = (e, id) => {
    e.stopPropagation();
    if (this.selectedCheckboxes.has(id)) {
      this.selectedCheckboxes.delete(id);
    } else {
      this.selectedCheckboxes.add(id);
    }
  };

  handleMarkAllButton = () => {
    let listData = this.state.dataList;
    for (const checkbox of this.selectedCheckboxes) {
      listData = listData.map((list) =>
        list.id === checkbox ? { ...list, currentState: true } : list
      );
    }
    this.setState({
      dataList: listData,
    });
  };

  handleRadioButtons = (e) => {
    if (e.target.name === "isAll") {
      this.setState({
        [e.target.name]: true,
        isPending: false,
        isCompleted: false,
      });
    } else if (e.target.name === "isPending") {
      this.setState({
        [e.target.name]: true,
        isAll: false,
        isCompleted: false,
      });
    } else {
      this.setState({
        [e.target.name]: true,
        isAll: false,
        isPending: false,
      });
    }
  };
  render() {
    return (
      <>
        <Header
          dataList={this.state}
          handleRadioButtons={this.handleRadioButtons}
        />
        <TodoLists
          data={this.state}
          dataList={this.state.dataList}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onCurrentStateChange={this.isListPending}
          onSortBasedOnHeaderData={this.onSortBasedOnHeader}
          toggleCheckbox={this.handleCheckbox}
          onClickForReadOnly={this.handleReadOnly}
        />
        <div>
          <button
            className="btn btn-success"
            data-backdrop="false"
            onClick={this.handleMarkAllButton}
          >
            Mark as Done
          </button>
          {this.state.isShowing ? (
            <div onClick={this.closeModalHandler}></div>
          ) : null}
          {!this.state.isShowing ? (
            <button
              className="btn btn-success"
              id="align-btn"
              data-backdrop="false"
              onClick={this.openModalHandler}
            >
              Add Task
            </button>
          ) : null}
          <br />
          <br />
          <br />
          <Modal
            className="modal"
            data={this.state}
            show={this.state.isShowing}
            close={this.closeModalHandler}
            onChangeEvent={this.handleChange}
            onChangeEventDate={this.handleChangeDate}
            onSubmitData={this.handleSubmit}
          ></Modal>
        </div>
      </>
    );
  }
}

export default TodoApp;
