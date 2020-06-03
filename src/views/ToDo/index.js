import React, {useContext, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import CustomTabs from "../../components/tab_component";
import ManageTask from "./manage_task";
import TaskList from "./task_list";
import {TodoDataContext} from "../../lib/contexts/todo_action_context";
import TodoActions from "../../actions/todo_actions";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        width:'75%',
        margin:'auto',
        boxShadow:'0px 1px 3px #00000033',
        marginTop:theme.spacing(4),
        minHeight:'90vh',
        [theme.breakpoints.down("sm")]:{
            width:'95%',
        }
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        [theme.breakpoints.down("sm")]:{
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        }
    }
}));

export default function ToDoList() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const TodoProvider = useContext(TodoDataContext);
    const {todoState,dispatch} = TodoProvider;
    const {action,tasks} = todoState;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const statusTabs = ["All Tasks","Pending","Completed"]

    return (
        <div className={classes.root}>
            <CustomTabs value={value} handleChange={handleChange} tabs={statusTabs}/>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {statusTabs.map((status,i) => {
                    const statusFlag = status.toLowerCase().replace(" ","_");
                    return (
                        <TabPanel key={i} value={value} index={i} dir={theme.direction}>
                            <TaskList status={statusFlag}/>
                        </TabPanel>
                    )
                })}
            </SwipeableViews>
            <Fab aria-label={"Add"} className={classes.fab} onClick={()=>TodoActions.setAction(dispatch,'create')}>
                <AddIcon />
            </Fab>
            <ManageTask/>
        </div>
    );
}
