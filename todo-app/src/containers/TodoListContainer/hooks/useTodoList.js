import { useEffect, useReducer } from 'react';
import reducer from '../reducer';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import mockedData from '../mockedData';

const intialState = {
  allTasks: mockedData,
  selectedTabTasks: [],
  searchText: '',
  filteredData: [],
  sortDirection: 'desc',
  sortColumn: ''
};

export default function useTodoList(selectedTab) {
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    dispatch({ type: 'getSelectedTabTasks', payload: selectedTab });
  }, [selectedTab]);
  useEffect(() => {
    if (state.searchText && state.selectedTabTasks) {
      onSearchChange(state.searchText);
    }
  }, [state.selectedTabTasks]);
  const addTask = task => {
    dispatch({ type: 'addTask', payload: { task, selectedTab } });
  };
  const saveEditedTask = task => {
    dispatch({ type: 'editTask', payload: { task, selectedTab } });
  };
  const deleteTask = task => {
    dispatch({ type: 'deleteTask', payload: { task } });
  };
  const changeTaskStatus = (task, status) => {
    dispatch({
      type: 'changeTaskStatus',
      payload: { task, selectedTab, status }
    });
  };
  const [getSearchResults] = useDebouncedCallback(searchText => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: 'searchTasks', payload: searchText });
      }, 500);
    });
  });
  const onSearchChange = searchText => {
    getSearchResults(searchText);
  };

  const sortTasks = (sortColumn, sortDirection) => {
    dispatch({ type: 'sortTasks', payload: { sortColumn, sortDirection } });
  };
  return {
    selectedTabTasks: state.selectedTabTasks,
    addTask,
    saveEditedTask,
    deleteTask,
    changeTaskStatus,
    onSearchChange,
    searchText: state.searchText,
    filteredData: state.filteredData,
    sortColumn: state.sortColumn,
    sortDirection: state.sortDirection,
    sortTasks
  };
}
