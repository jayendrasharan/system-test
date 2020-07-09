import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';

const useStyles = makeStyles({
  cell: {
    fontSize: 15,
    backgroundColor: '#ffffff',
    zIndex: 2
  }
});

const columns = [
  { id: 'summary', label: 'Summary', sortable: true },
  { id: 'priority', label: 'Priority', sortable: true },
  { id: 'createdOn', label: 'Created on', sortable: true },
  { id: 'dueDate', label: 'Due date', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actionButtons', label: 'Actions' }
];

export default function TodoListHead(props) {
  const classes = useStyles();

  const createSortHandler = (row, direction) => {
    props.sortTasks(row, direction === 'asc' ? 'desc' : 'asc');
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(row =>
          row.sortable ? (
            <TableCell
              className={classes.cell}
              style={{ marginLeft: 10 }}
              key={row.id}
            >
              <Tooltip title="Sort" placement={'bottom-end'} enterDelay={300}>
                <TableSortLabel
                  active={row.id === props.sortColumn}
                  direction={props.sortDirection}
                  onClick={() => createSortHandler(row.id, props.sortDirection)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell key={row.id} className={classes.cell}>
              {row.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
