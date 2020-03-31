import React, { forwardRef, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, ButtonGroup, Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { deleteTodoAction, editTodoAction } from "../actions/todoAction";
import { ConfirmDialogBox } from "../components";

const useStyles = makeStyles(theme => ({
  complete: {
    textDecoration: "line-through"
  },
  field: {
    fontSize: 13,
    display: "inline-block"
  },
  tab: {
    fontWeight: 600,
    textTransform: "capitalize"
  },
  tabContainer: {
    marginBottom: 20
  }
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const TodoCategory = ({ handleClick, active, classes }) => (
  <ButtonGroup
    size="large"
    color="primary"
    fullWidth
    className={classes.tabContainer}
  >
    <Button
      variant={active === "all" ? "contained" : "outlined"}
      onClick={handleClick("all")}
      className={classes.tab}
    >
      All
    </Button>
    <Button
      variant={active === "open" ? "contained" : "outlined"}
      onClick={handleClick("open")}
      className={classes.tab}
    >
      Pending
    </Button>
    <Button
      variant={active === "done" ? "contained" : "outlined"}
      onClick={handleClick("done")}
      className={classes.tab}
    >
      Completed
    </Button>
  </ButtonGroup>
);

const Todos = ({
  todosData,
  configs,
  setActionableTodo,
  setMode,
  setOpenAddTodoForm,
  deleteTodo,
  actionableTodo,
  editTodo
}) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [todos, setTodos] = useState(todosData);
  const [activeTab, setActiveTab] = useState("all");
  const classes = useStyles();

  useEffect(() => {
    if (!isEmpty(todosData)) {
      localStorage.setItem("todos", JSON.stringify(todosData));
      setTodos(todosData);
    }
  }, [todosData]);

  const handleDelete = (event, rowData) => {
    setActionableTodo({ index: rowData.tableData.id, todo: rowData });
    setIsConfirm(true);
  };

  const handleTabChange = active => () => {
    if (active === "all") {
      setTodos(todosData);
    } else {
      const completedTodos = todosData.filter(
        todo => todo.currentState === active
      );
      setTodos(completedTodos);
    }
    setActiveTab(active);
  };

  const handleConfirmClose = confirm => () => {
    if (confirm) {
      deleteTodo(actionableTodo.index);
      setTimeout(() => {
        setIsConfirm(false);
      }, 1100);
    } else {
      setIsConfirm(false);
    }
  };

  return (
    <Box>
      <TodoCategory
        handleClick={handleTabChange}
        active={activeTab}
        classes={classes}
      />
      <MaterialTable
        title="Your Todos"
        icons={tableIcons}
        columns={[
          {
            title: "Summary",
            field: "title",
            searchable: true,
            grouping: false,
            sorting: configs.allowSort,
            render: rowData => {
              return (
                <Typography
                  className={
                    rowData?.currentState === "done"
                      ? `${classes.complete} ${classes.field}`
                      : classes.field
                  }
                >
                  {rowData?.title}
                </Typography>
              );
            }
          },
          {
            title: "Description",
            field: "description",
            searchable: true,
            hidden: true,
            grouping: false,
            sorting: configs.allowSort,
            render: rowData => {
              return (
                <Typography
                  className={
                    rowData?.currentState === "done"
                      ? `${classes.complete} ${classes.field}`
                      : classes.field
                  }
                >
                  {rowData?.description}
                </Typography>
              );
            }
          },
          {
            title: "Priority",
            field: "priority",
            sorting: configs.allowSort,
            grouping: configs.allowGroupBy,
            render: rowData => {
              return (
                <Typography
                  className={
                    rowData?.currentState === "done"
                      ? `${classes.complete} ${classes.field}`
                      : classes.field
                  }
                >
                  {rowData?.priority || rowData}
                </Typography>
              );
            }
          },
          {
            title: "Created on",
            field: "createdAt",
            type: "date",
            sorting: configs.allowSort,
            grouping: configs.allowGroupBy,
            render: rowData => {
              return (
                <Typography
                  className={
                    rowData?.currentState === "done"
                      ? `${classes.complete} ${classes.field}`
                      : classes.field
                  }
                >
                  {new Date(rowData?.createdAt || rowData).toLocaleDateString()}
                </Typography>
              );
            }
          },
          {
            title: "Due date",
            field: "dueDate",
            type: "date",
            sorting: configs.allowSort,
            grouping: configs.allowGroupBy,
            render: rowData => {
              return (
                <Typography
                  className={
                    rowData?.currentState === "done"
                      ? `${classes.complete} ${classes.field}`
                      : classes.field
                  }
                >
                  {new Date(rowData?.dueDate || rowData).toLocaleDateString()}
                </Typography>
              );
            }
          }
        ]}
        data={todos}
        actions={[
          rowData => ({
            icon: tableIcons.Edit,
            tooltip: "Edit Todo",
            onClick: (event, rowData) => {
              setMode("edit");
              setActionableTodo({ index: rowData.tableData.id, todo: rowData });
              setOpenAddTodoForm(true);
            },
            disabled: rowData.currentState === "done"
          }),
          {
            icon: tableIcons.Delete,
            tooltip: "Delete Todo",
            onClick: handleDelete
          },
          rowData => ({
            icon:
              rowData.currentState === "open"
                ? tableIcons.Check
                : tableIcons.Clear,
            tooltip:
              rowData.currentState === "open"
                ? "Complete Todo"
                : "Re-Open Todo",
            onClick: (event, rowData) => {
              rowData.currentState =
                rowData.currentState === "open" ? "done" : "open";
              editTodo(rowData.tableData.id, rowData);
            }
          })
        ]}
        options={{
          actionsColumnIndex: -1,
          search: configs.allowSearch,
          grouping: true,
          actionsCellStyle: {
            fontWeight: 600
          }
        }}
        onRowClick={(event, rowData) => {
          setMode("view");
          setActionableTodo({ index: rowData.tableData.id, todo: rowData });
          setOpenAddTodoForm(true);
        }}
      />
      <ConfirmDialogBox
        onClose={handleConfirmClose}
        open={isConfirm}
        title="Are you sure ?"
        description="Do you want to delete this todo"
      />
    </Box>
  );
};

Todos.propTypes = {
  todosData: PropTypes.array,
  configs: PropTypes.object,
  setActionableTodo: PropTypes.func,
  setMode: PropTypes.func,
  setOpenAddTodoForm: PropTypes.func,
  deleteTodo: PropTypes.func,
  actionableTodo: PropTypes.object,
  editTodo: PropTypes.func
};

const mapStateToProps = state => {
  const { todoReducer } = state;
  return {
    todosData: todoReducer?.todos,
    configs: todoReducer?.configs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: index => dispatch(deleteTodoAction(index)),
    editTodo: (index, payload) => dispatch(editTodoAction(index, payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
