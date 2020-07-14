import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 3,
    color: '#bdbdbd'
  },
  label: {
    '&:hover': {
      color: '#1c76e6'
    }
  },
  tooltip: {
    borderRadius: 4,
    fontSize: 12
  }
});

export default function ActionButton(props) {
  const classes = useStyles();

  return (
    <Tooltip
      title={props.title}
      classes={{
        tooltip: classes.tooltip
      }}
    >
      <IconButton
        classes={{
          root: classes.root,
          label: classes.label
        }}
        onClick={props.onClick}
      >
        {props.children}
      </IconButton>
    </Tooltip>
  );
}
