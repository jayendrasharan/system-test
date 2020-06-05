import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, TextField, Paper, Typography, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    InputLabel, Select, MenuItem
} from "@material-ui/core";
import useStyles from "../styles";
import { useTheme } from "@material-ui/styles";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EnhancedTable from './table';
import TabBar from './tabPanel';
import * as Actions from "../actions/action";
import { useStateValue, useDispatch } from "../store/configureStore";
import MODEL from './model';
import '../compose.scss';

const TODODETAILS = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const todoDetails = useStateValue();
    const todoDetailsArray = useStateValue();
    const completeTodo = useStateValue();
    const editTodo = useStateValue();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h6" >
                    {"Add Todos"}
                </Typography>
                <span className={classes.taskButton + " circle"} onClick={handleClickOpen}>
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </span>
                <MODEL open={open} isclose={handleClose} />
                {
                    (todoDetailsArray.todoDetailsArray.length > 0) ?
                        <TabBar addedRows={todoDetailsArray.todoDetailsArray} /> : null
                }
            </Paper>
        </div>
    );
}

export default TODODETAILS;