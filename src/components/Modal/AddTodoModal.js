/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 11:27 PM
 */

import moment from "moment";
import React from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {TaskModel} from "../../models/task";
import {getFormattedDate} from "../../utils";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

const StyledRow = styled(Row)`
    margin: 0px 0px 12px;
`;

const StyledModalBody = styled(Modal.Body)`
    padding: 24px;
`;

const CustomDateButton = ({value, onClick}) => (
    <Button className="example-custom-input" onClick={onClick} variant={"light"}>
        {value}
    </Button>
);

class AddTodoModal extends React.Component {
    constructor(props) {
        super(props);
        const {modalProps: {task}} = this.props;
        this.state = {
            task: {
                createdOn: "",
                title: "",
                description: "",
                currentState: false,
                priority: "none",
                dueDate: Date.now()
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {modalProps: {task}} = this.props;
        const requiredKeys = Object.keys(TaskModel);
        if (task && requiredKeys.every(key => Object.keys(task).includes(key)))
            this.setState({
                task: {
                    id: task.id || null,
                    createdOn: task.createdOn || "",
                    title: task.title || "",
                    description: task.description || "",
                    currentState: task.currentState || false,
                    priority: task.priority || "none",
                    dueDate: task.dueDate || getFormattedDate(Date.now())
                }
            })
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
        const {task: {title, priority, description, createdOn, dueDate}, task} = this.state;
        return (
            <>
                <Modal.Header closeButton={viewOnly} backdrop={!viewOnly && 'static'}>
                    <Modal.Title>{!viewOnly && !editMode ? "New Task" : (!editMode ? "View Task" : "Edit Task")}</Modal.Title>
                </Modal.Header>
                <StyledModalBody disabled={viewOnly}>
                    <StyledRow>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            disabled={viewOnly}
                            placeholder="Summary" value={title} onChange={(e) => {
                            this.handleValueChange("title", e.target.value)
                        }}/>
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
                            <Form.Label>Due Date</Form.Label>
                            <DatePicker
                                disabled={viewOnly}
                                selected={moment(dueDate).toDate()}
                                onChange={date => {
                                    this.handleValueChange("dueDate", moment(date, "DD-MM-YYYY"))
                                }}
                                minDate={Date.now()}
                                dateFormat={"dd-MM-yyyy"}
                                placeholderText="Pick A Due Date"
                                customInput={<CustomDateButton/>}
                            />
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
                            Save
                        </Button>
                    </Modal.Footer>
                }
            </>
        );
    }

}

export default AddTodoModal;