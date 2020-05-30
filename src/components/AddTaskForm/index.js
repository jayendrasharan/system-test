import React from 'react'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTaskToList } from '../../store/actions';

const TaskForm = (props) => {
    const { saveChanges, addNewTask } = props;
    const [task, setTask] = React.useState({
        currentState: true,
        summary: "",
        description: "",
        priority: "None",
        createdOn: new Date(),
        dueDate: new Date()
    })

    React.useEffect(() => {
        if (saveChanges) {
            addNewTask(task)
        }

    }, [saveChanges, addNewTask, task])

    const handleChange = (event) => {
        let fields = {
            ...task,
            [event.target.name]: event.target.value
        };
        setTask(fields)
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        type="text"
                        className="form-control"
                        id="summary"
                        name={'summary'}
                        placeholder="Summary"
                        value={task.summary}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        rows="5"
                        name={'description'}
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            className="form-control"
                            name={'priority'}
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option>None</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="date">Due Date</label>
                        <DatePicker
                            selected={task.dueDate}
                            name={'dueDate'}
                            onSelect={(date) => setTask({ ...task, dueDate: date })}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTask: (data) => dispatch(addTaskToList(data))
    }
}

export default connect(null, mapDispatchToProps)(TaskForm)