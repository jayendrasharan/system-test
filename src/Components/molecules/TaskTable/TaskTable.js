/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import './TaskTable.scss';
import TaskRow from '../TaskRow/TaskRow';

const TaskTable = props => {
  const { taskList, actionOnTask, toggleTaskStatus } = props;
  return (
    <table className="task-table">
      <thead>
        <tr className="task-head-row">
          <td
            className="summary-col"
            onClick={() => showTaskDescription(taskId, 'readOnly')}
            onKeyPress={() => showTaskDescription(taskId, 'readOnly')}
          >
            Summary
          </td>
          <td
            className="priority-col"
            onClick={() => showTaskDescription(taskId, 'readOnly')}
            onKeyPress={() => showTaskDescription(taskId, 'readOnly')}
          >
            Priority
          </td>
          <td
            className="created-on-col"
            onClick={() => showTaskDescription(taskId, 'readOnly')}
            onKeyPress={() => showTaskDescription(taskId, 'readOnly')}
          >
            Created on
          </td>
          <td
            className="pending-date-col"
            onClick={() => showTaskDescription(taskId, 'readOnly')}
            onKeyPress={() => showTaskDescription(taskId, 'readOnly')}
          >
            Pending date
          </td>
          <td
            className="actions-col"
            onClick={() => showTaskDescription(taskId, 'readOnly')}
            onKeyPress={() => showTaskDescription(taskId, 'readOnly')}
          >
            Actions
          </td>
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
