import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "./Button";
import Modal from "./Modal";
import Form from "./Form";

import { addTodo } from "../store/todo";

const AddTodo = ({ addTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = data => {
    console.log("Form Submitted", data);
    setIsOpen(false);
    addTodo(data);
  };
  return (
    <div className="add-todo">
      <Button name="+" class_="todo-btn" onClick={() => setIsOpen(true)} />
      <Modal
        show={isOpen}
        title="Add Todo"
        content={
          <Form
            formId="addForm"
            handleFormSubmit={handleSubmit}
            handleCancel={() => setIsOpen(false)}
          />
        }
        onDismiss={() => setIsOpen(false)}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo))
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
