import React, { useState, useEffect } from "react";
import "./TodoModal.css";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';

const TodoModal = ({
    isModalOpen = false,
    isEditMode = false,
    isViewMode = false,
    onEdit = () => { },
    onAdd = () => { },
    onclose = () => { },
    todo = {}
}) => {
    const [values, setValues] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "none"
    });
    const [errors, setErrors] = useState({});
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
    };

    const validate = values => {
        let errors = {};

        if (!values.title) {
            errors.summary = "Summary is required";
        } else if (values.title.length < 10 || values.title.length > 140) {
            errors.summary = "Summary should be 10 - 140 characters";
        } else {
            errors.summary = "";
        }

        if (!values.description) {
            errors.description = "Description is required";
        } else if (
            values.description.length < 10 ||
            values.description.length > 500
        ) {
            errors.description = "Description should be 10 - 500 characters";
        } else {
            errors.description = "";
        }

        return errors;
    };
    const handleChange = event => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
        setErrors(validate(values));
        if (errors.summary || errors.description || values.title === "") {
            setDisableSaveButton(true);
        } else {
            setDisableSaveButton(false);
        }
    };

    const saveTask = () => {
        if (values.title && values.description && !isViewMode) {
            setDisableSaveButton(true);
            dispatch({ type: 'ADD_ITEM_STORAGE', payload: values });
            setValues({ title: "", description: "", dueDate: "", priority: "none" });
            setIsOpen(false);
            onclose();
        }
    };

    const editTask = () => {
        if (values.title && values.description && !isViewMode) {
            setDisableSaveButton(true);
            // onEdit(values, todo.id);
            dispatch({ type: 'EDIT_ITEM_STORAGE', payload: { values, todo: todo } });
            setValues({ title: "", description: "", dueDate: "", priority: "none" });
            setIsOpen(false);
            onclose();
        }
    };

    const closeModal = () => {
        setDisableSaveButton(true);
        setIsOpen(false);
        setValues({ title: "", description: "", dueDate: "", priority: "none" });
        onclose();
    };

    const [isOpen, setIsOpen] = useState(isModalOpen);

    useEffect(() => {
        setIsOpen(isOpen);
        if (isViewMode || isEditMode) {
            setValues({
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority
            });
        }
    }, [isOpen, isEditMode, isViewMode, todo]);


    const modalContainer = <Modal
        isOpen={isOpen}
    >
        <div className="modalContainer">
            <div className="closeBtn">
                <button type="button" onClick={closeModal}>
                    close
</button>
            </div>
            {!isViewMode && !isEditMode && <h2 className="title">Add Task</h2>}
            {isViewMode && <h2 className="title">View Task</h2>}
            {isEditMode && <h2 className="title">Edit Task</h2>}
            <form onSubmit={handleSubmit} noValidate>
                <label>Summary:</label>
                <input
                    type="text"
                    name="title"
                    autoComplete="off"
                    value={values.title}
                    required
                    onChange={handleChange}
                    placeholder={"Summary"}
                    readOnly={isViewMode}
                    autoFocus
                />
                <br />
                {errors.summary && <p class="err">{errors.summary}</p>}
                <label>Description:</label>
                <textarea
                    name="description"
                    autoComplete="off"
                    value={values.description}
                    required
                    onChange={handleChange}
                    readOnly={isViewMode}
                    placeholder={"Enter Here"}
                />
                <br />
                {values.description && errors.description && (
                    <p class="err">{errors.description}</p>
                )}
                <label>Due Date:</label>
                <input
                    type="date"
                    name="dueDate"
                    autoComplete="off"
                    value={new Date(values.dueDate).toLocaleDateString()}
                    required
                    readOnly={isViewMode}
                    onChange={handleChange}
                />
                <br />
                <label>Priority:</label>
                <select
                    value={values.priority}
                    name="priority"
                    onChange={handleChange}
                    disabled={isViewMode}
                >
                    <option value={'none'}>'none'</option>
                    <option value={'low'}>Low</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'high'}>High</option>
                </select>
                <br />
                <br />
                <div className="modal-footer">
                    {isEditMode ? (
                        <button
                            type="submit"
                            disabled={isViewMode || disableSaveButton}
                            onClick={editTask}
                            className="submitBtn"
                        >
                            Edit
                        </button>
                    ) : (
                            <button
                                type="submit"
                                disabled={isViewMode || disableSaveButton}
                                onClick={saveTask}
                                className="submitBtn"
                            >
                                Save
                            </button>
                        )}
                    <button onClick={closeModal} className="cancelBtn">
                        Cancel
</button>{" "}
                </div>
            </form>
        </div>
    </Modal>;
    return isOpen ? modalContainer : null;
};

export default TodoModal;
