import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal';
import { Typography, TextField, Select, MenuItem, Button, IconButton } from '@material-ui/core'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import AddIcon from '@material-ui/icons/Add'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: 800,
    height: 500,
    paddingLeft: theme.spacing(2),
    backgroundColor: "#f4f4f4",
    boxShadow: theme.shadows[2],
  },
  paper: {
    display: "flex",
    margin: 0,
    padding: 0
  },
  titleLabel: {
    width: 100,
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    width: 600,
  },
  description: {
      marginTop: 10,
      width: "710px",
      height: "300px",
      borderRadius: 1,
      borderColor: "#f4f4f4",
      resize: "none",
      maxWidth: "800px",
      maxHeight: "300px"
  },
  listbox: {
      marginTop: 6,
      marginLeft: 0
  },
  dueDateLabel: {
      width: "80px",
      marginTop: "10px",
      marginRight: "0px"
  }
}));

const AddTaskModal = function({handleSave, openModal}) {
  const classes = useStyles();
  console.log("show modal container")
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [priority, setPriority] = React.useState('0');
  const [state, setState] = React.useState("0");
  const [dueDate, setDueDate] = React.useState("");


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSaveClick = () => {
    let taskObj = getTaskObject();
    console.log(taskObj);
    handleSave(taskObj);
    handleClose();
  };

  const handleDescChange = (e) => {
      console.log(e.target.value);
      setDesc(e.target.value);
  };
  
  const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };

  const handleDueDateChange = (e) => {
      setDueDate(e.target.value);
  };

  const handleStateChange = (e) => {
      setState(e.target.value);
  };

  const getTaskObject = () => {
    let priorities = ["None","Low", "Medium", "High"];
    let task = {
        title: title,
        description: desc,
        dueDate: new Date(),
        priority: priorities[priority],
        isDone: (state === 1)
    };
    return task;
  };


  return (
    <div>
      <IconButton 
        aria-label="add task" 
        style={{backgroundColor: 'grey', width: 60, height: 60,position: 'fixed',bottom:0, right:0}}
        onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.root}>
            <div className={classes.paper}>
                <Typography className={classes.titleLabel}>Summary</Typography>
                <TextField 
                    className={classes.title}
                    value={title}
                    onChange={handleTitleChange}
                >
                </TextField>
            </div>
            <div className={classes.paper}>
                <Typography className={classes.titleLabel} value={desc}></Typography>
            </div>
            <div className={classes.paper}>
                <TextareaAutosize
                    className={classes.description} 
                    aria-label="minimum height" 
                    rowsMin={50} 
                    placeholder="Enter description"
                    value={desc}
                    onChange={handleDescChange}
                >
                </TextareaAutosize>
            </div>
            <div className={classes.paper}>
                <Typography className={classes.titleLabel}>Priority</Typography>
                <Select
                    labelId="priority select label"
                    id="priority-select"
                    value={priority}
                    onChange={handlePriorityChange}
                    className={classes.listbox}
                >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                </Select>
                <Typography className={classes.titleLabel}>CurrentState</Typography>
                <Select
                    labelId="state select label"
                    id="state-select"
                    value={state}
                    onChange={handleStateChange}
                    className={classes.listbox} 
                >
                    <MenuItem value={0}>PENDING</MenuItem>
                    <MenuItem value={1}>COMPLETED</MenuItem>
                </Select>
                <Typography className={classes.dueDateLabel}>Due Date</Typography>
                <TextField
                    value={dueDate}
                    onChange={handleDueDateChange}
                >
                </TextField>
            </div>
            <div className={classes.paper}>
                <Button onClick={handleSaveClick}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </div>
        </div>
      </Modal>
    </div>
  );
}

AddTaskModal.propTypes = {
    handleSave: PropTypes.func.isRequired
}

export default AddTaskModal;
