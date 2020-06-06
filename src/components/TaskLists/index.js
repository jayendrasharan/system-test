import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { clearAddTaskState } from '../../store/actions';
import TaskForm from '../AddTaskForm';

const TaskList = (props) => {
    const { newTask, clearAddTaskState, taskAddSuccess, typeOfTasks, heading, listOfTasks } = props;
    const [viewTask, setViewTask] = React.useState(false);
    const [viewTaskData, setViewTaskData] = React.useState({});
    const [list, setList] = React.useState([
        {
            "currentState": true,
            "summary": "Morning Walk",
            "description": "Early morning walk Keep you active and energetic for the rest of the day",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "1/6/2020"
        },
        {
            "currentState": true,
            "summary": "Break Fast",
            "desciption": "Breakfast is an important meal of the day. Never skip breakfast.",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "1/6/2020"
        },
        {
            "currentState": false,
            "summary": "Washing Clothes",
            "description": "Need to use washing machine atleast once a weel. For washing all the clothes.",
            "priority": "Medium",
            "createdOn": "31/5/2020",
            "dueDate": "6/06/2020"
        },
        {
            "currentState": true,
            "summary": "Monthly Medical Checkup",
            "description": "Includes all the necessary routine body checkups to ensure good health.",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "7/6/2020"
        },
        {
            "currentState": false,
            "summary": "Repairing faulty electrical appliances",
            "description": "Check for the faulty appliances in the entire house.",
            "priority": "Medium",
            "createdOn": "31/5/2020",
            "dueDate": "5/6/2020"
        },
        {
            "currentState": true,
            "summary": "Evening Snacks",
            "description": "Prepare evening snacks for guests.",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "6/6/2020"
        },
        {
            "currentState": true,
            "summary": "Buy Groceries",
            "description": "Need to buy groceries for the entire week.",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "7/6/2020"
        },
        {
            "currentState": false,
            "summary": "Office work",
            "description": "Need to complete all the pending tasks.",
            "priority": "High",
            "createdOn": "31/5/2020",
            "dueDate": "5/6/2020"
        },
        {
            "currentState": true,
            "summary": "Entire waste removal",
            "description": "Proper cleaning of the house, which includes removing of all unnecessary items.",
            "priority": "Low",
            "createdOn": "1/6/2020",
            "dueDate": "28/6/2020"
        },
        {
            "currentState": true,
            "summary": "Gardening",
            "description": "Once in a month check condition of all the plants in the garden.",
            "priority": "Low",
            "createdOn": "1/6/2020",
            "dueDate": "29/6/2020"
        }
    ]);
    const [pendingList, setPendingList] = React.useState([]);
    const [completedList, setCompletedList] = React.useState([]);
    console.log("pendingList", pendingList)

    console.log("list-------", list)
    React.useEffect(() => {
        if (listOfTasks) {
            console.log("fired")
            setList([...listOfTasks, ...list])
        }
    }, [newTask, setList, listOfTasks])

    React.useEffect(() => {
        if (typeOfTasks === "completed") {
            let newList = [...list.filter((obj) => (
                obj.currentState === false
            ))]

            setList(newList)
        }
        if (typeOfTasks === "pending") {
            let newList;
            if (listOfTasks) {
                newList = [...listOfTasks, ...list.filter((obj) => (
                    obj.currentState === true
                ))]
            } else {
                newList = list.filter((obj) => (
                    obj.currentState === true
                ))
            }

            setList(newList)
        }
    }, [typeOfTasks])

    React.useEffect(() => {
        if (taskAddSuccess) {
            clearAddTaskState()
        }
    }, [taskAddSuccess, clearAddTaskState])

    const viewTaskDetail = (data) => {
        setViewTaskData(data)
        setViewTask(true)
    }

    const handleClose = () => {
        setViewTask(false)
    }

    return (
        <div>
            <h5 className="text-left">{heading}</h5>
            <h5 className="text-left subheading">
                {
                    typeOfTasks === "alltasks" && <> Click on the plus button at the bottom right corner of the table to add a task.</>
                }
            </h5>
            <table className="table table-striped" style={{ "textAlign": "left" }}>
                <thead>
                    <tr>
                        <th scope="col">Summary</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...new Set(list)].map((obj, index) => (
                            <tr key={index} onClick={() => viewTaskDetail(obj)}>
                                <td>{obj.summary}</td>
                                <td>{obj.priority} </td>
                                <td>{typeof obj.createdOn === "string" ? obj.createdOn : obj.createdOn.toLocaleDateString()}</td>
                                <td>{typeof obj.dueDate === "string" ? obj.dueDate : obj.dueDate.toLocaleDateString()}</td>
                                <td>
                                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                    <i className="fa fa-trash ml-2" aria-hidden="true"></i>
                                    <i className="fa fa-check ml-2" aria-hidden="true"></i>
                                    <i className="fa fa-circle ml-2" aria-hidden="true"></i>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal show={viewTask} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm taskDetails={viewTaskData} view={true} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateStateToProps = state => {
    return {
        newTask: state.taskList,
        taskAddSuccess: state.taskAdded,
        listOfTasks: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAddTaskState: () => dispatch(clearAddTaskState())
    }
}

export default connect(mapStateStateToProps, mapDispatchToProps)(TaskList)