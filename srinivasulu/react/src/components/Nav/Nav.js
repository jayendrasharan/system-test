import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addNewTask, getAllTasks } from "../../redux/_actions/";
import CustomDialog from "../CustomDailog";

function Nav(props) {
  const handleClickAll = () => {
    props.getAllTasks("all");
  };

  const handleClickCompletedStatus = () => {
    props.getAllTasks("completed");
  };

  const handleClickOpenStatus = () => {
    props.getAllTasks("open");
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <div>
              <Button color="primary">
                <CustomDialog action="add" />
              </Button>

              <Button color="primary" onClick={handleClickAll}>
                All
              </Button>
              <Button color="primary" onClick={handleClickCompletedStatus}>
                completed
              </Button>

              <Button color="primary" onClick={handleClickOpenStatus}>
                Open
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  task: state.task,
});

const mapDispatchToProps = {
  addNewTask,
  getAllTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
//export default Nav;
