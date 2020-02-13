import React, { useReducer } from 'react';
import Home from '../components/templates/Home';
import { groupByOptions, CHANGE_GROUPBY, DELETE_TODO, CHANGE_TODO_STATUS } from '../actions/todo';
import todoReducer, { initialState } from '../reducers/todo';
import { TableProvider } from '../contexts/TableContext';
import columns from '../config/tableColumns';
import config from '../config';

const HomePage = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const onSelectOption = (selected) => {
    dispatch({ type: CHANGE_GROUPBY, payload: {
      value: selected }
    })
  }

  const onRowEdit = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)

  }

  const onRowDelete = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)
    dispatch({ type: DELETE_TODO, payload: { id: rowId }})
  }

  const onRowStatusChange = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)
    dispatch({ type: CHANGE_TODO_STATUS, payload: { id: rowId }})
  }

  return (
    <TableProvider value={{
      columns, config, data: state.list,
      onEdit: onRowEdit, onDelete: onRowDelete,
      onStatusChange: onRowStatusChange
    }}>
    <Home 
      groupBy={{
        options: groupByOptions,
        selected: state.groupBy,
        onSelect: onSelectOption
      }}
    />
    </TableProvider>
  )
}

export default HomePage;