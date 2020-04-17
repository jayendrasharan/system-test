/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 11:29 PM
 */

import React from 'react';
import {Modal} from "react-bootstrap";
import DeleteAlertModal from "./DeleteAlertModal";

class AppModal extends React.Component {
    render() {
        const {title, body, actions, handleClose, showDialog, modalType} = this.props;
        let size = "lg"
        let component = null;
        switch (modalType) {
            case "delete_alert_modal":
                size = "md";
                component = <DeleteAlertModal title={title} body={body} actions={actions}/>;
                break;
            default:
                console.log("No Relevant Modal Type Found");
        }
        return (
            <Modal
                show={showDialog}
                size={size}
                onHide={handleClose}
                centered
            >
                {component}
            </Modal>
        );
    }

}

export default AppModal;