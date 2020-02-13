import React, { useReducer, useCallback } from 'react';
import Home from '../components/templates/Home';
import {
  groupByOptions, CHANGE_GROUPBY, DELETE_TODO,
  CHANGE_TODO_STATUS, tabbarOptions, CHANGE_CURRENT_TAB,
  SORT_COLUMN, OPEN_ADD_TASK_MODAL, OPEN_EDIT_TASK_MODAL,
  CLOSE_TASK_MODAL, SUBMIT_FORM, SEARCH_TASKS
} from '../actions/todo';
import todoReducer, { initialState } from '../reducers/todo';
import { TableProvider } from '../contexts/TableContext';
import columns from '../config/tableColumns';
import config from '../config';

const HomePage = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const actionsDisabled = state.groupBy !== 'none'

  const onSelectOption = (selected) => {
    dispatch({ type: CHANGE_GROUPBY, payload: {
      value: selected }
    })
  }

  const onRowEdit = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)
    if(!actionsDisabled) dispatch({ type: OPEN_EDIT_TASK_MODAL, payload: { id: rowId }})
  }

  const onRowDelete = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)
    if(!actionsDisabled) dispatch({ type: DELETE_TODO, payload: { id: rowId }})
  }

  const onSearchInputChange = (event) => {
    const { currentTarget: { value }} = event;
    if(!actionsDisabled) dispatch({ type: SEARCH_TASKS, payload: { value } })
  }

  const onRowStatusChange = (event) => {
    const { currentTarget: { dataset }} = event;
    const rowId = parseInt(dataset.rowId)
    if(!actionsDisabled) dispatch({ type: CHANGE_TODO_STATUS, payload: { id: rowId }})
  }

  const onTabChange = (value) => {
    if(!actionsDisabled) dispatch({ type: CHANGE_CURRENT_TAB, payload: { value }})
  }

  const onClickSort = (event) => {
    const { currentTarget: { dataset: { columnName } }} = event;
    if(!actionsDisabled) dispatch({ type: SORT_COLUMN, payload: { columnName }})
  }

  const onFormSubmit = useCallback((obj) => {
    dispatch({ type: SUBMIT_FORM, payload: obj })
  }, [])

  const onClickAddTask = useCallback(() => actionsDisabled ? null : dispatch({ type: OPEN_ADD_TASK_MODAL }), [actionsDisabled])

  const onCloseModal = useCallback(() => dispatch({ type: CLOSE_TASK_MODAL }), [])

  const filteredTasks = useCallback(() => actionsDisabled || ['open', 'done'].indexOf(state.selectedTab) === -1 ? state.tasks : state.tasks.filter(task => task.currentState === state.selectedTab), [actionsDisabled, state.selectedTab, state.tasks])

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
        onSelect: onTabChange,
        disabled: state.groupBy !== 'none'
      }}
      searchTerm={state.searchTerm}
      openModal={state.openModal}
      onClickAddTask={onClickAddTask}
      selectedTask={state.selectedTask}
      onCloseModal={onCloseModal}
      onFormSubmit={onFormSubmit}
      onSearchInputChange={onSearchInputChange}
    />
    </TableProvider>
  )
}

export default HomePage;