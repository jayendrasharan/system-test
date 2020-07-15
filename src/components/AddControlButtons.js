import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function AddControlButtons(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.editFlag ? (
                <Button variant="contained" color="primary" onClick={props.edit}>
                    Edit
            </Button>
            ) :
                (
                    <Button variant="contained" color="primary" onClick={props.submit}>
                        Submit
            </Button>
                )}
            <Button variant="contained" color="primary" onClick={props.close}>
                Cancel
            </Button>
        </div>
    );
}