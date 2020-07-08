import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Create from "../ToDo Tasks/Dialogs/Create";

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Todo App
          </Typography>

          <Create
            categories={this.props.categories}
            onCreate={this.props.onTaskCreate}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
