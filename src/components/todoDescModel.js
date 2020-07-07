import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid, TextField, Paper, Typography, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  InputLabel, Select, MenuItem
} from "@material-ui/core";
import useStyles from "../styles";
import { useTheme } from "@material-ui/styles";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import EnhancedTable from './table';
import TabBar from './tabPanel';
import * as Actions from "../actions/action";
import { useStateValue, useDispatch } from "../store/configureStore";

const TodoDescModel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const todoDetails = useStateValue();
  const todoDetailsArray = useStateValue();
  const editTodo = useStateValue();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleCloseTodo = () => {
    props.iscloseTodo();
  };
  return (
    <Dialog visible={props.visible} open={props.openTodo} onClose={handleCloseTodo} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">TODO Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Todo Details
          </DialogContentText>
        <div className={classes.display}>
          <ul>
            <li>Summary : {editTodo.editTodo.summary}</li>
            <li>Description : {editTodo.editTodo.description}</li>
            <li>Priority : {editTodo.editTodo.priority}</li>
            <li>Due Date : {editTodo.editTodo.dueDate}</li>
            <li>Created On : {editTodo.editTodo.createdOn}</li>
            <li>Current Status : {editTodo.editTodo.currentStatus ? "Completed" : "Pending"}</li>
          </ul>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseTodo} color="primary">
          Okay
          </Button>
      </DialogActions>
    </Dialog>

  );
}

export default TodoDescModel;