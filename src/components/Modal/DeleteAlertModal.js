/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:28 PM
 */

import React from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";

class DeleteAlertModal extends React.Component {

    render() {
        const {modalProps: {taskTitle, taskId}, handleDelete, handleClose, apiState: {api_pending}} = this.props;
        return (
            <>
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete task - <b>{taskTitle}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={api_pending}>
                        Close
                    </Button>
                    <Button variant="danger" disabled={api_pending} onClick={() => {
                        handleDelete(taskId)
                    }}>
                        {
                            api_pending
                            && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{marginRight: 6}}
                            />
                        }
                        Delete
                    </Button>
                </Modal.Footer>
            </>
        );
    }

}

export default DeleteAlertModal;