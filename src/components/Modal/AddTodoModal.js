/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:27 PM
 */

import moment from "moment";
import React from 'react';
import {Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const StyledRow = styled(Row)`
    margin: 0px 0px 12px;
`;

const StyledModalBody = styled(Modal.Body)`
    padding: 24px;
`;

class CustomDateButton extends React.Component {
    render() {
        const {value, onClick} = this.props
        return (
            <Button className="example-custom-input" onClick={onClick} variant={"light"}>
                {value}
            </Button>
        );
    }
}

class AddTodoModal extends React.Component {
    constructor(props) {
        super(props);
        const {modalProps: {task}} = this.props;
        this.state = {
            task: {
                title: "",
                description: "",
                currentState: false,
                priority: "none",
                dueDate: moment().toDate(),
                ...task,
            }
        }
    }

    handleValueChange = (key, value) => {
        this.setState({
            task: {
                ...this.state.task,
                [key]: value,
            }
        })
    }

    render() {
        const {editMode, handleAddTask, handleEditTask, handleClose, viewOnly, apiState: {api_pending}} = this.props;
        const {task: {title, priority, description, dueDate}, task} = this.state;
        return (
            <>
                <Modal.Header closeButton={viewOnly}>
                    <Modal.Title>{!viewOnly && !editMode ? "New Task" : (!editMode ? "View Task" : "Edit Task")}</Modal.Title>
                </Modal.Header>
                <StyledModalBody disabled={viewOnly}>
                    <StyledRow>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            disabled={viewOnly}
                            placeholder="Summary"
                            value={title}
                            onChange={(e) => {
                                this.handleValueChange("title", e.target.value)
                            }}
                        />
                    </StyledRow>
                    <StyledRow>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            disabled={viewOnly}
                            as={"textarea"} rows={4} placeholder="Description" value={description}
                            onChange={(e) => {
                                this.handleValueChange("description", e.target.value)
                            }}
                        />
                    </StyledRow>
                    <StyledRow>
                        <Col>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Form.Label>Due Date</Form.Label>
                                <DatePicker
                                    disabled={viewOnly}
                                    selected={moment(dueDate).toDate()}
                                    onChange={date => {
                                        this.handleValueChange("dueDate", moment(date))
                                    }}
                                    minDate={Date.now()}
                                    placeholderText="Pick A Due Date"
                                    dateFormat={"dd-MM-yyyy"}
                                    customInput={<CustomDateButton/>}
                                />
                            </div>
                        </Col>
                        <Col>
                            <Form.Label>Priority</Form.Label>
                            <Form.Control
                                disabled={viewOnly}
                                as="select" value={priority}
                                onChange={(e) => {
                                    this.handleValueChange("priority", e.target.value)
                                }}
                            >
                                <option>none</option>
                                <option>low</option>
                                <option>medium</option>
                                <option>high</option>
                            </Form.Control>
                        </Col>
                    </StyledRow>
                </StyledModalBody>
                {
                    !viewOnly
                    && <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} disabled={api_pending}>
                            Cancel
                        </Button>
                        <Button variant="success" disabled={api_pending} onClick={() => {
                            if (editMode) {
                                handleEditTask(task.id, task);
                            } else {
                                handleAddTask(task);
                            }
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
                            {editMode ? "Update" : "Save"}
                        </Button>
                    </Modal.Footer>
                }
            </>
        );
    }

}

export default AddTodoModal;