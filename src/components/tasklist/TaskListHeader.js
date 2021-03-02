import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TaskListHeader = props => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Summary</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Created on</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

export default TaskListHeader
