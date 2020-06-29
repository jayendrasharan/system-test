import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import { isEqual, cloneDeep } from "lodash";

const initialState = {
    summary: "",
    desc: "",
    priority: "None",
    dueDate: ""
  };

const TaskModal = ({
    show,
    handleClose,
    addTask,
    updateTask,
    isView,
    isEdit,
    row,
    title
}) => {

    const [{ summary, description, priority, dueDate }, setState] = useState(row ? row : initialState);

    const handleSummaryChange = ({ target: { value } }) => setState(prevState => ({...prevState, summary: value}));

    const handleDescChange = ({ target: { value } }) => setState(prevState => ({...prevState, description: value}));

    const handleDueDateChange = ({ target: { value } }) => setState(prevState => ({...prevState, dueDate: value}));

    const handlePriorityChange = ({ target: { value }}) => setState(prevState => ({...prevState, priority: value}));

    const saveTask = () => {
        if (!summary || summary.length < 10) {
            alert('Summary should not be empty or less than 10 characters');
            return;
        }
        if (!description || description.length < 10) {
            alert('Description should not be empty or less than 10 characters');
            return;
        }
        const taskObj = {
            id: row && row.id ? row.id : v4(),
            summary,
            description,
            priority,
            dueDate,
            currentState: row && row.currentState ? row.currentState : 'open'
        };
        if (row && row.id) {
            let previousData = cloneDeep(row);
            delete previousData.createdOn;
            if (isEqual(previousData, taskObj)) {
                alert('Nothing to update!');
                return;
            }
        }
        taskObj.createdOn = new Date();
        var response = window.confirm('Please confirm before saving the record');
        if (!response) {
            return;
        }
        if (isEdit) {
            updateTask(taskObj);
        } else {
            addTask(taskObj);
        }
        setState(initialState);
        handleClose();
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-wrapper">
                    <div className="input-group mb-3">
                        <label>Summary</label>
                        <input
                            type="text"
                            placeholder='Must be 10 characters or above'
                            className="form-control"
                            aria-label="summary"
                            aria-describedby="input-summary"
                            value={summary}
                            onChange={handleSummaryChange}
                            minLength={10}
                            maxLength={140}
                            disabled={isView}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            aria-label="description"
                            placeholder='Must be 10 characters or above'
                            aria-describedby="input-description"
                            value={description}
                            onChange={handleDescChange}
                            minLength={10}
                            maxLength={500}
                            disabled={isView}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label>Priority</label>
                        <select
                            className="form-control"
                            id="priority"
                            value={priority}
                            onChange={handlePriorityChange}
                            disabled={isView}
                        >
                            <option>None</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label>Due Date</label>
                        <input
                            type='date'
                            className="form-control"
                            aria-label="duedate"
                            aria-describedby="input-duedate"
                            value={dueDate}
                            onChange={handleDueDateChange}
                            disabled={isView}
                        />
                    </div>
                    {isView ?
                        <>
                            <div className="input-group mb-3">
                                <label>Current State</label>
                                <span>{row.currentState}</span>
                            </div>
                            <div className="input-group mb-3">
                                <label>Created On</label>
                                <span>{row.createdOn ? new Date(row.createdOn).toISOString() : ''}</span>
                            </div>
                        </>
                    : ''}
                </div>
            </Modal.Body>
            {!isView ? <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type='submit' onClick={saveTask}>
                    Save Task
                </Button>
            </Modal.Footer> : ''}
        </Modal>
    )
}

export default TaskModal;