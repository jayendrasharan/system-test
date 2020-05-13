import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import { updateObject, checkValidity } from '../../../shared/Utilities/utility';

import './AddTaskForm.scss';
import { VersatileInput } from '../../atoms/VersatileInput';

const AddTaskForm = props => {
  const {
    modalClosed,
    addTaskHandler,
    editTaskHandler,
    modeContext,
    prefilledValues,
    deleteTaskhandler,
  } = props;
  console.log(modeContext, prefilledValues, 'Add task in');
  const [isFormValid, setIsFormValid] = useState(false);
  const [taskFormConfig, setTaskFormConfig] = useState({
    summary: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Add Summary',
      },
      disabled: false,
      value: '',
      validation: {
        required: true,
        minLength: 1,
        maxLength: 140,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Add Description',
        disabled: false,
      },
      value: '',
      validation: {
        required: true,
        minLength: 1,
        maxLength: 140,
      },
      valid: false,
      touched: false,
    },
    priority: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 0, displayValue: 'None' },
          { value: 1, displayValue: 'Low' },
          { value: 2, displayValue: 'Medium' },
          { value: 3, displayValue: 'High' },
        ],
      },
      disabled: false,
      value: 0,
      validation: {},
      valid: true,
    },
  });

  useEffect(() => {
    checkModes();
  }, []);

  const checkModes = () => {
    if (modeContext === 'VIEW_MODE') {
      let updatedTaskForm = {};
      for (let key in prefilledValues) {
        if (taskFormConfig[key]) {
          const newElement = updateObject(taskFormConfig[key], {
            disabled: true,
            value: prefilledValues[key],
            touched: true,
            valid: true,
          });
          updatedTaskForm[key] = newElement;
        }
      }
      console.log(updatedTaskForm, 'updated Task form');
      setTaskFormConfig(updateObject(taskFormConfig, updatedTaskForm));
    }
    if (modeContext === 'EDIT_MODE') {
      let updatedTaskForm = {};
      for (let key in prefilledValues) {
        if (taskFormConfig[key]) {
          const newElement = updateObject(taskFormConfig[key], {
            value: prefilledValues[key],
            touched: true,
            valid: true,
          });
          updatedTaskForm[key] = newElement;
        }
      }
      console.log(updatedTaskForm, 'updated Task form');
      setTaskFormConfig(updateObject(taskFormConfig, updatedTaskForm));
    }
    if (modeContext === 'DELETE_MODE') {
      let updatedTaskForm = {};
      for (let key in prefilledValues) {
        if (taskFormConfig[key]) {
          const newElement = updateObject(taskFormConfig[key], {
            value: prefilledValues[key],
            disabled: true,
            touched: true,
            valid: true,
          });
          updatedTaskForm[key] = newElement;
        }
      }
      console.log(updatedTaskForm, 'updated Task form');
      setTaskFormConfig(updateObject(taskFormConfig, updatedTaskForm));
    }
  };

  // currentDate: 1589364984248;
  // description: 'HARISH';
  // isCompleted: false;
  // priority: 0;
  // summary: 'HELLO';

  // const clearInputValues = () => {
  //   for(let key in taskFormConfig) {
  //     taskFormConfig[key].value = '';
  //   }
  // }

  const addTaskInitiate = () => {
    if (modeContext === 'ADD_MODE') {
      addTaskHandler({
        summary: taskFormConfig.summary.value,
        description: taskFormConfig.description.value,
        priority: taskFormConfig.priority.value,
        isCompleted: false,
        currentDate: new Date().getTime(),
      });
    } else {
      editTaskHandler({
        summary: taskFormConfig.summary.value,
        description: taskFormConfig.description.value,
        priority: taskFormConfig.priority.value,
        currentDate: prefilledValues.currentDate,
      });
    }
    modalClosed();
  };
  const deleteTaskInitiate = (taskId) => {
    deleteTaskhandler(taskId);
    modalClosed()
  }
  const inputChangedHandler = (event, elementId) => {
    const newElement = updateObject(taskFormConfig[elementId], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        taskFormConfig[elementId].validation,
      ),
    });
    const updatedTaskForm = updateObject(taskFormConfig, {
      [elementId]: newElement,
    });
    let formValid = false;
    for (let element in updatedTaskForm) {
      formValid = updatedTaskForm[element].valid;
    }
    setTaskFormConfig(updatedTaskForm);
    setIsFormValid(formValid);
  };

  let formElements = [];
  for (let key in taskFormConfig) {
    formElements.push({
      id: key,
      element: taskFormConfig[key],
    });
  }
  const getDeletedModeDisplay = () =>{
    return (
      <React.Fragment>
        <VersatileInput
          elementType={taskFormConfig.summary.elementType}
          elementConfig={taskFormConfig.summary.elementConfig}
          disabled={taskFormConfig.summary.disabled}
          value={taskFormConfig.summary.value}
        />
        <div className="">Do you want to delete this Task</div>
        <Button
          onClick={() =>deleteTaskInitiate(prefilledValues.currentDate)}
          type="submit"
          className="flex-inline refresh flex-center mt3 p0"
        >
          <span className="cancel-form-btn">YES</span>
        </Button>
        <Button
          onClick={modalClosed}
          type="submit"
          className="flex-inline refresh flex-center mt3 p0"
        >
          <span className="save-form-btn">NO</span>
        </Button>
      </React.Fragment>
    );
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="task-handler-buttons">
        {modeContext !== 'DELETE_MODE' &&
          formElements.map(item => (
            <VersatileInput
              key={item.id}
              elementType={item.element.elementType}
              elementConfig={item.element.elementConfig}
              disabled={item.element.disabled}
              value={item.element.value}
              changed={e => inputChangedHandler(e, item.id)}
              invalid={!item.element.valid}
              shouldValidate={item.element.validation}
              touched={item.element.touched}
            />
          ))}
        {modeContext === 'DELETE_MODE' && getDeletedModeDisplay()}
        {modeContext === 'ADD_MODE' && (
          <React.Fragment>
            <Button
              onClick={modalClosed}
              type="submit"
              className="flex-inline refresh flex-center mt3 p0"
            >
              <span className="cancel-form-btn">Cancel</span>
            </Button>
            <Button
              disabled={!isFormValid}
              onClick={addTaskInitiate}
              type="submit"
              className="flex-inline refresh flex-center mt3 p0"
            >
              <span className="save-form-btn">Save</span>
            </Button>
          </React.Fragment>
        )}
        {modeContext === 'EDIT_MODE' && (
          <React.Fragment>
            <Button
              onClick={modalClosed}
              type="submit"
              className="flex-inline refresh flex-center mt3 p0"
            >
              <span className="cancel-form-btn">Cancel</span>
            </Button>
            <Button
              disabled={!isFormValid}
              onClick={addTaskInitiate}
              type="submit"
              className="flex-inline refresh flex-center mt3 p0"
            >
              <span className="save-form-btn">Save</span>
            </Button>
          </React.Fragment>
        )}
      </div>
    </form>
  );
};
AddTaskForm.propTypes = {
  modalClosed: PropTypes.func.isRequired,
  addTaskHandler: PropTypes.func.isRequired,
  editTaskHandler: PropTypes.func.isRequired,
  modeContext: PropTypes.string.isRequired,
  prefilledValues: PropTypes.object,
};

export default AddTaskForm;
