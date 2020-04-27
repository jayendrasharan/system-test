import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import { deleteTask } from "../../redux/actions/tasksAction";

const DeleteModal = ({
  selectedTask,
  handleClose,
  showDialog,
  onHide,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      show={showDialog}
      size="md"
      onHide={onHide}
      backdrop={"static"}
      centered
    >
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete task ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(deleteTask(selectedTask.id));
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
