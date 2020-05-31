import React from 'react'
import TaskLists from '../TaskLists'

const ListOfPendingTasks = () => {
    return (
        <div className="tasks-list">
            <TaskLists typeOfTasks={'pending'} heading={'List of pending tasks'} />
        </div>
    )
}

export default ListOfPendingTasks