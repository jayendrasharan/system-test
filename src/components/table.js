import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStateValue, useDispatch } from "../store/configureStore";
import * as Actions from "../actions/action";
import { Button } from '@material-ui/core';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import EditModel from './editModel';
import MODEL from './model';
import TodoDescModel from './todoDescModel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  todoCompleted: {
    textDecorationLine: "line-through"
  },
  headerBG: {
    backgroundColor: "grey"
  }
}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'summary', numeric: true, disablePadding: false, label: 'Summary' },
  { id: 'priority', numeric: true, disablePadding: false, label: 'Priority' },
  { id: 'createdOn', numeric: true, disablePadding: false, label: 'Created On' },
  { id: 'dueDate', numeric: true, disablePadding: false, label: 'Due date' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.headerBG}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openTodo, setOpenTodo] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpenEdit(true);
  };
  const handleCloseOpen = (e) => {
    setOpenEdit(false);
  };
  const handleClickOpenTodoRow = (e) => {
    setOpenTodo(true);
  };
  const handleClickCloseTodoRow = (e) => {
    setOpenTodo(false);
  };

  const todoDetailsArray = useStateValue();
  const dispatch = useDispatch();
  const editTodo = useStateValue();
  let rows = props.addedTodos.map(i => (
    { rowId: i.rowId, summary: i.summary, priority: i.priority, createdOn: i.createdOn, dueDate: i.dueDate, actions: true }
  ));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.rowId}
                      className={todoDetailsArray.todoDetailsArray[index].todoStateCompleted == true ? classes.todoCompleted : null}
                    >
                      <TableCell align="right">{row.summary}</TableCell>
                      <TableCell align="right">{row.priority}</TableCell>
                      <TableCell align="right">{row.createdOn}</TableCell>
                      <TableCell align="right">{row.dueDate}</TableCell>
                      <TableCell align="right" component="th" scope="row">
                        <IconButton onClick={(e) => {
                          Actions.todoDetailsChange(dispatch, "rowId", 1);
                          Actions.deleteTodo(dispatch, index, todoDetailsArray.todoDetailsArray);
                        }}>
                          <DeleteIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={(e) => { Actions.editTodo(dispatch, index, todoDetailsArray.todoDetailsArray); handleClickOpen(); }}>
                          <EditIcon color="primary" />
                        </IconButton>
                        {(editTodo.editTodo.isRowEdited) ?
                          <EditModel openEdit={openEdit} iscloseEdit={(e) => handleCloseOpen()} />
                          : ""}
                        <Button color="primary"
                          onClick={(e) => {
                          todoDetailsArray.todoDetailsArray[index].todoStateCompleted == true ?
                            Actions.reopenTodo(dispatch, index, todoDetailsArray.todoDetailsArray)
                            :
                            Actions.completeTodo(dispatch, index, todoDetailsArray.todoDetailsArray)
                          }}
                        > {todoDetailsArray.todoDetailsArray[index].todoStateCompleted == true ? 're-open' : 'Done'}
                        </Button>
                        <Button color="primary" onClick={(e) => { handleClickOpenTodoRow(); Actions.editTodo(dispatch, index, todoDetailsArray.todoDetailsArray); }}>Open Todo</Button>
                        <TodoDescModel openTodo={openTodo} iscloseTodo={(e) => handleClickCloseTodoRow(e)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}