import React from 'react'
import {Button, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, amber } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: amber
    },
});

export const NavBar = () => {
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Button variant="contained" color="primary">All</Button>
                <Button variant="contained" color="secondary">Pending</Button>
                <Button variant="contained" color="secondary">Completed</Button>
            </MuiThemeProvider>
            <AppBar position="static">
                <Toolbar>
                    <Typography  color="inherit">Title</Typography>
                    {/* <section>
                        <IconButton aria-label="Edit" color="inherit">
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="Save" color="inherit">
                            <DoneIcon />
                        </IconButton>
                    </section> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
