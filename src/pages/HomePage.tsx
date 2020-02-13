import React, { useReducer } from 'react';
import Home from '../components/templates/Home';
import { groupByOptions, CHANGE_GROUPBY } from '../actions/todo';
import todoReducer, { initialState, initializeState } from '../reducers/todo';
import { StateType, ActionType } from '../react-app-env';

const HomePage = () => {
  const [state, dispatch] = useReducer<StateType, ActionType>(todoReducer, initialState, initializeState) // typescript expecting 3 arguments.

  const onSelectOption = (selected: string) => {
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