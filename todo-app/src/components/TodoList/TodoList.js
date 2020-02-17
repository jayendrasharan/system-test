import React from 'react';
import { Table, makeStyles, Paper } from '@material-ui/core';
import TodoListHead from '../TodoListHead';
import TodoListBody from '../TodoListBody';

const useStyles = makeStyles({
  paper: {
    maxHeight: '90vh',
    width: '100%',
    marginTop: 10,
    overflow: 'auto'
  }
});

export default function TodoList(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Table stickyHeader>
        <TodoListHead
          sortColumn={props.sortColumn}
          sortDirection={props.sortDirection}
          sortTasks={props.sortTasks}
        />
        <TodoListBody
          editTask={props.editTask}
          deleteTask={props.deleteTask}
          tasks={props.tasks}
          changeTaskStatus={props.changeTaskStatus}
        />
      </Table>
    </Paper>
  );
}
