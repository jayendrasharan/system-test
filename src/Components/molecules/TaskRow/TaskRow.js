/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import dayjs from 'dayjs';
import PropTypes, { string, number } from 'prop-types';
import './TaskRow.scss';
import Button from '../../atoms/Button';

const PriorityValue = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: 'High',
};

const TaskRow = ({ actionOnTask, toggleTaskStatus, task }) => {
  const actionTaskHandler = (event, task, actionType) => {
    event.stopPropagation();
    actionOnTask(task, actionType);
  };
  
  const toggleTaskHandler = (event,taskId) => {
    event.stopPropagation();
    toggleTaskStatus(taskId);
  };
  
  return (
    <tr
      className="task-row-item"
      onClick={e => actionTaskHandler(e, task, 'VIEW_MODE')}
      onKeyPress={e => actionTaskHandler(e, task, 'VIEW_MODE')}
    >
      <td className="summary-col">{task.summary}</td>
      <td className="priority-col">{PriorityValue[task.priority]}</td>
      <td className="created-on-col">
        {dayjs(new Date(task.currentDate)).format('DD/MM/YYYY')}
      </td>
      <td className="pending-date-col">{task.currentDate}</td>
      <td className="actions-col">
        <Button
          onClick={e => actionTaskHandler(e, task, 'EDIT_MODE')}
          type="submit"
          className="flex-inline refresh flex-center mt3 p0"
        >
          <span className="add-task-button">Edit Task</span>
        </Button>
        <Button
          onClick={(e) => toggleTaskHandler(e,task.currentDate)}
          type="submit"
          className="flex-inline refresh flex-center mt3 p0"
        >
          <span className="add-task-button">
            {task.isCompleted ? 'Open Task' : 'Close Task'}
          </span>
        </Button>
        <Button
          onClick={e => actionTaskHandler(e, task, 'DELETE_MODE')}
          type="submit"
          className="flex-inline refresh flex-center mt3 p0"
        >
          <span className="add-task-button">Delete task</span>
        </Button>
      </td>
    </tr>
  );
};
TaskRow.propTypes = {
  taskId: PropTypes.oneOf([string, number]),
  showTaskDescription: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default TaskRow;

// {
//   "summary": "Heello",
//   "description": "helloo",
//   "priority": 0,
//   "isCompleted": false,
//   "currentDate": 1589355704314
// }
