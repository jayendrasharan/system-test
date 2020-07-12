import React from 'react';
import './ConfirmationDialog.scss'
const ConfirmationDialog = (props)=>{
    return (
        <div className="dialog-wrapper">
            <div className="confirmation-message">
                {props.message}
            </div>
            <div className="actions-wrapper">
                <div className="app-button raised confirm-button" onClick={props.confirmAction}>
                    <span>Confirm</span>
                </div>
                <div className="app-button raised cancel-button" onClick={props.cancelAction}>
                    <span>Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog;