import React from 'react';
import { MenuItem, Select, InputLabel } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  label: {
    fontSize: 15,
    color: '#748b99',
    marginBottom: 12
  },
  dialogSelect: {
    width: '100%',
    fontSize: 15,
    paddingLeft: 10
  },
  dialogSelectRoot: {
    width: '100%',
    background: '#d8e0e5'
  }
});

export default function TaskDialogSelect(props) {
  const classes = useStyles();
  const {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    type
  } = props;
  const isPrioritySelect = type === 'priority';

  return (
    <div>
      <InputLabel shrink className={classes.label} focused={false}>
        props.label
      </InputLabel>
      <Select
        displayEmpty
        onChange={event => {
          isPrioritySelect
            ? setSelectedPriority(event.target.value)
            : setSelectedStatus(event.target.value);
        }}
        value={isPrioritySelect ? selectedPriority : selectedStatus}
        classes={{ select: classes.dialogSelect }}
        className={classes.dialogSelectRoot}
        disableUnderline
        IconComponent={KeyboardArrowDownIcon}
        name="task-dialog-select"
      >
        {props.options.map(option => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
