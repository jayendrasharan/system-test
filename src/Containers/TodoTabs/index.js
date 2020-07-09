import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';
import TodoList from '../TodoList';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const TodoTabs = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="All Task" />
                    <Tab label="Completed" />
                    <Tab label="Pending" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <TodoList tabView="all"  />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TodoList tabView="completed" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TodoList tabView="pending" />
            </TabPanel>
        </React.Fragment>
    );
}


export default (TodoTabs);
