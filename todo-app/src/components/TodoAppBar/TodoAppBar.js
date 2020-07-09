import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Tooltip,
  InputAdornment
} from '@material-ui/core';
import TaskDialog from '../TaskDialog';
import { fade, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  addButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  cancelIcon: {
    fontSize: 19,
    cursor: 'pointer'
  }
}));

export default function TodoAppBar(props) {
  const classes = useStyles();
  const onSearchChange = searchText => {
    props.onSearchChange(searchText);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Add Task" placement={'bottom-end'} enterDelay={100}>
            <IconButton
              edge="start"
              className={classes.addButton}
              color="inherit"
              onClick={() => {
                props.setType('Add');
                props.setOpenTaskDialog(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Typography className={classes.title} variant="h6" noWrap>
            Todo-App
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={props.searchText}
              onChange={event => {
                onSearchChange(event.target.value);
              }}
              endAdornment={
                props.searchText ? (
                  <InputAdornment onClick={event => onSearchChange('')}>
                    <CancelIcon className={classes.cancelIcon} />
                  </InputAdornment>
                ) : null
              }
            />
          </div>
        </Toolbar>
      </AppBar>
      {props.openTaskDialog ? (
        <TaskDialog
          openTaskDialog={props.openTaskDialog}
          setOpenTaskDialog={props.setOpenTaskDialog}
          editTask={props.editTask}
          task={props.task}
          type={props.type}
          addTask={props.addTask}
          saveEditedTask={props.saveEditedTask}
        />
      ) : null}
    </div>
  );
}
