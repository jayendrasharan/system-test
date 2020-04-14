import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ToDoConsumer } from "../../context";

export default function TodoModal() {
  return (
    <ToDoConsumer>
      {(value) => {
        const {
          saveNewToDo,
          closeModel,
          ToDo,
          handleChange,
          validateSaveTodo,
        } = value;
        const show = value.isModelOpen;

        if (!show) {
          return null;
        } else {
          return (
            <Modal
              show={show}
              onHide={closeModel}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Add TO-DO</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      placeholder="Enter Title..."
                      className="title form-control"
                      id="title"
                      onChange={handleChange}
                      value={ToDo.title}
                      required
                      maxLength="140"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea
                      placeholder="Enter Summary about To-Do..."
                      className="summary form-control"
                      id="summary"
                      rows="3"
                      onChange={handleChange}
                      value={ToDo.summary}
                      required
                      maxLength="500"
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-6">
                      <label htmlFor="priority">Select Priority</label>
                      <select
                        className="form-control"
                        id="priority"
                        onChange={handleChange}
                        value={ToDo.priority}
                      >
                        <option>None</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label htmlFor="dueDate">Select Due Date :</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        value={ToDo.dueDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModel}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => validateSaveTodo(saveNewToDo)}
                >
                  Save To-Do
                </Button>
              </Modal.Footer>
            </Modal>
          );
        }
      }}
    </ToDoConsumer>
  );
}
