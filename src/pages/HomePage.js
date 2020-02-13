import React, { useReducer } from 'react';
import Home from '../components/templates/Home';
import { groupByOptions, CHANGE_GROUPBY } from '../actions/todo';
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
  return (
    <TableProvider value={{
      columns, config, data: state.list
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