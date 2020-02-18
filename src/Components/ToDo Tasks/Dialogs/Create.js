import React, { Fragment } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

export default withStyles(styles)(
  class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        task: {
          title: "",
          description: "",
          list: "",
          due: ""
        }
      };
    }

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    handleChange = name => event => {
      this.setState({
        task: {
          ...this.state.task,
          [name]: event.target.value
        }
      });
    };

    handleSubmit = () => {
      const { task } = this.state;
      this.props.onCreate({ ...task, id: Math.floor(Math.random() * 100) });
      this.setState({
        open: false,
        task: {
          title: "",
          description: "",
          list: "",
          due: ""
        }
      });
    };

    render() {
      const { open, task } = this.state;
      return (
        <Fragment>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleToggle}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Button>
          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle id="form-dialog-title">Create a new Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below
              </DialogContentText>
              <form>
                <TextField
                  value={task.title}
                  label="Title"
                  onChange={this.handleChange("title")}
                  margin="normal"
                  className={this.props.classes.FormControl}
                />
                <br />
                <FormControl className={this.props.classes.FormControl}>
                  <InputLabel htmlFor="list">List</InputLabel>
                  <Select
                    value={task.list}
                    onChange={this.handleChange("list")}
                  >
                    {this.props.categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  value={task.description}
                  multiline
                  rows="3"
                  label="Description"
                  onChange={this.handleChange("description")}
                  margin="normal"
                  className={this.props.classes.FormControl}
                />
                <br />
                <TextField
                  value={task.due}
                  label="Due by"
                  onChange={this.handleChange("due")}
                  margin="normal"
                  className={this.props.classes.FormControl}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
