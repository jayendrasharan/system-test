import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AddTask from './AddTask';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    },
     tabs: {
         '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function NavBar(props) {
    const classes = useStyles();
   

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        size="small"
                    >
                        <AddTask addSummary={props.addSummary} addDescription={props.addDescription} addDueDate={props.addDueDate} addPriority={props.addPriority} submit={props.submit} editRow={props.editRow} editFlag={props.editFlag} edit={props.edit}/>
                   </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                            onChange={props.updateSearch}
                        />
                       
                    </div>
                    <div className={classes.tabs}>
                        <Tooltip title="Display All Tasks" aria-label="add">
                            <Button variant="contained" onClick={() => props.changeTitle("All Tasks")}>All Tasks</Button>
                        </Tooltip>
                        <Tooltip title="Display Pending Tasks" aria-label="add">
                            <Button variant="contained" onClick={() => props.changeTitle("Pending Tasks")}>Pending</Button>
                        </Tooltip>
                            <Tooltip title="Display Completed Tasks" aria-label="add">
                            <Button variant="contained" onClick={() => props.changeTitle("Completed Tasks")}>Completed</Button>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;