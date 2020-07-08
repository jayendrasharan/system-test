import React from "react";
import { connect } from 'react-redux';
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

    const [priority, setPriority] = React.useState('low');
    const [summary, setSummary] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date());

    const handlePriority = (e) => {
        setPriority(e.target.value);
    }

    const handleSaveTodo = () => {
        const values = {
            summary,
            description,
            dueDate,
            priority,
            createdOn: new Date()
        };
        props.saveTodoItem(values);
        props.handleClose();
    }

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
                    label="Summary"
                    type="text"
                    fullWidth
                    autoFocus
                    disabled={!isEditMode}
                    value={summary}
                    onChange={(e) => {
                        setSummary(e.target.value);
                    }}
                />
                <TextField
                    id="todo-description"
                    label="Description"
                    multiline
                    rowsMax={4}
                    fullWidth
                    disabled={!isEditMode}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br /><br />
                <div>
                    
                    <Dropdown 
                        isDisabled={!isEditMode}
                        valueColumn="value"
                        displayColumn="label"
                        selectedValue={priority}
                        data={priorities}
                        displayLabel="Priority"
                        handleChange={handlePriority}
                    />

                    <TextField
                        id="todo-duedate"
                        label="Due Date"
                        type="datetime-local"
                        defaultValue={dueDate}
                        disabled={!isEditMode}
                        className={classes.dueDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setDueDate(e.target.value)}
                    />

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveTodo} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        saveTodoItem: (values) => dispatch({
            type: "ADD_TODO_LIST",
            values
        })
    }
}

export default connect(null, mapDispatchToProps)(TodoForm);