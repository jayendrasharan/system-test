import cn from "classnames";
import React, { useState } from "react";
import { Col, Row } from "react-flexbox-grid";
import Select from "react-select";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../../redux/actions";
import { CrudActions, priorityOptions, CurrentStates } from "../../constants";
import { isEmpty, map, isEqual } from "lodash";

function TaskForm(props) {
    const [todo, setTodo] = useState(props.todo);
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const isViewMode = props.action === CrudActions.View;

    const getError = (type, value) => {
        if (value === "") {
            return "*This field is required";
        } else if (type === "title" || type === "description") {
            if (value.length < 10) {
                return "*Should be atleast 10 characters long";
            } else if (type === "title" && value.length > 140) {
                return "*Cannot be more than 140 characters long";
            } else if (type === "description" && value.length > 500) {
                return "*Cannot be more than 500 characters long";
            }
        }
    }
    const validateFields = (type = "", value = "") => {
        const errorsTemp = errors;
        let isError = false;
        if (isEmpty(type)) {
            map(Object.keys(todo), key => {
                if (!isEmpty(getError(key, todo[key]))) {
                    errorsTemp[key] = getError(key, todo[key]);
                    isError = true;
                }
            })
            setErrors({ ...errorsTemp });
            return isError;
        } else {
            setErrors({
                ...errors,
                [type]: getError(type, value)
            })
        }
    }

    const getHeaderText = () => {
        switch (props.action) {
            case CrudActions.Add:
                return "Create a new task by completing the form below.";
            case CrudActions.Update:
                return `Update the task ${props.todo.title}`;
            case CrudActions.Delete:
                return `Are you sure you want to delete the task ${todo.title}?`
            case CrudActions.View:
                return `Details of the task ${todo.title}`
            default:
                return "";
        }
    }


    const onSubmit = () => {
        if (props.action === CrudActions.Update) {
            if (isEqual(props.todo, todo)) {
                alert("There is no need to update. You didn't make any change");
                setLoader(false);
                return;
            }
        }
        if (!validateFields() && window.confirm("You want to save the changes?")) {
            setLoader(true);
            switch (props.action) {
                case CrudActions.Add:
                    setTimeout(function () {
                        dispatch(addTodo(todo));
                        setLoader(false);
                        props.onCancel();
                    }, 5000);
                    break;
                case CrudActions.Update:
                    setTimeout(function () {
                        dispatch(updateTodo(todo));
                        setLoader(false);
                        props.onCancel();
                    }, 5000);
                    break;
                case CrudActions.Delete:
                    setTimeout(function () {
                        dispatch(deleteTodo(todo.id));
                        setLoader(false);
                        props.onCancel();
                    }, 5000);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <React.Fragment>
            {props.action !== "Delete" ?
                <Modal
                    onClose={props.onCancel}
                    className="create-modal"
                    bodyClassName="modalBody"
                >
                    <div>
                        <h2 className="header">{getHeaderText()}</h2>
                        <Row>
                            <Col lg={12}>
                                <div className="group">
                                    <label className="label col-lg-3">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        id="title"
                                        className="form-control col-lg-9 field"
                                        value={todo.title}
                                        required
                                        disabled={isViewMode}
                                        onChange={(e) => {
                                            validateFields(e.target.id, e.target.value);
                                            setTodo({
                                                ...todo,
                                                title: e.target.value
                                            })
                                        }}
                                    />
                                    <p className="col-lg-9 col-lg-offset-3 error-msg">{errors.title}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="group">
                                    <label className="label col-lg-3 textarea-label">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        placeholder="Description"
                                        className="form-control col-lg-9 field"
                                        value={todo.description}
                                        required
                                        disabled={isViewMode}
                                        onChange={(e) => {
                                            validateFields(e.target.id, e.target.value);
                                            setTodo({
                                                ...todo,
                                                description: e.target.value
                                            })
                                        }}
                                    />
                                    <p className="col-lg-9 col-lg-offset-3 error-msg">{errors.description}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="group">
                                    <label className="label col-lg-3">Priority</label>
                                    <Select
                                        className="col-lg-9 dropdown"
                                        options={priorityOptions}
                                        value={priorityOptions.find(option =>
                                            option.value === todo.priority)}
                                        isDisabled={isViewMode}
                                        onChange={(selectedOption) => setTodo({
                                            ...todo,
                                            priority: selectedOption.value
                                        })}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="group">
                                    <label className="label col-lg-3">Due Date</label>
                                    <input
                                        type="date"
                                        placeholder="DD/MM/YYYY"
                                        id="dueDate"
                                        className="form-control col-lg-9 field"
                                        value={todo.dueDate}
                                        required
                                        disabled={isViewMode}
                                        onChange={(e) => {
                                            validateFields(e.target.id, e.target.value);
                                            setTodo({
                                                ...todo,
                                                dueDate: e.target.value
                                            })
                                        }}
                                    />
                                    <p className="col-lg-9 col-lg-offset-3 error-msg">{errors.dueDate}</p>
                                </div>
                            </Col>
                        </Row>
                        {isViewMode ?
                            <React.Fragment>
                                <Row>
                                    <Col lg={12}>
                                        <div className="group">
                                            <label className="label col-lg-3">Current State</label>
                                            <Select
                                                className="col-lg-9 dropdown"
                                                options={CurrentStates}
                                                value={CurrentStates.find(option =>
                                                    option.value === todo.currentState)}
                                                isDisabled={isViewMode}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <div className="group">
                                            <label className="label col-lg-3">Created On</label>
                                            <input
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                className="form-control col-lg-9 field"
                                                value={todo.createdAt}
                                                disabled={isViewMode}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Col lg={12} className="buttons">
                                    <button
                                        className="btn btn-primary"
                                        onClick={props.onCancel}
                                    >
                                        Go Back
                                    </button>
                                </Col>
                            </React.Fragment>
                            : <Row>
                                <Col lg={12} className="buttons">
                                    <button
                                        className="btn btn-link"
                                        onClick={() => setTodo(props.todo)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={onSubmit}>
                                        <i className={cn("fa fa-spinner fa-spin", {
                                            "loading-visible": loader,
                                            "loading": !loader,
                                        })}></i>
                                        {props.action} Task
                                    </button>
                                </Col>
                            </Row>}
                    </div>
                </Modal>
                : <Modal
                    onClose={props.onCancel}
                    className="submit-modal"
                    bodyClassName="modalBody"
                >
                    <div>
                        <h2 className="header">{getHeaderText()}</h2>
                        <p><strong>Warning: </strong>You cannot revert this action</p>
                        <Row>
                            <Col lg={12} className="buttons">
                                <button
                                    className="btn btn-primary"
                                    onClick={props.onCancel}
                                >
                                    No
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={onSubmit}
                                >
                                    <i className={cn("fa fa-spinner fa-spin", {
                                        "loading-visible": loader,
                                        "loading": !loader,
                                    })}></i>
                                    Yes
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Modal>}
        </React.Fragment>
    );
}

export default TaskForm;