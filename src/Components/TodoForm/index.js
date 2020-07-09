import React from "react";
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from "../Dropdown";
import * as todoActionCreators from "../../store/actionCreators/todoActions";
import { priorities } from '../../config';


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


const TodoForm = props => {

    const classes = useStyles();
    const {isFormOpen, isEditMode} = props;

    const selectedTodoItem = props.selectedTodoItem || {};

    const [priority, setPriority] = React.useState(priorities[0].value);
    const [summary, setSummary] = React.useState('');
    const [summaryError, setSummaryError ] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [dueDate, setDueDate] = React.useState(new Date().toISOString().substr(0, 19));

    React.useEffect(() => {
        setPriority(selectedTodoItem.priority || 'low');
        setSummary(selectedTodoItem.summary || '');
        setDescription(selectedTodoItem.description || '');
        if(selectedTodoItem.dueDate && selectedTodoItem.dueDate.toISOString){
            setDueDate(selectedTodoItem.dueDate.toISOString().substr(0, 19));
        }else{
            setDueDate(selectedTodoItem.dueDate || '');
        }
        
        // setIsEditMode(false);
    }, [selectedTodoItem.priority, selectedTodoItem.summary, selectedTodoItem.description, selectedTodoItem.dueDate])
     
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
        if(confirm("Are you sure ?")){
            props.saveTodoItem(values);
            props.handleClose();
        }
    }

    return (
        <Dialog open={isFormOpen}
            maxWidth="md"
            onClose={props.handleClose}
        >
            <DialogTitle>Add Task</DialogTitle>
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
                    inputProps={{
                        maxLength: 140,
                        minLength: 10
                    }}
                    required
                    error={summaryError}
                    onChange={(e) => {
                        setSummary(e.target.value);
                        if(e.target.value.length < 10){
                            setSummaryError(true)
                        }else{
                            setSummaryError(false)
                        }
                    }}
                />
                <TextField
                    id="todo-description"
                    label="Description"
                    error={descriptionError}
                    multiline
                    required
                    rows={2}
                    rowsMax={4}
                    fullWidth
                    disabled={!isEditMode}
                    value={description}
                    inputProps={{
                        minLength: 10,
                        maxLength: 500
                    }}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        if(e.target.value.length < 10){
                            setDescriptionError(true);
                        }else{
                            setDescriptionError(false);
                        }
                    }}
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
                        value={dueDate}
                        required
                        disabled={!isEditMode}
                        className={classes.dueDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setDueDate(e.target.value)}
                    />

                    {
                        selectedTodoItem.createdOn && isEditMode === false ? (
                            <TextField
                                id="todo-createdOn"
                                label="Created On"
                                type="datetime-local"
                                value={selectedTodoItem.createdOn.toISOString().substr(0, 19)}
                                disabled={!isEditMode}
                                className={classes.dueDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={true}
                            />
                        ): null
                    }
                    {
                        selectedTodoItem.status && isEditMode === false ? (
                            <div>
                                <br/>
                                Status: {selectedTodoItem.status}
                            </div>
                        ): null
                    }

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveTodo} color="primary" disabled={isEditMode ? false : true}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};
const mapStateToProps = state => {
    return {
        selectedTodoItem: state.todos.selectedTodoItem,
        isEditMode: state.todos.isEditMode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveTodoItem: values => dispatch(todoActionCreators.saveTodoItem(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);