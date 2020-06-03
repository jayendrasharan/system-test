import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor: "#fff",
        color:theme.palette.primary.main,
        padding:"1% 1% 0 1%"
    }
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            dir={"x-reverse"}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `status-tab-${index}`,
        'aria-controls': `status-tabpanel-${index}`,
    };
}

const SFTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        fontWeight: 400,
        color: "#70707099",
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: 500,
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />)

function CustomTabs(props) {
    const classes = useStyles();
    const {value, handleChange, tabs, children} = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    aria-label="Status tabs"
                >
                    {tabs && tabs.map((tab, i) => <SFTab key={i} label={tab} {...a11yProps(i)} />)}
                </Tabs>
            </AppBar>
            {children}
        </div>
    )
}

export default CustomTabs;

