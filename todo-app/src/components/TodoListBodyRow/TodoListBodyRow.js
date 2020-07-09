import React, { useState } from 'react';
import { TableCell, TableRow, makeStyles } from '@material-ui/core';
import ActionButtonGroup from '../ActionButtonGroup';

const useStyles = makeStyles(props => ({
  root: {
    '&:hover': {
      backgroundColor: '#EDEDED !important'
    }
  },
  completed: {
    backgroundColor: '#d6faac'
  },
  cell: {
    color: '#2c404c',
    whiteSpace: 'nowrap',
    fontSize: 15,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingTop: 0,
    paddingBottom: 0,
    height: 50 // Height works as min height for table cell
  }
}));

export default function TodoListBodyRow(props) {
  const classes = useStyles(props);
  const { task } = props;
  const [isHovering, setIsHovering] = useState(false);
  const selected = task.status === 'completed';

  const formatDate = date => {
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <TableRow
      className={selected ? classes.completed : ''}
      classes={{ root: classes.root }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      hover
      tabIndex={-1}
    >
      <TableCell className={classes.cell}>{task.summary}</TableCell>
      <TableCell className={classes.cell}>{task.priority}</TableCell>
      <TableCell className={classes.cell}>
        {formatDate(task.createdOn)}
      </TableCell>
      <TableCell className={classes.cell}>{formatDate(task.dueDate)}</TableCell>
      <TableCell className={classes.cell}>{task.status}</TableCell>
      <TableCell className={classes.cell}>
        <ActionButtonGroup
          status={task.status}
          editTask={() => props.editTask(task)}
          deleteTask={() => props.deleteTask(task)}
          onActionButtonClick={() => props.onActionButtonClick}
          changeTaskStatus={status => props.changeTaskStatus(task, status)}
        />
      </TableCell>
    </TableRow>
  );
}
