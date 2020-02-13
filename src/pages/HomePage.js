import React, { useReducer, useCallback } from 'react';
import Home from '../components/templates/Home';
import {
  groupByOptions, CHANGE_GROUPBY, DELETE_TODO,
  CHANGE_TODO_STATUS, tabbarOptions, CHANGE_CURRENT_TAB,
  SORT_COLUMN
} from '../actions/todo';
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

  const onTabChange = (value) => {
    dispatch({ type: CHANGE_CURRENT_TAB, payload: { value }})
  }

  const onClickSort = (event) => {
    const { currentTarget: { dataset: { columnName } }} = event;
    dispatch({ type: SORT_COLUMN, payload: { columnName }})
  }

  const filteredTasks = useCallback(() => ['open', 'done'].indexOf(state.selectedTab) === -1 ? state.tasks : state.tasks.filter(task => task.currentState === state.selectedTab), [state.selectedTab, state.tasks])

  return (
    <TableProvider value={{
      columns, config, data: filteredTasks(),
      onEdit: onRowEdit, onDelete: onRowDelete,
      onStatusChange: onRowStatusChange,
      onClickSort, sortOrder: state.sortOrder, sortBy: state.sortBy
    }}>
    <Home 
      groupBy={{
        options: groupByOptions,
        selected: state.groupBy,
        onSelect: onSelectOption
      }}
      tabbar={{
        options: tabbarOptions,
        selected: state.selectedTab,
        onSelect: onTabChange
      }}
    />
    </TableProvider>
  )
}

export default HomePage;