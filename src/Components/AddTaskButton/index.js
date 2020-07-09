import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    addtaskButton: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
}));

const AddTaskButton = props => {

    const classes = useStyles();

    return (
        <div className={classes.addtaskButton}>
            <Fab onClick={props.handleOpenForm} size="large" color="primary" aria-label="add" className={classes.margin}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default AddTaskButton;