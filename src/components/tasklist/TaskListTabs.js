import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const TaskListTabs = ({handleTabChange}) => {
    const [value, setValue] = React.useState(0);
    const [label1, label2, label3] = ["All", "Pending", "Completed"];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleTabChange(newValue);
    };

    return (
        <div>
             <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="tasks tab">
                    <Tab label={label1} />
                    <Tab label={label2}  />
                    <Tab label={label3} />
                </Tabs>
            </AppBar>
        </div>
    )
}

TaskListTabs.propTypes = {
    handleTabChange: PropTypes.func.isRequired
}

export default TaskListTabs
