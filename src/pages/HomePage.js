import React, { useReducer } from 'react';
import Home from '../components/templates/Home';
import { groupByOptions, CHANGE_GROUPBY } from '../actions/todo';
import todoReducer, { initialState } from '../reducers/todo';

const HomePage = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState) // typescript expecting 3 arguments.

  const onSelectOption = (selected) => {
    dispatch({ type: CHANGE_GROUPBY, payload: {
      value: selected }
    })
  }

  return (
    <Home 
      groupBy={{
        options: groupByOptions,
        selected: state.groupBy,
        onSelect: onSelectOption
      }}
    />
  )
}

export default HomePage;