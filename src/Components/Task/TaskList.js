import React, { useState, useMemo } from 'react'

const useSortableData = (items, config = null, groupBy) => {
  
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};


const TaskTable = (props) => {
  const { items, requestSort } = useSortableData(props.taskList || {}, props.groupBy);
  return (
    <table id="table">
      <thead>
        <tr>
        <th></th>
        <th onClick={() => requestSort('priority')}>Summary</th>
        <th onClick={() => requestSort('priority')}>Priority</th>
        <th onClick={() => requestSort('createdOn')}>Created on</th>
        <th onClick={() => requestSort('dueDate')}>Due date</th>
        <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(items && !items.length) ? <tr><td colSpan="6"> No Tasks </td></tr> :         
        items.map((task, index) => (
          (task && typeof task === "string")
          ? 
          <tr key={index}><td colSpan="6">{task && task.toUpperCase()}</td></tr> 
          :
          <tr key={index} className={task.taskStatus}>
            <td><input type="checkbox" id={task._id} checked={props.checked.get(task._id) || false} onClick={props.handleCheck}/></td>
            <td>{task.summary}</td>
            <td>{task.priority}</td>
            <td>{task.createdOn}</td>
            <td>{task.dueDate}</td>
            <td>
              <span onClick={() => props.action('edit', task._id)} >Edit </span> 
              <span onClick={() => props.action('delete', task._id)}> Delete </span>
              {task && task.taskStatus === "open" ? <span onClick={() => props.action('done', task._id)} >Done</span> : 
              <span onClick={() => props.action('re-open', task._id)} >Re-open</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function TaskList(props) {
  return (
    <div className="TaskList">
      <TaskTable taskList={props.taskList} groupBy={props.groupBy} action={props.action} checked={props.checked} handleCheck={props.handleCheck} />
    </div>
  );
}

