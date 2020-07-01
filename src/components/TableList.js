import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "./Button";
import EditForm from "./Form";
import Modal from "./Modal";
import TableRow from "./TableRow";

import { deleteTodo, reOpenTodo, markDone, editTodo } from "../store/todo";
import { setFormToEdit, clearFormToEdit } from "../store/formEdit";

const TableList = ({
  todos,
  deleteTodo,
  reOpenTodo,
  markDone,
  setFormToEdit,
  clearFormToEdit,
  editTodo
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleDelete = postId => {
    setDeleteModalIsOpen(true);
    setDeleteItem(postId);
  };

  const handleDone = postId => {
    markDone(postId);
  };

  const onDeleteConfirmation = () => {
    deleteTodo(deleteItem);
    setDeleteItem(null);
    setDeleteModalIsOpen(false);
  };

  const handleOnReOpen = postId => {
    reOpenTodo(postId);
  };

  const handleEdit = postId => {
    setFormToEdit(postId);
    setEditModalIsOpen(true);
  };

  const onEditDismiss = () => {
    setEditModalIsOpen(false);
    clearFormToEdit();
  };

  const openDescriptionModal = postId => {
    const item = todos.find(todo => todo.id === postId);
    const renderDescription = (
      <div>
        <p>Title: {item.title}</p>
        <p>Description: {item.description}</p>
        <p>Created At: {item.createdAt}</p>
        <p>Due Date: {item.dueDate}</p>
        <p>Priority: {item.priority}</p>
        <p>Current State: {item.currentState === true ? "Done" : "Open"}</p>
      </div>
    );
    setModalContent(renderDescription);
    setIsOpenDescriptionModal(true);
  };

  const handleTableRowClick = (e, postId) => {
    e.persist();
    e.stopPropagation();
    if (e.target.matches(".delete")) {
      handleDelete(postId);
    } else if (e.target.matches(".done")) {
      handleDone(postId);
    } else if (e.target.matches(".edit")) {
      handleEdit(postId);
    } else if (e.target.matches(".re-open")) {
      handleOnReOpen(postId);
    } else {
      openDescriptionModal(postId);
    }
  };

  return (
    <>
      <tbody>
        <TableRow handleTableRowClick={handleTableRowClick} />
      </tbody>
      <Modal
        show={editModalIsOpen}
        onDismiss={onEditDismiss}
        title="Edit"
        content={
          <EditForm
            type="edit"
            handleCancel={onEditDismiss}
            handleFormSubmit={res => {
              console.log(res);
              editTodo(res);
              onEditDismiss();
            }}
          />
        }
      />
      <Modal
        show={deleteModalIsOpen}
        onDismiss={() => setDeleteModalIsOpen(false)}
        title="Delete"
        content={<p>Are you sure you want to Delete</p>}
        actions={
          <>
            <Button
              name="Yes! I'm sure"
              onClick={onDeleteConfirmation}
              class_="delete"
            />
            <Button
              name="No! Keep it"
              onClick={() => setDeleteModalIsOpen(false)}
              class_="warning"
            />
          </>
        }
      />
      <Modal
        show={isOpenDescriptionModal}
        onDismiss={() => setIsOpenDescriptionModal(false)}
        title="View Item"
        content={modalContent}
        actions={
          <Button
            name="Okay!"
            onClick={() => setIsOpenDescriptionModal(false)}
          />
        }
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: postId => dispatch(deleteTodo(postId)),
    reOpenTodo: postId => dispatch(reOpenTodo(postId)),
    markDone: postId => dispatch(markDone(postId)),
    editTodo: postId => dispatch(editTodo(postId)),
    setFormToEdit: postId => dispatch(setFormToEdit(postId)),
    clearFormToEdit: postId => dispatch(clearFormToEdit(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
