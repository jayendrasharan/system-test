import React from 'react';

import {Button, Col, Container, Form, Modal, Row, Tab, Tabs} from 'react-bootstrap';
import {FiPlus} from 'react-icons/fi';
import {connect} from "react-redux";
import {hideModal, showModal} from "../../actions/appAction";
import TasksListing from "../TasksListing";
import './App.css';

const mapStateToProps = (state) => ({
    appState: state.appState,
    tasksState: state.tasksState,
});

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (payload) => dispatch(showModal(payload)),
        hideModal: () => dispatch(hideModal()),
    }
};

class App extends React.Component {

    handleShowModal = () => {

    }

    handleClose = () => {
        this.props.hideModal()
    }

    render() {
        const {appState: {showDialog}} = this.props;
        const {tasksState: {tasks}} = this.props;
        return (
            <div className="App">
                <div className="container">
                    <Container>
                        <Row style={{justifyContent: "space-between", textAlign: 'center'}}>
                            <Col xs={8}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Search Tasks"/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Button variant={"primary"} onClick={() => {
                                    this.props.showModal({});
                                }}> <FiPlus/> Add Task</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All">
                            <TasksListing tasks={tasks}/>
                        </Tab>
                        <Tab eventKey="pending" title="Pending">
                            Pending
                        </Tab>
                        <Tab eventKey="completed" title="Completed">
                            Completed
                        </Tab>
                    </Tabs>
                </div>

                <Modal
                    show={showDialog}
                    size={"lg"}
                    onHide={this.handleClose}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
