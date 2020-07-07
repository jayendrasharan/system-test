import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

const useStyles = makeStyles(theme => ({
    addtaskButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
}));

const AddTaskButton = props => {

    const classes = useStyles();

    return (
        <div className={classes.addtaskButton}>
            <IconButton color="secondary" aria-label="Add todo" component="span" onClick={props.handleOpenForm} >
                <AddCircleOutlinedIcon fontSize="large" />
            </IconButton>
        </div>
    );
};

export default AddTaskButton;