import React from 'react'

const TaskList = () => {
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
    return (
        <div className="p-5 table-responsive">
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
                        taskList.map((obj, index) => (
                            <tr key={index}>
                                <td scope="row">{obj.summary}</td>
                                <td>{obj.priority}</td>
                                <td>30-05-2020</td>
                                <td>{obj.date}</td>
                                <td>Edit</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TaskList