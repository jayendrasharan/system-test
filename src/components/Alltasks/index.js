import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from '../AddTaskForm';
import TaskList from '../TaskLists';


const ListOfAllTasks = (props) => {
    const { addTaskSuccess } = props;

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

    React.useEffect(() => {
        if (addTaskSuccess) {
            setSave(false)
        }
    }, [addTaskSuccess, setSave])

    return (
        <div className="all-tasks-list">
            <TaskList />
            <Button type="button" className="add-task-btn" onClick={handleShow}>
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

const mapStateToProps = state => {
    return {
        addTaskSuccess: state.taskAdded
    }
}

export default connect(mapStateToProps, null)(ListOfAllTasks)