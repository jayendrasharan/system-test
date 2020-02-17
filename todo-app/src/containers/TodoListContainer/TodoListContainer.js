import React, { useState } from 'react';
import useTodoList from './hooks/useTodoList';
import Home from '../../components/Home';

export default function TodoListContainer() {
  const [selectedTab, setSelectedTab] = useState('allTasks');
  const {
    selectedTabTasks,
    addTask,
    saveEditedTask,
    deleteTask,
    changeTaskStatus,
    onSearchChange,
    searchText,
    filteredData,
    sortColumn,
    sortDirection,
    sortTasks
  } = useTodoList(selectedTab);
  return (
    <Home
      addTask={addTask}
      selectedTabTasks={searchText ? filteredData : selectedTabTasks}
      setSelectedTab={tab => setSelectedTab(tab)}
      saveEditedTask={saveEditedTask}
      deleteTask={deleteTask}
      changeTaskStatus={changeTaskStatus}
      onSearchChange={onSearchChange}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      sortTasks={sortTasks}
      searchText={searchText}
    />
  );
}
