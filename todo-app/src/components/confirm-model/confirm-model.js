import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({show,handleClose, handleYes}) => {
return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Delete Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    Do you want to delete this task?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={handleYes}>Yes</Button>
    </Modal.Footer>
  </Modal>
)
}

export default ConfirmModal;