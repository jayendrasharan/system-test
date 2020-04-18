import React from 'react';

import {Button, Col, Form, Row, Tab, Tabs} from 'react-bootstrap';
import {FiPlus} from 'react-icons/fi';
import {connect} from "react-redux";
import {hideModal, setSort, showModal} from "../../actions/appAction";
import {MODAL_TYPES} from "../../actionTypes/app";
import AppModal from "../../components/Modal/AppModal";
import {getCompletedTasks, getPendingTasks, getTasksByGroup, makeAllTasks} from "../../selectors/tasks";
import TasksListing from "../TasksListing/TasksListing";
import './App.css';

const makeMapStateToProps = () => {
    const allTasks = makeAllTasks();
    const mapStateToProps = (state) => ({
        appState: state.appState,
        tasks: {
            all: allTasks(state),
            pending: getPendingTasks(allTasks(state)),
            completed: getCompletedTasks(allTasks(state)),
            tasksByGroup: getTasksByGroup(allTasks(state)),
        }
    })

    return mapStateToProps;
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (payload) => dispatch(showModal(payload)),
        hideModal: () => dispatch(hideModal()),
        setSort: (payload) => dispatch(setSort(payload)),
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    handleSearch = (searchText) => {
        this.setState({
            searchText,
        })
    }

    handleClose = () => {
        this.props.hideModal()
    }

    render() {
        const {appState: {showDialog, modalType, sortOrder, sortKey}, tasks, setSort} = this.props;
        const {searchText} = this.state;
        return (
            <div className="App">
                <div className="container">
                    <h1>Not So Boring ToDo App</h1>
                    <Row style={{justifyContent: "space-between", textAlign: 'center', marginTop: 36}}>
                        <Col xs={8}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    placeholder="Search Tasks"
                                    onChange={(e) => {
                                        this.handleSearch(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Button variant={"primary"} onClick={() => {
                                this.props.showModal({
                                    modalType: MODAL_TYPES.ADD_TASK_MODAL,
                                    modalProps: {},
                                });
                            }}> <FiPlus/> Add Task</Button>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All">
                            <TasksListing
                                showModal={this.props.showModal}
                                handleSetSort={setSort}
                                sortOrder={sortOrder}
                                sortKey={sortKey}
                                searchText={searchText}
                                tasks={tasks.all}
                            />
                        </Tab>
                        <Tab eventKey="pending" title="Pending">
                            <TasksListing
                                handleSetSort={setSort}
                                sortOrder={sortOrder}
                                sortKey={sortKey}
                                searchText={searchText}
                                tasks={tasks.pending}
                            />
                        </Tab>
                        <Tab eventKey="completed" title="Completed">
                            <TasksListing
                                handleSetSort={setSort}
                                sortOrder={sortOrder}
                                sortKey={sortKey}
                                searchText={searchText}
                                tasks={tasks.completed}
                            />
                        </Tab>
                    </Tabs>
                </div>

                {
                    showDialog
                    && <AppModal
                        showDialog={showDialog}
                        modalType={modalType}
                        onHide={this.handleClose}
                    />
                }
            </div>
        );
    }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(App);
