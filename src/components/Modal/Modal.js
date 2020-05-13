import React, { Component } from "react";
import "./Modal.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keyup", this.escFunction, false);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.escFunction, false);
  }
  escFunction(event) {
    if (event.keyCode === 27) {
      this.props.close();
      event.stopPropagation();
    }
  }
  render() {
    return (
      <div>
        <div
          className="modal-wrapper"
          style={{
            transform: this.props.show
              ? "translateY(0vh)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          <div className="modal-header">
            <h3>Modal Header</h3>
            <span className="close-modal-btn" onClick={this.props.close}>
              ×
            </span>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Summary:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Summary"
                  name="title"
                  value={this.props.data.title}
                  onChange={this.props.onChangeEvent}
                  disabled={this.props.data.readonly}
                  minLength="10"
                  maxLength="140"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Description"
                  name="description"
                  value={this.props.data.description}
                  onChange={this.props.onChangeEvent}
                  readOnly={this.props.data.readonly}
                  minLength="10"
                  maxLength="500"
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Priority:</label>
                  <select
                    name="priority"
                    value={this.props.data.priority}
                    onChange={this.props.onChangeEvent}
                    className="form-control"
                    readOnly={this.props.data.readonly}
                  >
                    <option value="WNone">None</option>
                    <option value="ZHigh">High</option>
                    <option value="YMedium">Medium</option>
                    <option value="XLow">Low</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label>Due Date:</label>
                  <DatePicker
                    className="form-control"
                    todayButton="Today"
                    onChange={this.props.onChangeEventDate}
                    name="dueDate"
                    selected={this.props.data.dueDate}
                    readOnly={this.props.data.readonly}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={this.props.close}>
              Cancel
            </button>
            {!this.props.data.readonly ? (
              <button
                className="btn-continue"
                disabled={
                  this.props.data.title === "" ||
                  this.props.data.description === ""
                }
                onClick={this.props.onSubmitData}
              >
                Save
              </button>
            ) : null}
            ;
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
