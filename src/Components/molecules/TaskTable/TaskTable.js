/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskTable.scss';
import TaskRow from '../TaskRow/TaskRow';

const tableHeadConfiguration = {
  summary: {
    title: 'Summary',
    uniqueClassName: 'summary-col',
    name: 'summary',
    isAscSortOrder: true,
    isSortAvailable: true,
  },
  priority: {
    title: 'Priority',
    uniqueClassName: 'priority-col',
    name: 'priority',
    isAscSortOrder: true,
    isSortAvailable: true,
  },
  createdOn: {
    title: 'Created On',
    uniqueClassName: 'created-on-col',
    name: 'createdOn',
    isAscSortOrder: true,
    isSortAvailable: true,
  },
  pendingOn: {
    title: 'Pending On',
    uniqueClassName: 'pending-on-col',
    name: 'pendingOn',
    isAscSortOrder: true,
    isSortAvailable: true,
  },
  actions: {
    title: 'Actions On',
    uniqueClassName: 'actions-on-col',
    name: 'actions',
    isAscSortOrder: true,
    isSortAvailable: false,
  },
};

const tableHeadElements = [];
for (let key in tableHeadConfiguration) {
  let obj = {
    id: key,
    element: tableHeadConfiguration[key],
  };
  tableHeadElements.push(obj);
}

const TaskTable = props => {
  const {
    taskList,
    actionOnTask,
    toggleTaskStatus,
    toggleTaskCheckedHandler,
  } = props;
  const [clickedHeaderElement,setClickedHeader] = useState('');
  const [triggerRender, setTriggerRender] = useState(false);

  const changesTaskorder = (name, isAscSortOrder) => {
    taskList.sort((elem1, elem2) => {
      if (elem1[name] < elem2[name]) {
        return -1;
      } else if (elem1[name] > elem2[name]) {
        return 1;
      }
      return 0;
    });
    if(!isAscSortOrder) {
      taskList.reverse();
    }
    setClickedHeader(name);
  };
  const clickHandler = (name, isAscSortOrder) => {
    if(clickedHeaderElement === name) {
      taskList.reverse();
      setTriggerRender(!triggerRender);
    } else  {
      changesTaskorder(name, isAscSortOrder);
    }
  };
  return (
    <table className="task-table">
      <thead>
        <tr className="task-head-row">
          {tableHeadElements.map(item => (
            <th
              key={item.id}
              className={item.element.uniqueClassName}
              name={item.element.name}
              onClick={() =>
                item.element.isSortAvailable &&
                clickHandler(item.element.name, item.element.isAscSortOrder)
              }
            >
              {item.element.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tasktable-body">
        {taskList.length > 0 &&
          taskList.map(task => (
            <TaskRow
              actionOnTask={actionOnTask}
              toggleTaskStatus={toggleTaskStatus}
              key={task.currentDate}
              task={task}
              toggleTaskCheckedHandler={toggleTaskCheckedHandler}
            ></TaskRow>
          ))}
      </tbody>
    </table>
  );
};
TaskTable.propTypes = {
  taskList: PropTypes.array.isRequired,
};

export default TaskTable;
