import React, { useState, useEffect } from "react";

import Button from "./Button";
import { connect } from "react-redux";

const Form = ({
  type,
  formId,
  handleFormSubmit,
  handleCancel,
  postIdToEdit,
  posts
}) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedOption, setSelectedOption] = useState(false);
  const [priority, setPriority] = useState("none");
  const [dueDate, setDueDate] = useState("");
  const [postToEdit, setPostToEdit] = useState(null);
  const handleOptionChange = ev => {
    setSelectedOption(ev.target.value);
  };

  useEffect(() => {
    populateFields();
  }, []);

  const populateFields = () => {
    if (postIdToEdit !== null) {
      const post = getPostById(postIdToEdit);
      setPostToEdit(post);
      setTitle(post.title);
      setDescription(post.description);
      setPriority(post.priority);
      setDueDate(post.dueDate);
      setSelectedOption(post.currentState);
    }
  };

  let defaultFormType = 0; // ADD Form
  if (type === "edit") {
    defaultFormType = 1;
  }

  const getPostById = id => {
    return posts.find(post => post.id === id);
  };

  const getDate = () => {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  };

  const handleSubmit = () => {
    if (defaultFormType === 0) {
      if (titleError === "" && descriptionError === "") {
        const newTodo = {
          id: Number(Date.now()),
          currentState: selectedOption,
          title,
          description,
          createdAt: getDate(),
          dueDate,
          priority
        };
        handleFormSubmit(newTodo);
      }
    } else {
      const newTodo = {
        id: postToEdit.id,
        currentState: selectedOption,
        title,
        description,
        createdAt: postToEdit.createdAt,
        dueDate,
        priority
      };
      handleFormSubmit(newTodo);
    }
  };

  const actions = function() {
    return (
      <>
        <Button
          name="Save"
          class="submit"
          type="submit"
          onClick={e => handleSubmit()}
        />
        <Button name="Cancel" class="cancel" onClick={() => handleCancel()} />
      </>
    );
  };

  const validateTitle = () => {
    if (title.length < 10) setTitleError("Enter at least 10 characters");
    else if (title.length > 500) setTitleError("Max Length Exceeded");
    else setTitleError("");
  };

  const validateDescription = () => {
    if (description.length < 10)
      setDescriptionError("Enter at least 10 characters");
    else if (description.length > 500)
      setDescriptionError("Max Length Exceeded");
    else setDescriptionError("");
  };

  return (
    <div>
      <form id={formId}>
        <p>
          <label htmlFor="title">
            <span> Title:</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            id="title"
            onBlur={validateTitle}
          />
          <span className="error">{titleError}</span>
        </p>
        <p>
          <label htmlFor="description">
            <span> Description:</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="10"
            cols="30"
            id="description"
            onBlur={validateDescription}
          ></textarea>
          <span className="error">{descriptionError}</span>
        </p>
        {defaultFormType === 1 && (
          <div className="current-state">
            <label>
              <span>Current State:</span>
            </label>
            <fieldset>
              <p className="radio">
                <input
                  type="radio"
                  value="true"
                  checked={selectedOption === true}
                  onChange={e => handleOptionChange(e)}
                  id="closed_task"
                />
                <label htmlFor="closed_task">
                  <span>Closed</span>
                </label>
              </p>
              <p className="radio">
                <input
                  type="radio"
                  value="false"
                  checked={selectedOption === false}
                  onChange={e => handleOptionChange(e)}
                  id="open_task"
                />
                <label htmlFor="open_task">
                  <span>Open</span>
                </label>
              </p>
            </fieldset>
          </div>
        )}
        {defaultFormType === 1 && (
          <p>
            <label>
              <span>Created At:</span>
            </label>
            <span>Some Date</span>
          </p>
        )}
        <p>
          <label htmlFor="due_date">
            <span>Due Date:</span>
          </label>
          <input
            type="date"
            name="due date"
            id="due_date"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="priority">
            <span>Priority</span>
          </label>
          <select
            id="priority"
            value={priority}
            name="priority"
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="none">None</option>
          </select>
        </p>
        {actions()}
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.todos,
    postIdToEdit: state.formEdit
  };
};

export default connect(mapStateToProps)(Form);
