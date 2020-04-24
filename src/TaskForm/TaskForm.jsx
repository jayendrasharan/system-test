import React, { Component } from "react";
import "./TaskForm.css";

export class TaskForm extends Component {
  render() {
    return (
      <div class="w3-modal" style={{ display: "block" }}>
        <div class="w3-modal-content modalContent taskFormContent">
          <div style={{ textAlign: "center" }}>Add Task</div>
          <div class="w3-container">
            <div className="line">
              Summary :
              <input type="text" className="w3-input" />
            </div>
            <div className="line">
              Description :
              <input type="text" className="w3-input" />
            </div>
            <div className="w3-row line">
              <div className="w3-half s6 w3-col">
                Priority :
                <select
                  disabled={false /*data[0].product_sex === 5 ? true : false*/}
                  className={`w3-select w3-regular w3-border w3-white`}
                  name="option"
                  style={{
                    width: "80px",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                >
                  <option value="" disabled selected>
                    None
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="w3-half s6 w3-col" style={{ marginTop: 7 }}>
                Due Date:
                <input type="date" style={{ marginLeft: 5 }} />
              </div>
            </div>
            <div className="buttonContainer">
              <span className="">
                <button className="formButton">Save</button>
              </span>
              <span className="">
                <button
                  className="formButton"
                  onClick={this.props.cancelClicked}
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
