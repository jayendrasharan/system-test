import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
  message: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    height: theme.spacing(75),
    fontSize: '15px'
  }
}));

export default function TodoListEmpty() {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={8}>
          <div className={classes.message}>
            No tasks found. Click on (+) to add tasks.
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
