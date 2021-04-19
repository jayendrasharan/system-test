import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import TaskList from '../../organisms/TaskList';
import Modal from '../../molecules/Modal';
import AddTaskForm from '../../molecules/AddTaskForm';
import './ToDoApp.scss';

const ToDoApp = ({
  taskList,
  addTask,
  toggleTaskStatus,
  editTask,
  deleteTask,
  globalCompleteAction,
  globalDeleteAction,
  toggleTaskCheckedStatus,
  isFetching,
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
  const keyPressHanler = e => {
    if (e.key == 'Escape') {
      setModalVisible(false);
    }
  };
  return (
    <div className="todo-app-wrapper" onKeyDown={keyPressHanler}>
      {isFetching ? (
        <div className="">Loading ....</div>
      ) : (
        <React.Fragment>
          {taskList && <TaskList
            taskList={taskList}
            actionOnTask={actionOnTask}
            toggleTaskStatus={toggleTaskStatus}
            globalDeleteAction={globalDeleteAction}
            globalCompleteAction={globalCompleteAction}
            toggleTaskCheckedHandler={toggleTaskCheckedStatus}
          ></TaskList>}
          <Modal
            show={isModalVisible}
            modalClosed={() => setModalVisible(false)}
          >
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
            className="add-task-btn"
          >
            <span className="">+</span>
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};
export default ToDoApp;
ToDoApp.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  taskList: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  toggleTaskStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCheckedStatus: PropTypes.func.isRequired,
};
