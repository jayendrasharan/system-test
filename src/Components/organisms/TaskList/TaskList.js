import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../molecules/Tabs';
import TaskTable from '../../molecules/TaskTable';
import './TaskList.scss';

const TaskList = props => {
  const { taskList, actionOnTask,toggleTaskStatus } = props;

  const createEachTab = (tabId, tabTitle, taskList) => {
    return {
      tabTitle: tabTitle,
      ariaLabel: tabTitle,
      tabClassName: 'tab-title h5-white p3',
      panelClassName: 'tab-panel',
      panelContent: renderTabContent(tabId, tabTitle, taskList),
    };
  };

  const renderTabContent = (tabId, tabTitle, taskList) => {
    return (
      <div className="tab-panel-wrapper flex">
        <TaskTable
          tabId={tabId}
          tabTitle={tabTitle}
          taskList={taskList}
          actionOnTask={actionOnTask}
          toggleTaskStatus={toggleTaskStatus}
        />
      </div>
    );
  };

  const createTabContent = () => {
    return [
      createEachTab('all-tasks', 'ALL TASKS', taskList),
      createEachTab(
        'pending-tasks',
        'PENDING TASK',
        taskList.filter(task => !task.isCompleted),
      ),
      createEachTab(
        'complete-tasks',
        'COMPLETED TASK',
        taskList.filter(task => task.isCompleted),
      ),
    ];
  };

  const defaultTabs = {
    className: 'task-list-container',
    tabsContent: createTabContent(),
    tabsId: 'taskList-tab',
    initialSelectedIndex: 0,
    tabIndexing: false,
    panelWrapClassName: 'taskList-pannel-wrapper md-mt6 sm-pt4 sm-pb3',
    tabWrapClassName: 'taskList-tabs-wrapper',
  };
  return (
    <div className="task-list-wrapper">
      <Tabs {...defaultTabs} />
    </div>
  );
};
TaskList.propTypes = {
  taskList: PropTypes.array.isRequired,
  actionOnTask: PropTypes.func.isRequired,
  toggleTaskStatus: PropTypes.func.isRequired,
};

export default TaskList;
