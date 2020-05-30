import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from '../AddTaskForm';
import TaskList from '../TaskLists';


const ListOfAllTasks = () => {
    const [show, setShow] = React.useState(false);
    const [save, setSave] = React.useState(false);

    const handleClose = () => {
        setShow(false)
        setSave(false)
    };
    const handleShow = () => {
        setShow(true);
    }
    const saveTask = () => {
        setSave(true);
        setShow(false);
    }

    return (
        <div>
            <TaskList />
            <Button type="button" className="btn btn-info" onClick={handleShow}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm saveChanges={save} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={saveTask}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListOfAllTasks