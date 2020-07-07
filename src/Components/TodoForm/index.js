import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from "../Dropdown";



const useStyles = makeStyles(theme => ({
    root: {

    },
    formControl: {

    },
    dueDate: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
}));

const priorities = ['low', 'medium', 'high'].map(item => ({value: item, label: item}));

const TodoForm = props => {

    const classes = useStyles();
    const {isFormOpen, isEditMode} = props;
    return (
        <Dialog open={isFormOpen}
            maxWidth="md"
            onClose={props.handleClose}
        >
            <DialogTitle>Add / Edit Todo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="todo-title"
                    label="Title"
                    type="text"
                    fullWidth
                    autoFocus
                    disabled={!isEditMode}
                />
                <TextField
                    id="todo-description"
                    label="Description"
                    multiline
                    rowsMax={4}
                    fullWidth
                    disabled={!isEditMode}
                // value={value}
                // onChange={handleChange}
                />
                <br /><br />
                <div>
                    
                    <Dropdown 
                        isDisabled={!isEditMode}
                        valueColumn="value"
                        displayColumn="label"
                        selectedValue={priorities[0].value}
                        data={priorities}
                        displayLabel="Priority"
                        // handleChange
                    />

                    <TextField
                        id="todo-duedate"
                        label="Due Date"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        disabled={!isEditMode}
                        className={classes.dueDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleSaveTodo} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default TodoForm;