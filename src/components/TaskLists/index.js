import React from 'react'
import { connect } from 'react-redux'
import { clearAddTaskState } from '../../store/actions';

const TaskList = (props) => {
    const { newTask, clearAddTaskState, taskAddSuccess } = props;
    const [list, setList] = React.useState([]);

    const taskList = [
        {
            "summary": "Morning Walk",
            "description": "Early morning walk Keep you active and energetic for the rest of the day",
            "priority": "High",
            "date": "31-01-2020"
        },
        {
            "summary": "Break Fast",
            "desciption": "Breakfast is an important meal of the day. Never skip breakfast.",
            "priority": "High",
            "date": "31-01-2020"
        }
    ]

    React.useEffect(() => {
        if (newTask) {
            setList([newTask, ...list])
        }
    }, [newTask, setList, list])

    React.useEffect(() => {
        if (taskAddSuccess) {
            clearAddTaskState()
        }
    }, [taskAddSuccess, clearAddTaskState])


    return (
        <div>
            <h5 className="text-left">Click on the plus button at the bottom right corner of the table to add a task.</h5>
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
                            <tr key={index}>
                                <td>{obj.summary}</td>
                                <td>{obj.priority}</td>
                                <td>{obj.createdOn.toLocaleDateString()}</td>
                                <td>{obj.dueDate.toLocaleDateString()}</td>
                                <td>Edit</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateStateToProps = state => {
    return {
        newTask: state.taskList,
        taskAddSuccess: state.taskAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAddTaskState: () => dispatch(clearAddTaskState())
    }
}

export default connect(mapStateStateToProps, mapDispatchToProps)(TaskList)