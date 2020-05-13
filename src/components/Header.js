import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">
            <h1>Todo list</h1>
          </span>
          <div
            style={{
              flexDirection: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input type="text" className="input" placeholder="Search..." />
            <label className="radio-inline">
              <input
                type="radio"
                name="isAll"
                value={!this.props.isAll}
                checked={this.props.dataList.isAll}
                onClick={(e) => this.props.handleRadioButtons(e)}
              />
              All Tasks
            </label>
            &nbsp;&nbsp;&nbsp;
            <label className="radio-inline">
              <input
                type="radio"
                name="isPending"
                checked={this.props.dataList.isPending}
                value={!this.props.dataList.isPending}
                onClick={(e) => this.props.handleRadioButtons(e)}
              />
              Pending Tasks
            </label>
            &nbsp;&nbsp;&nbsp;
            <label className="radio-inline">
              <input
                type="radio"
                name="isCompleted"
                value={!this.props.dataList.isCompleted}
                checked={this.props.dataList.isCompleted}
                onClick={(e) => this.props.handleRadioButtons(e)}
              />
              Completed Tasks
            </label>
            &nbsp;&nbsp;&nbsp;
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
