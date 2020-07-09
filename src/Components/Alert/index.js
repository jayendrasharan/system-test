import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';

export default function Alert(props) {

    const { isAlertOpen, yesAction, noAction, alertTitle, alertMessage } = useSelector(state => state.ui);

    return (
        <div>
            <Dialog
                open={isAlertOpen}
                onClose={noAction}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={noAction} color="primary">
                        No
                    </Button>
                    <Button onClick={yesAction} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
