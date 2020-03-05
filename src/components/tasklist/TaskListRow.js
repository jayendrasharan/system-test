import React from 'react'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import {getTimeStamp} from '../helpers/helper'

const TaskListRow = (props) => {
    const {title, id, isDone, priority, createdDate, dueDate, handleEdit, handleDelete, handleDoneOrReopen, handleRowClick} = props;
    return (
        <TableRow onClick={() => {handleRowClick(id)}}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>
            <TableCell style={{hover: {cursor: "pointer"}}}align="right">{priority}</TableCell>
            <TableCell align="right">{getTimeStamp(createdDate)}</TableCell>
            <TableCell align="right">{getTimeStamp(dueDate)}</TableCell>
            <TableCell align="right">
                <IconButton onClick={() => {handleEdit(id);}}><EditIcon /></IconButton>
                <IconButton onClick={() => {handleDelete(id);}}><DeleteIcon /></IconButton>
                (
                    {
                        <IconButton onClick={() => {handleDoneOrReopen(id)}}>
                            {isDone ? (<RestorePageIcon />) : (<DoneIcon />)}
                        </IconButton>
                    }
                )
            </TableCell>
        </TableRow>          
    );
}

TaskListRow.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    createdDate: PropTypes.object.isRequired,
    isDone: PropTypes.bool.isRequired,
    dueDate: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleDoneOrReopen: PropTypes.func.isRequired,
    handleRowClick: PropTypes.func.isRequired
}

export default TaskListRow
