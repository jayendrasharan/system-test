import React from "react";
import { ToDoConsumer } from "../../context";
import { Modal } from "react-bootstrap";

export default function ViewToDo() {
  return (
    <ToDoConsumer>
      {(value) => {
        const { isViewModelOpen, closeViewModel } = value;
        const todo = value.ToDo;
        if (!isViewModelOpen) {
          return null;
        } else {
          return (
            <Modal
              show={isViewModelOpen}
              onHide={closeViewModel}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{todo.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{todo.summary}</Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <b>Created On : </b>
                    {todo.createdAt}
                  </div>
                  <div className="col-6">
                    <b>Due On : </b>
                    {todo.dueDate}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <b>Priority : </b>
                    {todo.priority}
                  </div>
                </div>
              </div>
            </Modal>
          );
        }
      }}
    </ToDoConsumer>
  );
}
