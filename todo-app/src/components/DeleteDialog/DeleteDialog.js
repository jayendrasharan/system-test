import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog(props) {
  return (
    <Dialog open={props.openDeleteDialog} onClose={props.onCancelDelete}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to permanently remove this Task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onConfirmDelete} color="primary" autoFocus>
          Yes
        </Button>
        <Button onClick={props.onCancelDelete} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
