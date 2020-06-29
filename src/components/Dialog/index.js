import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import "./styles.css";

const Dialog = ({ isVisible, message, onCancel, onProceed }) => {
  return (
    <Modal isOpen={isVisible}>
      <div className="dialog">
        <div className="dialog-header">{message}</div>
        <div className="dialog-actions">
          <Button default onClick={onCancel}>
            Cancel
          </Button>
          <Button primary onClick={onProceed}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
