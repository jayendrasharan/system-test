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
import LinearBuffer from './progressBar';

const MODEL = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const todoDetails = useStateValue();
  const todoDetailsArray = useStateValue();
  const cancelDetails = useStateValue();
  const editTodo = useStateValue();
  const showProgressBar = useStateValue();
  // console.log(editTodo, "edited rows")
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [visibility, setVisibility] = React.useState('hidden');

  // const handleClickOpen = () => {
  //     //setOpen(true);
  //     props.isopen();
  // };

  const handleClose = () => {
    //setOpen(false);
    props.isclose();
  };
  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">TODO Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the below details
          </DialogContentText>
        <TextField
          name="summary"
          value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.summary : todoDetails.todoDetails.summary}
          autoFocus
          margin="dense"
          id="name"
          label="Summary"
          fullWidth
          onChange={(e) => { Actions.todoDetailsChange(dispatch, "summary", e.target.value, e.target.name) }}
        />
        {todoDetails.todoDetails.todoDetailsErrors["summary"] &&
          (
            <InputLabel error > {todoDetails.todoDetails.todoDetailsErrors["summary"]}
            </InputLabel>
          )}
        <TextField
          className={classes.descLabel}
          name="description"
          value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.description : todoDetails.todoDetails.description}
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          onChange={(e) => { Actions.todoDetailsChange(dispatch, "description", e.target.value, e.target.name) }}
        />
        {todoDetails.todoDetails.todoDetailsErrors["description"] &&
          (
            <InputLabel error > {todoDetails.todoDetails.todoDetailsErrors["description"]}
            </InputLabel>
          )}
        <InputLabel className={classes.selectLabelMargin} id="demo-simple-select-label">Priority</InputLabel>
        <div className={classes.display}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.priority : todoDetails.todoDetails.priority}
            onChange={(e) => { Actions.todoDetailsChange(dispatch, "priority", e.target.value) }}
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
            value={cancelDetails.cancelDetails ? cancelDetails.cancelDetails.dueDate : todoDetails.todoDetails.dueDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => {
              Actions.todoDetailsChange(dispatch, "dueDate", event.target.value)
            }}
          />
        </div>
        {showProgressBar.showProgressBar.show ?
          <LinearBuffer /> : ""}
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => { Actions.cancelDetails(dispatch, e); handleClose(); }} color="primary">
          Cancel
          </Button>
        <Button
          disabled={(Object.keys(todoDetails.todoDetails.todoDetailsErrors).length) ? true : false}
          onClick={(e) => {
            Actions.showProgressBar(dispatch, true);
            setTimeout(() => {
              Actions.todoDetailsSubmit(dispatch, todoDetails.todoDetails);
              Actions.todoDetailsChange(dispatch, "rowId", todoDetails.todoDetails.rowId + 1);
              Actions.showProgressBar(dispatch, false);
              handleClose();
            }, 2000);
          }}
          color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>

  );
}

export default MODEL;