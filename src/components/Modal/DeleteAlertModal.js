/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:28 PM
 */

import React from 'react';
import {Button, Modal} from "react-bootstrap";

class DeleteAlertModal extends React.Component {
    handleClose = () => {

    }

    render() {
        const {task} = this.props;
        return (
            <>
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete task - <b>{task.title}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </>
        );
    }

}

export default DeleteAlertModal;