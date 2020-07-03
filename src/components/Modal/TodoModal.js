import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { MODAL_TYPES } from "../../models/modalType";
import { addTask, editTask } from "../../redux/actions/tasksAction";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoModal.css";

const CustomDateButton = ({ value, onClick }) => {
  return (
    <Button
      className="example-custom-input"
      onClick={onClick}
      variant={"light"}
    >
      {value}
    </Button>
  );
};

const TodoModal = ({ selectedTask, modalType, showDialog, handleClose }) => {
  const dispatch = useDispatch();
  const getTask = () =>
    modalType === MODAL_TYPES.ADD_TASK_MODAL
      ? {
          title: "",
          description: "",
          completed: false,
          priority: "none",
          dueDate: moment().toDate(),
        }
      : selectedTask;

  const [task, setTask] = useState(getTask());

  const handleValueChange = (key, value) => {
    let editedTask = { ...task };
    editedTask[key] = value;
    setTask(editedTask);
  };

  const { title, priority, description, dueDate } = task;
  console.log(task);
  const viewOnly = modalType === MODAL_TYPES.VIEW_TASK_MODAL;
  const editMode = modalType === MODAL_TYPES.EDIT_TASK_MODAL;
  return (
    <Modal
      show={showDialog}
      size={"lg"}
      onHide={handleClose}
      backdrop={"static"}
      centered
    >
      <Modal.Header closeButton={viewOnly}>
        <Modal.Title>
          {viewOnly
            ? "New Task"
            : modalType === MODAL_TYPES.VIEW_TASK_MODAL
            ? "View Task"
            : "Edit Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-padding" disabled={viewOnly}>
        <Row className="row-margin">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            disabled={viewOnly}
            placeholder="Summary"
            value={title}
            onChange={(e) => {
              handleValueChange("title", e.target.value);
            }}
          />
        </Row>
        <Row className="row-margin">
          <Form.Label>Description</Form.Label>
          <Form.Control
            disabled={viewOnly}
            as={"textarea"}
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => {
              handleValueChange("description", e.target.value);
            }}
          />
        </Row>
        <Row className="row-margin">
          <Col>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                disabled={viewOnly}
                selected={moment(task.createdOn).toDate()}
                onChange={(date) => {
                  handleValueChange("dueDate", moment(date));
                }}
                minDate={Date.now()}
                placeholderText="Pick A Due Date"
                dateFormat={"dd-MM-yyyy"}
                customInput={<CustomDateButton />}
              />
            </div>
          </Col>
          <Col>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              disabled={viewOnly}
              as="select"
              value={priority}
              onChange={(e) => {
                handleValueChange("priority", e.target.value);
              }}
            >
              <option>none</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </Form.Control>
          </Col>
        </Row>
        {viewOnly && (
          <Row className="row-margin">
            <Col>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label>Created On</Form.Label>
                <DatePicker
                  disabled={viewOnly}
                  selected={moment(dueDate).toDate()}
                  minDate={Date.now()}
                  placeholderText="Pick A Due Date"
                  dateFormat={"dd-MM-yyyy"}
                  customInput={<CustomDateButton />}
                />
              </div>
            </Col>
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Control
                disabled={viewOnly}
                placeholder="Summary"
                value={task.completed ? "Completed" : "Pending"}
              />
            </Col>
          </Row>
        )}
      </Modal.Body>
      {!viewOnly && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (editMode) {
                dispatch(editTask(task.id, task));
              } else {
                dispatch(addTask(task));
              }
              handleClose();
            }}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default TodoModal;
