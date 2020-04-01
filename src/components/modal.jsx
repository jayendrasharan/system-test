import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

const initialState = {
  data: {
    id: "",
    title: "",
    description: "",
    priority: "none",
    createdAt: "",
    dueDate: "",
    currentState: "open"
  },
  errors: {}
};

class CustModal extends Component {
  constructor(props) {
    super(props);
    this.props.type === "create"
      ? (this.state = {
          data: { ...initialState.data },
          errors: { ...initialState.errors }
        })
      : (this.state = { data: { ...this.props.data }, errors: {} });
    this.myPriorityHandler = this.myPriorityHandler.bind(this);
  }
  myTitleHandler = event => {
    let data = this.state.data;
    data["title"] = event.target.value;
    this.setState({ data });
  };
  myDescriptionHandler = event => {
    let data = this.state.data;
    data["description"] = event.target.value;
    this.setState({ data });
  };
  myPriorityHandler(event) {
    let data = this.state.data;
    data["priority"] = event.target.value;
    this.setState({ data });
  }
  myDateHandler = event => {
    let data = this.state.data;
    data["dueDate"] = event.target.value;
    this.setState({ data });
  };
  fieldsValidator = () => {
    let data = this.state.data;
    let errors = {};
    var formIsValid = true;
    if (data["title"].length < 10) {
      formIsValid = false;
      errors["title"] = "Title should be greater than 10 characters";
    } else if (data["title"].length > 140) {
      formIsValid = false;
      errors["title"] = "Title should not exceed 140 characters";
    }
    if (data["description"].length < 10) {
      formIsValid = false;
      errors["description"] =
        "description should be greater than 10 characters";
    } else if (data["description"].length > 500) {
      formIsValid = false;
      errors["description"] = "description should not exceed 500 characters";
    }
    if (data["dueDate"] === "") {
      formIsValid = false;
      errors["dueDate"] = "please select a date";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  submit = () => {
    if (this.fieldsValidator()) {
      let newTodo = { ...this.state.data };
      newTodo["createdAt"] = new Date().toISOString().slice(0, 10);
      this.props.submit(newTodo);
      this.closeModel();
    }
  };
  checkChanges = upddata => {
    let actData = this.props.data;
    if (
      upddata.title !== actData.title ||
      upddata.description !== actData.description ||
      upddata.priority !== actData.priority ||
      upddata.dueDate !== actData.dueDate
    )
      return true;
    return false;
  };
  update = () => {
    if (this.fieldsValidator()) {
      let updateData = { ...this.state.data };
      if (this.checkChanges(updateData)) {
        console.log("inside");
        this.props.onUpdateTodo(updateData);
      }
      this.closeModel();
    }
  };
  delete = () => {
    this.props.onDeleteTodo(this.state.data.id);
    this.closeModel();
  };
  closeModel = () => {
    this.setState({
      data: { ...initialState.data },
      errors: { ...initialState.errors }
    });
    this.props.onHide();
  };
  render() {
    const type = this.props.type;
    return (
      <Modal
        show={this.props.show}
        onHide={this.closeModel}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "create"
              ? "Create a New Todo"
              : type === "update"
              ? "Update Todo"
              : type === "delete"
              ? "Delete Todo"
              : "View Todo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "delete" ? (
            <h3>Are you Sure</h3>
          ) : (
            <div>
              {" "}
              <label>
                Title:
                {type === "view" ? (
                  <span> {this.state.data.title}</span>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.myTitleHandler}
                      value={this.state.data.title}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors["title"]}
                    </span>
                  </div>
                )}
              </label>
              <br />
              <label>
                Description:
                {type === "view" ? (
                  <span> {this.state.data.description}</span>
                ) : (
                  <div>
                    <textarea
                      className="form-control"
                      onChange={this.myDescriptionHandler}
                      rows="3"
                      value={this.state.data.description}
                    ></textarea>
                    <span style={{ color: "red" }}>
                      {this.state.errors["description"]}
                    </span>
                  </div>
                )}
              </label>
              <br />
              <label>Priority:</label>
              {type === "view" ? (
                <span> {this.state.data.priority}</span>
              ) : (
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      value="none"
                      checked={this.state.data.priority === "none"}
                      onChange={this.myPriorityHandler}
                    />
                    <label className="form-check-label">None</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      value="low"
                      checked={this.state.data.priority === "low"}
                      onChange={this.myPriorityHandler}
                    />
                    <label className="form-check-label">low</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      value="medium"
                      checked={this.state.data.priority === "medium"}
                      onChange={this.myPriorityHandler}
                    />
                    <label className="form-check-label">medium</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      value="high"
                      checked={this.state.data.priority === "high"}
                      onChange={this.myPriorityHandler}
                    />
                    <label className="form-check-label">high</label>
                  </div>
                </div>
              )}
              <br />
              <label>Due date:</label>
              {type === "view" ? (
                <span> {this.state.data.dueDate}</span>
              ) : (
                <div>
                  <input
                    type="date"
                    onChange={this.myDateHandler}
                    value={this.state.data.dueDate}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["dueDate"]}
                  </span>
                </div>
              )}
              {type === "view" ? (
                <div>
                  <label>Created on:</label>
                  <span>{this.state.data.createdAt}</span>
                  <br />
                  <label>status:</label>
                  <span>{this.state.data.currentState}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModel}>
            {type === "delete" ? "No" : "Close"}
          </Button>
          {type === "create" ? (
            <Button variant="primary" onClick={this.submit}>
              Save
            </Button>
          ) : type === "update" ? (
            <Button variant="primary" onClick={this.update}>
              save changes
            </Button>
          ) : type === "delete" ? (
            <Button variant="primary" onClick={this.delete}>
              Yes
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CustModal;
