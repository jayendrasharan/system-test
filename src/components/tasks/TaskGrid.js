import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { get } from 'lodash';
import { Coldefs } from './coldefs';
import TaskModal from './TaskModal';

const TaskGrid = ({
    tasks,
    updateTask,
    deleteTask
}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [row, setRow] = useState();
    const [actionType, setActionType] = useState();

    const handleRowSelection = (row) => {
        setRow(row);
        setShowDetails(true);
        setActionType('view');
    }

    const handleClose = () => {
        setShowDetails(false);
        setRow(null);
        setActionType();
        setShowDelete(false);
    }

    const handleEdit = (e, row) => {
        e.stopPropagation();
        setRow(row);
        setShowDetails(true);
        setActionType('edit');
    }

    const handleDelete = (e, row) => {
        e.stopPropagation();
        setActionType('Delete');
        setShowDelete(true);
        setRow(row);
    }

    const handleDeleteConfirmation = () => {
        deleteTask(row.id);
        handleClose();
    }

    const handleStateChange = (e, row) => {
        e.stopPropagation();
        row.currentState = row.currentState === 'open' ? 'done' : 'open';
        updateTask(row);
    }

    const getColumnContent = (row, key) => {
        if (key === 'createdOn') {
            return row[key] ? new Date(row[key]).toISOString() : '';
        } else if (key === 'actions') {
            return <div className='action-icons'>
                <span onClick={(e) => handleEdit(e, row)}><FontAwesomeIcon icon={faEdit} /></span>
                <span onClick={(e) => handleDelete(e, row)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                <button onClick={(e) => handleStateChange(e, row)}>{row.currentState === 'open' ? 'Done' : 'Re-open'}</button>
            </div>
        } else return row[key];
    }

    return (
        <>
            {tasks.length
                ? <div className='task-grid'>
                    <div className='task-grid-col-wrapper'>
                        {Coldefs.map(col => {
                            return <div key={`col-${col.key}`} className='task-grid-col'>{col.header}</div>
                        })}
                    </div>
                    <div className='task-grid-data-wrapper'>
                        {tasks.map(t => {
                            return <div
                                key={`row-${t.id}`}
                                className='task-grid-data-row'
                                onClick={() => handleRowSelection(t)}
                            >
                                {Coldefs.map(col => {
                                    return <div
                                        key={`row-col-${col.key}-${t.id}`}
                                        className='task-grid-col task-grid-data-col'
                                        style={{ maxWidth: col.width || '200px' }}
                                    >
                                        {getColumnContent(t, col.key)}
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </div>
                : <div className='task-grid-no-tasks'>
                    No tasks. Please create using '+' at the bottom right.
                </div>}
            {showDetails
                ? <TaskModal
                    isView={actionType === 'view'}
                    isEdit={actionType === 'edit'}
                    handleClose={handleClose}
                    updateTask={updateTask}
                    show={showDetails}
                    title={actionType === 'edit' ? 'Edit Task' : 'Task Details'}
                    row={row}
                />
                : ''}
            <Modal
                size="lg"
                show={showDelete}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Body>
                    <div className='details-wrapper'>
                        <div><label>Summary</label><span>{get(row, 'summary', '')}</span></div>
                        <div><label>Description</label><span>{get(row, 'description', '')}</span></div>
                        <div><label>Due Date</label><span>{get(row, 'dueDate', '')}</span></div>
                        <div><label>Priority</label><span>{get(row, 'priority', '')}</span></div>
                        <div className='confirm-delete-question'>Do you want to delete this task?</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                        </Button>
                    <Button variant="primary" onClick={handleDeleteConfirmation}>
                        Yes
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TaskGrid;