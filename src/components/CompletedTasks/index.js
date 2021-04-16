import React from 'react'
import TaskLists from '../TaskLists'

const ListOfCompletedTasks = () => {
    return (
        <div className="tasks-list">
            <TaskLists typeOfTasks={'completed'} heading={'List of completed tasks'} />
        </div>
    )
}

export default ListOfCompletedTasks