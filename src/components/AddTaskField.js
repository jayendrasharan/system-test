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
    const [handleChangeSummary, setHandleChangeSummary] = React.useState(props.editFlag?props.editRow.summary:'');
    const [handleChangeDescription, setHandleChangeDescription] = React.useState(props.editFlag ? props.editRow.description : '');

    const handleChangeInSummary = (event) => {
        setHandleChangeSummary(event.target.value);
        props.addSummary(event);
    }

    const handleChangeInDescription = (event) => {
        setHandleChangeDescription(event.target.value);
        props.addDescription(event);
    }

    return (
        <div className={classes.root}>
            <TextField id="standard-basic" value={handleChangeSummary} label="Summary*" onChange={handleChangeInSummary}/>
            <TextField id="outlined-basic" value={handleChangeDescription} label="Description(Optional)" variant="outlined" onChange={handleChangeInDescription}/>
        </div>
    );
}
