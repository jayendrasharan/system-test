import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function AddDueDate(props) {
    const classes = useStyles();
    const [dueDate, setDueDate] = React.useState(props.editFlag ? props.editRow.dueDate : '');
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label="Due Date"
                type="date"
                value={dueDate}
                defaultValue="2020-07-24"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={props.addDueDate}
            />
        </form>
    );
}
