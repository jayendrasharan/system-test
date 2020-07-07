import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CustomDialog from "../CustomDailog";
import Nav from "../Nav";
import { getAllTasks, updatTask, deleteTasks } from "../../redux/_actions/";

function Dashboard(props) {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    "Summary",
    "Priority",
    "Created on",
    "Due date",
    "Actions",
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    download: false,
    print: false,
    onRowsDelete: (rowsDeleted, dataRows) => {
      console.log(dataRows, "delete action", rowsDeleted);

      const tasksToDelete = rowsDeleted.data.map((d) => data[d.dataIndex]);
      console.log("tasksToDelete", tasksToDelete);
      props.deleteTasks(tasksToDelete);
    },
  };

  function statusChangeAction(row) {
    console.log("row data", row);
    if (row.currentState === "completed") {
      row.currentState = "open";
      props.updatTask(row);
    } else if (row.currentState === "open") {
      row.currentState = "completed";
      props.updatTask(row);
    }
  }

  useEffect(() => {
    props.getAllTasks("all");
  }, []);

  useEffect(() => {
    let newDataArr = [];
    if (props.task.data !== undefined && props.task.data.data !== undefined) {
      let response = props.task.data.data;
      response.data.map((res) => {
        let edit = "";
        if (res.currentState === "open") {
          edit = (
            <div>
              <Button color="primary">
                <CustomDialog action="view" data={res} />{" "}
                <CustomDialog action="edit" data={res} />
              </Button>
              <Button color="secondary" onClick={() => statusChangeAction(res)}>
                done
              </Button>
            </div>
          );
        } else {
          edit = (
            <div>
              <Button color="primary">
                <CustomDialog action="view" data={res} />
                <CustomDialog action="edit" data={res} />
              </Button>

              <Button color="secondary" onClick={() => statusChangeAction(res)}>
                Re open
              </Button>
            </div>
          );
        }

        const resInf = {
          id: res.id,
          summary: res.summary,
          priority: res.priority,
          createdAt: res.createdAt,
          dueDate: res.dueDate,
          edit: edit,
        };
        newDataArr.push(Object.values(resInf));
      });

      setData(newDataArr);
    }
  }, [props.task.data]);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Nav />
            <CustomDialog />
          </Grid>
        </Grid>

        <MUIDataTable
          title={"Task List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  task: state.task,
});

const mapDispatchToProps = {
  getAllTasks,
  updatTask,
  deleteTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
