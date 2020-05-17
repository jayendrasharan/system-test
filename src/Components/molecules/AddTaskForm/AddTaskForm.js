import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import { updateObject, checkValidity } from '../../../shared/Utilities/utility';

import './AddTaskForm.scss';
import { VersatileInput } from '../../atoms/VersatileInput';
import DatePicker from '../../atoms/DatePicker';

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
    pendingDate: {
      type: 'pendingDate',
      value: '',
      elementConfig: { initialDate: new Date(), dateFormat: 'MMMM d, yyyy' },
    },
  });
  const [pendingOn, setPendingDate] = useState(new Date());
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
  const addTaskInitiate = () => {
    if (modeContext === 'ADD_MODE') {
      addTaskHandler({
        summary: taskFormConfig.summary.value,
        description: taskFormConfig.description.value,
        priority: taskFormConfig.priority.value,
        isCompleted: false,
        currentDate: new Date().getTime(),
        pendingDate: pendingOn.getTime(),
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
  const deleteTaskInitiate = taskId => {
    deleteTaskhandler(taskId);
    modalClosed();
  };
  const getEditButtons = () => {
    return (<React.Fragment>
          <div className="btn-section">
            <Button
              onClick={modalClosed}
              type="submit"
              className="flex-inline cancel-btn flex-center mt3 p0"
            >
              <span className="cancel-form-btn">Cancel</span>
            </Button>
            <Button
              // disabled={!isFormValid}
              onClick={addTaskInitiate}
              type="submit"
              className="flex-inline save-btn flex-center mt3 p0"
            >
              <span className="save-form-btn">Save</span>
            </Button>
          </div>
        </React.Fragment>)
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
  const getDeletedModeDisplay = () => {
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
          onClick={() => deleteTaskInitiate(prefilledValues.currentDate)}
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
  };

  return (
    <form className="task-form" onSubmit={e => e.preventDefault()}>
      {modeContext !== 'DELETE_MODE' &&
        formElements.map(item => {
          if (item.element.type === 'pendingDate') {
            return (
              <DatePicker
                getDateSelected={date => setPendingDate(date)}
                {...item.element.elementConfig}
              ></DatePicker>
            );
          } else {
            return (
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
            );
          }
        })}
      {modeContext === 'DELETE_MODE' && getDeletedModeDisplay()}
      {modeContext === 'ADD_MODE' && getEditButtons()}
      {modeContext === 'EDIT_MODE' && getEditButtons()}
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
