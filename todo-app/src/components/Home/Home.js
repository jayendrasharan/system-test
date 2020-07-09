import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TodoList from '../TodoList';
import TodoAppBar from '../TodoAppBar';
import TodoSidePanel from '../TodoSidePanel';
import DeleteDialog from '../DeleteDialog';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    maxHeight: '100vh',
    overflow: 'hidden'
  },
  column: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr'
  },
  sidePanel: {
    height: '100vh',
    backgroundColor: '#f5f5f5'
  }
});

export default function Home(props) {
  const classes = useStyles();
  const [editTask, setEditTask] = useState('');
  const [deleteTask, setDeleteTask] = useState('');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [type, setType] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleEditTask = task => {
    setType('Edit');
    setOpenTaskDialog(true);
    setEditTask(task);
  };

  const onSearchChange = searchText => {
    setSearchText(searchText);
    props.onSearchChange(searchText);
  };

  return (
    <>
      <div className={classes.root}>
        <TodoAppBar
          editTask={props.editTask}
          setType={setType}
          openTaskDialog={openTaskDialog}
          setOpenTaskDialog={setOpenTaskDialog}
          task={editTask}
          type={type}
          addTask={props.addTask}
          saveEditedTask={props.saveEditedTask}
          onSearchChange={onSearchChange}
          searchText={searchText}
        />
        <div className={classes.column}>
          <div className={classes.sidePanel}>
            <TodoSidePanel setSelectedTab={props.setSelectedTab} />
          </div>
          <TodoList
            editTask={handleEditTask}
            deleteTask={task => {
              setDeleteTask(task);
              setOpenDeleteDialog(true);
            }}
            tasks={props.selectedTabTasks}
            changeTaskStatus={props.changeTaskStatus}
            sortColumn={props.sortColumn}
            sortDirection={props.sortDirection}
            sortTasks={props.sortTasks}
          />
        </div>
      </div>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        onConfirmDelete={() => {
          setOpenDeleteDialog(false);
          props.deleteTask(deleteTask);
        }}
        onCancelDelete={() => {
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
}
