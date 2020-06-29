import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import Form from "./Form";
import { addTaskAction } from "../actions";
import "./styles.css";

const AddTask = ({ isAddModelOpen, toggleAdd }) => {
  const dispatch = useDispatch();
  const [isLoading] = useSelector(({ root }) => [root.addingTask]);
  const handleSubmit = (data) => dispatch(addTaskAction(data, toggleAdd));

  return (
    <Fragment>
      <Modal isOpen={isAddModelOpen}>
        <div className="add-task-header">Add Task</div>
        <Form isLoading={isLoading} onSubmit={handleSubmit} onCancel={toggleAdd} />
      </Modal>
    </Fragment>
  );
};

export default AddTask;
