import React from 'react'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TaskListRow from './TaskListRow'


const TaskListBody = ({tasks, handleEdit, handleDelete, handleDoneOrReopen, handleRowClick}) => {
    return (
        <TableBody>
            {
                tasks.map((task) => (
                    <TaskListRow 
                        key={task.id} 
                        {...task} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleDoneOrReopen={handleDoneOrReopen}
                        handleRowClick={handleRowClick}
                    />
                ))
            }
        </TableBody>    
    )
}

TaskListBody.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleDoneOrReopen: PropTypes.func.isRequired,
    handleRowClick: PropTypes.func.isRequired
}

export default TaskListBody
