import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import TaskList from '../../organisms/TaskList';
import Modal from '../../molecules/Modal';
import AddTaskForm from '../../molecules/AddTaskForm';

const ToDoApp = ({
  taskList,
  addTask,
  toggleTaskStatus,
  editTask,
  deleteTask,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modeContext, setModeContext] = useState('ADD_MODE');
  const [taskInfo, setTaskInfo] = useState({});

  const actionOnTask = (task, actionType) => {
    setModeContext(actionType);
    setTaskInfo(task);
    setModalVisible(true);
  };

  const addTaskBtnHandler = () => {
    setModeContext('ADD_MODE');
    setModalVisible(true);
  };

  console.log(taskList, taskList);
  return (
    <React.Fragment>
      <TaskList
        taskList={taskList}
        actionOnTask={actionOnTask}
        toggleTaskStatus={toggleTaskStatus}
      ></TaskList>
      <Modal show={isModalVisible} modalClosed={() => setModalVisible(false)}>
        <AddTaskForm
          modalClosed={() => setModalVisible(false)}
          addTaskHandler={addTask}
          modeContext={modeContext}
          prefilledValues={taskInfo}
          editTaskHandler={editTask}
          deleteTaskhandler={deleteTask}
        ></AddTaskForm>
      </Modal>
      <Button
        onClick={addTaskBtnHandler}
        type="submit"
        className="flex-inline refresh flex-center mt3 p0"
      >
        <span className="add-task-button">+</span>
      </Button>
    </React.Fragment>
  );
};
export default ToDoApp;
ToDoApp.propTypes = {
  taskList: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  toggleTaskStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
