import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
        webkitBoxFlex: 1,
        msFlexPositive: 1,
    }
}));

function Header(props) {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <Typography component="h6" variant={"subtitle2"}>
                        To Do
                    </Typography>
                    <div className={classes.grow}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;