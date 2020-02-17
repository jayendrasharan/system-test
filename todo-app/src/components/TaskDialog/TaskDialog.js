import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField
} from '@material-ui/core';
import TaskDialogSelect from '../TaskDialogSelect';
import DatePicker from 'react-date-picker';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontSize: 20,
    marginBottom: 0,
    paddingBottom: 0
  },
  dialogContent: {
    padding: 20
  },
  confirmButton: {
    background: '#3f51b5',
    color: '#ffffff',
    margin: theme.spacing(1),
    '&:hover': {
      background: '#1989fa'
    }
  },
  datePicker: {
    display: 'grid',
    gridRowGap: 10,
    margin: '20px 0 20px 0',
    color: '#757575'
  }
}));

export default function TaskDialog(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const editTask = props.type === 'Edit';
  const [summary, setSummary] = useState(editTask ? props.task.summary : '');
  const [description, setDescription] = useState(
    editTask ? props.task.description : ''
  );
  const [selectedPriority, setSelectedPriority] = useState(
    editTask ? props.task.priority : 'None'
  );
  const [selectedStatus, setSelectedStatus] = useState(
    editTask ? props.task.status : 'open'
  );
  const [selectedDate, setSelectedDate] = useState(
    editTask ? props.task.dueDate : new Date()
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const onCancelClick = () => {
    props.setOpenTaskDialog(false);
  };

  const generateId = () => {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
  const onConfirm = () => {
    props.setOpenTaskDialog(false);
    if (!summary) {
      window.alert('Please enter summary');
      return;
    }
    const task = {
      id: editTask ? props.task.id : generateId(),
      summary: summary,
      description: description,
      createdOn: new Date(),
      dueDate: selectedDate,
      status: selectedStatus,
      priority: selectedPriority
    };
    if (editTask) {
      props.saveEditedTask(task);
    } else {
      props.addTask(task);
    }
  };

  return (
    <Dialog open={props.openTaskDialog} maxWidth="sm" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        {`${props.type} Task`}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label={'Summary *'}
          value={summary}
          onChange={event => setSummary(event.target.value)}
          placeholder="Add task summary"
          fullWidth
        />
        <TextField
          label={'Description (optional)'}
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="Add task Description"
          fullWidth
          rows={3}
          multiline
        />
        <div className={classes.datePicker}>
          Due Date
          <DatePicker
            clearIcon={null}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
        <TaskDialogSelect
          label={'Select Status'}
          type={'status'}
          options={['open', 'completed']}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <TaskDialogSelect
          label={'Select Priority'}
          type={'priority'}
          options={['None', 'High', 'Medium', 'Low']}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancelClick}
          variant="outlined"
          color="primary"
          data-testid="repair-update-cancel-button"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className={classes.confirmButton}
          data-testid="repair-update-confirm-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
