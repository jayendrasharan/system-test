import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import Form from "./Form";
import { editTaskAction, toggleEditAction } from "../actions";
import "./styles.css";

const EditTask = () => {
  const dispatch = useDispatch();
  const [isLoading, showEditModal, editPayload] = useSelector(({ root }) => [
    root.editingTask,
    root.showEditModal,
    root.editPayload,
  ]);

  const handleSubmit = (data) => {
    dispatch(editTaskAction(data));
    toggleModal();
  };
  const toggleModal = () => {
    const payload = { _id: undefined };
    dispatch(toggleEditAction(payload));
  };
  return (
    <Fragment>
      <Modal isOpen={showEditModal}>
        <div className="add-task-header">Edit Task</div>
        <Form
          prefill={editPayload}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={toggleModal}
        />
      </Modal>
    </Fragment>
  );
};

export default EditTask;
