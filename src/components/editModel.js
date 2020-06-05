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

const EditModel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const todoDetails = useStateValue();
  const todoDetailsArray = useStateValue();
  const cancelDetails = useStateValue();
  const editTodo = useStateValue();
  // console.log(editTodo, "edited rows")
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //     //setOpen(true);
  //     props.isopen();
  // };

  const handleCloseEdit = () => {
    //setOpen(false);
    props.iscloseEdit();
  };

  const handleCloseDesc = () => {
    setOpen(false);
  };
  let showEditDialog = editTodo.editTodo.isRowEdited ? true : false

  return (
    <Dialog open={props.openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title"> Update Todo Details</DialogTitle>
      <DialogContent>
        <TextField
          name="summary"
          value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.summary : editTodo.editTodo.summary}
          autoFocus
          margin="dense"
          id="name"
          label="Summary"
          fullWidth
          onChange={(e) => { Actions.editTodoDetailsChange(dispatch, "summary", e.target.value, e.target.name) }}
        />
        <TextField
          className={classes.descLabel}
          name="description"
          value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.description : editTodo.editTodo.description}
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          onChange={(e) => { Actions.editTodoDetailsChange(dispatch, "description", e.target.value, e.target.name) }}
        />
        <InputLabel className={classes.selectLabelMargin} id="demo-simple-select-label">Priority</InputLabel>
        <div className={classes.display}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.priority : editTodo.editTodo.priority}
            onChange={(e) => { Actions.editTodoDetailsChange(dispatch, "priority", e.target.value) }}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Low'}>Low</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
          </Select>

          <TextField
            className={classes.dateMargin}
            id="date"
            label="Due Date"
            type="date"
            format="dd/MM/2020"
            defaultValue="20/06/2020"
            value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.dueDate : editTodo.editTodo.dueDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => {
              Actions.editTodoDetailsChange(dispatch, "dueDate", event.target.value)
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => { Actions.cancelDetails(dispatch, e); handleCloseEdit(); }} color="primary">
          Cancel
          </Button>
        <Button
          onClick={(e) => {
            Actions.editTodoUpdate(dispatch, editTodo.editTodo.rowId, todoDetailsArray.todoDetailsArray);
            handleCloseEdit();
          }}
          color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>

  );
}

export default EditModel;