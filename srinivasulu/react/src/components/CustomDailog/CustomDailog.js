import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { addNewTask, updatTask, getAllTasks } from "../../redux/_actions/";

function PaperComponent(props) {
  return <Paper {...props} />;
}

const prioritiesList = [
  {
    value: "none",
    label: "none",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

function CustomDailog(props) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState("none");

  useEffect(() => {
    if (props.data !== undefined) {
      if (props.data.summary !== undefined) {
        setSummary(props.data.summary);
      }
      if (props.data.description !== undefined) {
        setDescription(props.data.description);
      }
      if (props.data.priority !== undefined) {
        setPriority(props.data.priority);
      }
      if (props.data.dueDate !== undefined) {
        setDuedate(props.data.dueDate);
      }
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSummary = (event) => {
    setSummary(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDuedate = (event) => {
    setDuedate(event.target.value);
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      summary,
      description,
      priority,
      duedate,
    };
    const updateFormData = {
      ...props.data,
      summary,
      description,
      priority,
      duedate,
    };
    if (props.action === "edit") {
      props.updatTask(updateFormData);
    } else {
      props.addNewTask(formData);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            {props.action === "add" && (
              <Button color="primary" onClick={handleClickOpen}>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Button>
            )}

            {props.action === "edit" && (
              <Button color="primary" onClick={handleClickOpen}>
                Edit
              </Button>
            )}

            {props.action === "view" && (
              <Button color="primary" onClick={handleClickOpen}>
                View
              </Button>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                {props.action === "edit" && "Edit "}
                {props.action === "view" && "View "}
                {props.action === "add" && "Add "}
                Task
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="summary"
                          label="Summary"
                          name="summary"
                          onChange={handleSummary}
                          value={summary}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="description"
                          label="Description"
                          name="description"
                          placeholder="Placeholder"
                          onChange={handleDescription}
                          value={description}
                          multiline
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="priority"
                          select
                          label="Select"
                          name="priprity"
                          value={priority}
                          onChange={handleChange}
                          helperText="Please select your priority"
                        >
                          {prioritiesList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="duedate"
                          label="Due date"
                          type="date"
                          name="duedate"
                          value={duedate}
                          onChange={handleDuedate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Cancel
                </Button>
                {props.action === "view" && ""}
                {props.action === "add" && (
                  <Button onClick={handleSubmit} color="primary">
                    Save
                  </Button>
                )}
                {props.action === "edit" && (
                  <Button onClick={handleSubmit} color="primary">
                    Update
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  task: state.task,
});

const mapDispatchToProps = {
  addNewTask,
  updatTask,
  getAllTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomDailog);
