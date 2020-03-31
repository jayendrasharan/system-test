import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
