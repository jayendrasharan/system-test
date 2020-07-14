import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



export default function AddTaskField(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <TextField id="standard-basic"  label="Summary*" onChange={props.addSummary}/>
            <TextField id="outlined-basic"  label="Description(Optional)" variant="outlined" onChange={props.addDescription}/>
        </div>
    );
}
