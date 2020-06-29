import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { get, orderBy } from 'lodash';
import { Coldefs } from './coldefs';
import TaskModal from './TaskModal';
import TaskTooltip from './TaskTooltip';

const cols = Coldefs.filter(c => !c.hidden);

const TaskGrid = ({
    type,
    tasksList,
    updateTask,
    deleteTask,
    sortEle,
    setSortEle,
    setTasks,
    groupBy,
    setCheckOnAllTasks,
    setCheckOnTask,
    allCheck,
    bulkDelete,
    bulkUpdate
}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [row, setRow] = useState();
    const [actionType, setActionType] = useState();

    let groupByValues = [];

    if (groupBy) {
        groupByValues = [...new Set(tasksList.map(t => t[groupBy]))];
    }

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

    const handleBulkDelete = (e) => {
        e.stopPropagation();
        const taskIdsToDelete = tasksList.filter(t => t.checked).map(a => a.id);
        bulkDelete(taskIdsToDelete);
    }

    const handleBulkDoneOp = (e) => {
        e.stopPropagation();
        handleBulkStatusUpdate('done');
    }

    const handleBulkReopenOp = (e) => {
        e.stopPropagation();
        handleBulkStatusUpdate('open');
    }

    const handleBulkStatusUpdate = status => {
        const tasksToUpdate = tasksList.filter(t => t.checked).map(a => {
            a.currentState = status;
            a.createdOn = new Date();
            return a;
        });
        bulkUpdate(tasksToUpdate);
    }

    const getMenuContent = () => {
        const allTasks = tasksList.filter(t => t.checked);
        return (
            <ul className='tootlip-content'>
                <li onClick={handleBulkDelete}>Delete</li>
                {allTasks.some(t => t.currentState === 'open') &&
                    <li onClick={handleBulkDoneOp}>Mark as Done</li>}
                {allTasks.some(t => t.currentState !== 'open') &&
                    <li onClick={handleBulkReopenOp}>Mark as Re-open</li>}
            </ul>
        )
    }

    const getRowData = (tasks) => {
        return tasks.map(t => {
            return <div
                key={`row-${t.id}`}
                className="task-grid-data-row"
                onClick={() => handleRowSelection(t)}
            >
                <div
                    className='task-grid-check-col task-grid-task-check-col'
                    onClick={(e) => e.stopPropagation()}>
                    <input
                        type='checkbox'
                        id='task-check'
                        checked={t.checked}
                        onChange={(e) => handleRowItemCheck(e, t.id)}
                    />
                </div>
                {t.checked
                    ? <TaskTooltip getTooltipContent={getMenuContent} customClass='task-grid-task-check-col' />
                    : <div
                        className='task-grid-check-col task-grid-task-check-col'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FontAwesomeIcon icon={faEllipsisH} color='#CCC' />
                    </div>}
                {cols.map(col => {
                    return <div
                        key={`row-col-${col.key}-${t.id}`}
                        className={`task-grid-col ${col.key} task-grid-data-col ` +
                            `${t.currentState === 'open' ? '' : `task-grid-data-row-${type}`}`}
                        style={{ maxWidth: col.width || '200px' }}
                    >
                        {getColumnContent(t, col.key)}
                    </div>
                })}
            </div>
        })
    }

    const handleSort = col => {
        let taskList = [];
        const order = sortEle[col.key]
            ? sortEle[col.key] === 'asc' ? 'desc' : 'asc'
            : 'asc'
        switch (col.key) {
            case 'summary':
                taskList = orderBy(
                    tasksList,
                    'summary',
                    order
                );
                setTasks(taskList);
                break;
            case 'priority':
                if (order === 'asc') {
                    taskList = [
                        ...tasksList.filter(t => t.priority === 'None'),
                        ...tasksList.filter(t => t.priority === 'Low'),
                        ...tasksList.filter(t => t.priority === 'Medium'),
                        ...tasksList.filter(t => t.priority === 'High'),
                    ]
                } else {
                    taskList = [
                        ...tasksList.filter(t => t.priority === 'High'),
                        ...tasksList.filter(t => t.priority === 'Medium'),
                        ...tasksList.filter(t => t.priority === 'Low'),
                        ...tasksList.filter(t => t.priority === 'None'),
                    ]
                }
                setTasks(taskList);
                break;
            case 'createdOn':
                taskList = orderBy(tasksList, 'createdOn', order);
                setTasks(taskList);
                break;
            case 'dueDate':
                taskList = order === 'asc'
                    ? tasksList.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                    : tasksList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                setTasks(taskList);
                break;
            default:
                taskList = orderBy(tasksList, 'summary', order);
                setTasks(taskList);
                break;
        }
        setSortEle({ [col.key]: order });
    }

    const handleAllTasksCheck = (e) => {
        e.stopPropagation();
        setCheckOnAllTasks();
    }

    const handleRowItemCheck = (e, id) => {
        e.stopPropagation();
        setCheckOnTask(id);
    }

    return (
        <>
            {tasksList.length
                ? <div className='task-grid'>
                    <div className='task-grid-col-wrapper'>
                        <div className='task-grid-check-col'>
                            <input
                                type='checkbox'
                                id='all-tasks-check'
                                onChange={handleAllTasksCheck}
                                checked={allCheck}
                            />
                        </div>
                        {allCheck
                            ? <TaskTooltip getTooltipContent={getMenuContent} />
                            : <div className='task-grid-check-col'>
                                <FontAwesomeIcon icon={faEllipsisH} color='#CCC' />
                            </div>}
                        {cols.map(col => {
                            return <div
                                key={`col-${col.key}`}
                                className='task-grid-col'
                                onClick={() => handleSort(col)}
                            >
                                {col.header}
                            </div>
                        })}
                    </div>
                    <div className='task-grid-data-wrapper'>
                        {groupBy
                            ? <div>
                                {groupByValues.map(g => {
                                    return <>
                                        <div
                                            key={`group-value-${g}`}
                                            className="task-grid-groupby-row"
                                        >{typeof g === 'object' ? g.toISOString() : (g || 'No Value')}</div>
                                        {getRowData(tasksList.filter(t => t[groupBy] === g))}
                                    </>
                                })}
                            </div>
                            : getRowData(tasksList)
                        }
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