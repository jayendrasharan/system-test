import React from 'react';

import {Button, Col, Form, Row, Tab, Tabs} from 'react-bootstrap';
import {FiPlus} from 'react-icons/fi';
import {connect} from "react-redux";
import styled from 'styled-components';
import {hideModal, setGroupBy, setSort, showModal} from "../../actions/appAction";
import {MODAL_TYPES} from "../../actionTypes/app";
import AppModal from "../../components/Modal/AppModal";
import {TaskModel} from "../../models/task";
import {getCompletedTasks, getPendingTasks, getTasksByGroup, makeAllTasks} from "../../selectors/tasks";
import TasksListing from "../TasksListing/TasksListing";
import './App.css';

const makeMapStateToProps = () => {
    const allTasks = makeAllTasks();
    const mapStateToProps = (state) => {
        const {appState: {groupByKey}} = state;
        return {
            appState: state.appState,
            tasks: {
                all: allTasks(state),
                pending: getPendingTasks(allTasks(state)),
                completed: getCompletedTasks(allTasks(state)),
                tasksByGroup: getTasksByGroup(allTasks(state), groupByKey),
            }
        }
    }

    return mapStateToProps;
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (payload) => dispatch(showModal(payload)),
        hideModal: () => dispatch(hideModal()),
        setSort: (payload) => dispatch(setSort(payload)),
        setGroupBy: (groupByKey) => dispatch(setGroupBy(groupByKey)),
    }
};

const SearchField = styled(Form.Control)`
    color: white;
    background-color: #495057;
    border: none;
    transition: all 0.1s ease;
`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
        this.searchInput = React.createRef();
        this.focusSearchHandler = this.focusSearchHandler.bind(this);
    }

    focusSearchHandler = (e) => {
        if (e.ctrlKey && e.shiftKey && e.which === 70) {
            this.searchInput.focus();
        } else if (e.keyCode === 27) {
            this.searchInput.blur();
        }
    }

    componentDidMount() {
        document.addEventListener('keyup', this.focusSearchHandler, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.focusSearchHandler, false);
    }

    handleSearch = (searchText) => {
        this.setState({
            searchText,
        })
    }

    handleClose = () => {
        this.props.hideModal()
    }

    getGroupOptions = () => {
        return Object.keys(TaskModel).filter(taskKey => {
            return TaskModel[taskKey].allowGroupBy;
        }).map((key, index) => <option value={key} key={key + "-" + index}>{TaskModel[key].label}</option>)
    }

    render() {
        const {appState: {showDialog, modalType, sortOrder, sortKey, groupByKey = ""}, showModal, setGroupBy, tasks, setSort} = this.props;
        const {searchText} = this.state;
        const tasksListingProps = {
            handleSetSort: setSort,
            sortOrder: sortOrder,
            sortKey: sortKey,
            groupByKey: groupByKey,
            searchText: searchText,
            showModal: showModal,
        }
        return (
            <div className="App">
                <div className="container">
                    <h1>Not So Boring ToDo App</h1>
                    <Row style={{justifyContent: "space-between", marginTop: 36}}>
                        <Col xs={3}>
                            <Form.Label column>
                                Group By
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    as="select" value={groupByKey}
                                    onChange={(e) => {
                                        setGroupBy(e.target.value);
                                    }}
                                >
                                    <option>none</option>
                                    {this.getGroupOptions()}
                                </Form.Control>
                            </Col>
                        </Col>
                        <Col xs={9} style={{display: "flex", flexDirection: "column"}}>
                            <span style={{padding: "7px 15px"}}>Hit <kbd>Ctrl + Shift + F</kbd> to search</span>
                            <SearchField
                                type="text"
                                ref={(input) => {
                                    this.searchInput = input;
                                }}
                                placeholder="Search Tasks"
                                onChange={(e) => {
                                    this.handleSearch(e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <Row className="container justify-content-md-center">
                    <Button
                        variant={"primary"}
                        style={{margin: 'auto'}}
                        onClick={() => {
                            this.props.showModal({
                                modalType: MODAL_TYPES.ADD_TASK_MODAL,
                                modalProps: {},
                            });
                        }}
                    >
                        <FiPlus/> Add Task
                    </Button>
                </Row>
                <div className="container">
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All">
                            <TasksListing
                                tasks={tasks.all}
                                {...tasksListingProps}
                            />
                        </Tab>
                        <Tab eventKey="pending" title="Pending">
                            <TasksListing
                                tasks={tasks.pending}
                                {...tasksListingProps}
                            />
                        </Tab>
                        <Tab eventKey="completed" title="Completed">
                            <TasksListing
                                tasks={tasks.completed}
                                {...tasksListingProps}
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
