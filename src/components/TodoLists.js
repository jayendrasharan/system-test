import React, { Component } from "react";
import "./Modal/Modal.css";
import dateformat from "dateformat";

class TodoLists extends Component {
  state = {
    sorted: false,
  };
  handleToggle = (sortKey) => {
    if (this.state.sorted) {
      this.props.onSortBasedOnHeaderData(sortKey, "asc");
    } else {
      this.props.onSortBasedOnHeaderData(sortKey, "desc");
    }
    this.setState({ sorted: !this.state.sorted });
  };
  renderTableHeader() {
    if (this.props.dataList.length > 0) {
      return (
        <>
          <th>Mark</th>
          <th onClick={() => this.handleToggle("title")}>Summary</th>
          <th onClick={() => this.handleToggle("priority")}>Priority</th>
          <th onClick={() => this.handleToggle("createdAt")}>Created At</th>
          <th onClick={() => this.handleToggle("dueDate")}>Due Date</th>
          <th onClick={() => this.handleToggle("currentState")}>
            Current State
          </th>
          <th>Action</th>
        </>
      );
    }
  }

  renderTableData() {
    return this.props.dataList
      .filter(
        (item) =>
          this.props.data.isAll ||
          (this.props.data.isPending && item.currentState === false) ||
          (this.props.data.isCompleted && item.currentState === true)
      )
      .map((todos, index) => {
        const { id, currentState, title, createdAt, dueDate, priority } = todos; //destructuring
        return (
          <tr key={id} onClick={() => this.props.onClickForReadOnly(id)}>
            <td>
              <input
                type="checkbox"
                name={id}
                onClick={(e) => this.props.toggleCheckbox(e, id)}
                disabled={currentState}
              />
            </td>
            <td
              style={{
                textDecoration: currentState ? "line-through" : "none",
              }}
              onClick={() => this.props.onClickForReadOnly(id)}
            >
              {title}
            </td>
            <td
              style={{
                textDecoration: currentState ? "line-through" : "none",
              }}
            >
              {priority === "ZHigh"
                ? "High"
                : priority === "YMedium"
                ? "Medium"
                : priority === "XLow"
                ? "Low"
                : "None"}
            </td>
            <td
              style={{
                textDecoration: currentState ? "line-through" : "none",
              }}
            >{`${dateformat(new Date(createdAt), "dd/mm/yyyy")}`}</td>
            <td
              style={{
                textDecoration: currentState ? "line-through" : "none",
              }}
            >{`${dateformat(new Date(dueDate), "dd/mm/yyyy")}`}</td>
            <td>{currentState ? "Done" : "Pending"}</td>
            <td>
              <button
                type="button"
                onClick={(e) => this.props.onCurrentStateChange(e, id)}
                className="btn btn-info btn-sm"
              >
                {currentState ? "Reopen" : "Done"}
              </button>
              &nbsp;&nbsp;
              <i
                className="fa fa-pencil"
                onClick={(e) => this.props.onEdit(e, id)}
              ></i>
              &nbsp;&nbsp;
              <i
                className="fa fa-trash"
                onClick={(e) => {
                  if (window.confirm("Do you want to delete this list?")) {
                    this.props.onDelete(e, id);
                  } else e.stopPropagation();
                }}
              ></i>
            </td>
          </tr>
        );
      });
  }
  render() {
    return (
      <div>
        <table id="todoListItems">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodoLists;
