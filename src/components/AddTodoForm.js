import React, { useState, useEffect } from "react";
import { isEmpty, isEqual } from "lodash";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addTodoAction,
  editTodoAction,
  retainTodoAction
} from "../actions/todoAction";
import { ConfirmDialogBox } from "../components";

const useStyles = makeStyles(theme => ({
  info: {
    paddingTop: "8px !important"
  }
}));

const todoDataSkelton = {
  currentState: "open",
  title: "",
  description: "",
  createdAt: new Date(),
  dueDate: new Date(),
  priority: "None"
};

const AddTodoForm = ({
  mode,
  todoIndex,
  todoData,
  addTodo,
  retainTodos,
  isOpen,
  editTodo,
  closeModal
}) => {
  const [todo, setTodo] = useState(todoData || todoDataSkelton);
  const [isConfirm, setIsConfirm] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (!isEmpty(storedTodos)) retainTodos(storedTodos);
  }, [retainTodos, addTodo]);

  useEffect(() => {
    if (mode === "edit" || mode === "view")
      setTodo(todoData || todoDataSkelton);
  }, [todoData, mode]);

  const submitTodoData = e => {
    e.preventDefault();
    setIsConfirm(true);
  };

  const handleConfirmClose = confirm => () => {
    let timing = 1100;
    if (confirm) {
      if (mode === "add") {
        addTodo(todo);
      } else if (mode === "edit" && !isEqual(todoData, todo)) {
        editTodo(todoIndex, todo);
      } else {
        timing = 1;
      }
      setTimeout(() => {
        setIsConfirm(false);
        closeModal(true);
        setTodo(todoDataSkelton);
      }, timing);
    } else {
      setIsConfirm(false);
    }
  };

  const handleChange = e => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = date => {
    setTodo({
      ...todo,
      dueDate: date
    });
  };

  const renderChildren = () => {
    if (mode === "view") {
      return (
        <>
          <DialogTitle id="add-todo-title">{todo?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{todo?.description}</DialogContentText>
            <Box
              mt={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption">{`Priority: ${todo?.priority}`}</Typography>
              <Typography variant="caption">{`Created At: ${new Date(
                todo?.createdAt
              ).toLocaleDateString()}`}</Typography>
              <Typography variant="caption">{`Due Date: ${new Date(
                todo?.dueDate
              ).toLocaleDateString()}`}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeModal(true)} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      );
    }
    return (
      <>
        <DialogTitle id="add-todo-title">
          {mode === "add" ? "Add Todo" : "Edit Todo"}
        </DialogTitle>
        <form onSubmit={submitTodoData}>
          <DialogContent className={classes.info}>
            <DialogContentText>
              {mode === "add"
                ? "Add item in your checklist by simply filling this basic info"
                : "Edit the field you want to correct"}
            </DialogContentText>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              value={todo?.title}
              variant="outlined"
              fullWidth
              autoFocus
              margin="normal"
              inputProps={{
                minLength: "10",
                maxLength: "140"
              }}
              onChange={handleChange}
            />
            <TextField
              required
              id="description"
              name="description"
              inputProps={{
                minLength: "10",
                maxLength: "500"
              }}
              label="Description"
              value={todo?.description}
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              rows="4"
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    label="Due Date"
                    id="dueDate"
                    name="dueDate"
                    inputVariant="outlined"
                    value={todo?.dueDate}
                    fullWidth
                    margin="normal"
                    onChange={handleDateChange}
                    disablePast
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                  margin="normal"
                >
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority"
                    name="priority"
                    value={todo?.priority}
                    label="Priority"
                    onChange={handleChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeModal(true)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </>
    );
  };

  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={() => closeModal(true)}
        aria-labelledby="add-todo-title"
        fullWidth={true}
        maxWidth="sm"
      >
        {renderChildren()}
      </Dialog>
      <ConfirmDialogBox
        open={isConfirm}
        onClose={handleConfirmClose}
        title="Are you sure ?"
        description="Do you want to save your changes"
      />
    </Box>
  );
};

AddTodoForm.propTypes = {
  mode: PropTypes.string,
  isOpen: PropTypes.bool,
  todoIndex: PropTypes.number,
  todoData: PropTypes.object,
  addTodo: PropTypes.func,
  editTodo: PropTypes.func,
  closeModal: PropTypes.func,
  retainTodos: PropTypes.func
};

AddTodoForm.defaultProps = {
  addTodo: () => {},
  editTodo: () => {},
  closeModal: () => {},
  retainTodos: () => {},
  mode: "add",
  isOpen: false,
  todoIndex: null,
  todoData: null
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    addTodo: payload => dispatch(addTodoAction(payload)),
    editTodo: (index, payload) => dispatch(editTodoAction(index, payload)),
    retainTodos: todos => dispatch(retainTodoAction(todos))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);
