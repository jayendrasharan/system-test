import React from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import { makeStyles, Paper } from '@material-ui/core'
import TaskListHeader from './TaskListHeader'
import TaskListBody from './TaskListBody'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
});

const TaskListView = ({tasks, handleEdit, handleDelete, handleDoneOrReopen, handleRowClick}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table  className= {classes.table} aria-label="simple table">
                <TaskListHeader />
                <TaskListBody 
                    tasks={tasks} 
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleDoneOrReopen={handleDoneOrReopen}
                    handleRowClick={handleRowClick}
                    />
            </Table>
        </TableContainer>
    )
}

TaskListView.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleDoneOrReopen: PropTypes.func.isRequired,
    handleRowClick: PropTypes.func.isRequired
}

export default TaskListView
