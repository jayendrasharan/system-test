import React, { Component, Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class Tasks extends Component {
  render() {
    var styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        height: 470,
        width: 600,
        overflowY: "auto"
      },
      Typography: {
        marginBottom: 10
      }
    };
    var {
      id,
      title = "Welcome!",
      description = "Please select a task",
      due = ""
    } = this.props.tsk;
    if (due !== "") {
      due = "Due by : " + due;
      title = "Task : " + title;
      description = "Description : " + description;
    }

    return (
      <Grid container sm={12}>
        <Grid item sm={6}>
          <Paper style={styles.Paper}>
            <Typography variant="h4" align="center">
              All Tasks
            </Typography>
            <br />
            {this.props.tasks.map(([due, tasks]) =>
              this.props.category ? (
                tasks.map(({ title, id, list }) =>
                  !this.props.category || this.props.category === list ? (
                    <Fragment>
                      <Typography variant="h5">{due}</Typography>
                      <List component="ul">
                        <ListItem
                          button
                          key={id}
                          onClick={() => this.props.onSelect(id)}
                        >
                          <ListItemText primary={title} />
                          <ListItemSecondaryAction>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </Fragment>
                  ) : null
                )
              ) : (
                <Fragment>
                  <Typography variant="h5">{due}</Typography>
                  <List component="ul">
                    {tasks.map(({ title, id, list }) => (
                      <ListItem
                        button
                        key={id}
                        onClick={() => this.props.onSelect(id)}
                      >
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <DeleteIcon
                              onClick={() => this.props.onDelete(id)}
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Fragment>
              )
            )}
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper style={styles.Paper}>
            <Typography variant="h4" align="center">
              Task Description
            </Typography>
            <br />
            <Typography variant="h5" style={styles.Typography}>
              {title}
            </Typography>
            <Typography variant="h6" style={styles.Typography}>
              {description}
            </Typography>
            <Typography variant="h6" style={styles.Typography}>
              {due}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Tasks;
