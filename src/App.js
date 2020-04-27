import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

import { setGroupBy, setSort } from "./redux/actions/groupBy.js";
import { TaskModel } from "./models/task";
import {
  getCompletedTasks,
  getPendingTasks,
  getFormattedTodos,
} from "./redux/selectors/tasks";
import TodoModal from "./components/Modal/TodoModal";
import TasksListing from "./components/Tasks/TaskList";
import "./App.css";
import { FiPlus } from "react-icons/fi";
import { MODAL_TYPES } from "./models/modalType";

const App = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const groupByState = useSelector((state) => state.groupByState);
  const allTasks = useSelector((state) => getFormattedTodos(state));
  const pendingTasks = useSelector((state) =>
    getPendingTasks(getFormattedTodos(state))
  );
  const completedTasks = useSelector((state) =>
    getCompletedTasks(getFormattedTodos(state))
  );

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const handleClose = () => {
    setShowAddModal(false);
  };

  const getGroupOptions = () => {
    return Object.keys(TaskModel)
      .filter((taskKey) => {
        return TaskModel[taskKey].allowGroupBy;
      })
      .map((key, index) => (
        <option value={key} key={key + "-" + index}>
          {TaskModel[key].label}
        </option>
      ));
  };

  const _handleSetSort = (payload) => {
    dispatch(setSort(payload));
  };

  const { sortOrder, sortKey, groupByKey = "" } = groupByState;
  const tasksListingProps = {
    handleSetSort: _handleSetSort,
    sortOrder,
    sortKey,
    groupByKey,
    searchText,
  };
  return (
    <div className="App">
      <div className="container">
        <Row style={{ justifyContent: "space-between" }}>
          <Col xs={11}>
            <h1>ToDo App</h1>
          </Col>
          <Col xs={1}>
            <Button
              title="Add Task"
              onClick={() => setShowAddModal(true)}
              style={{ borderRadius: "20px" }}
            >
              <FiPlus />
            </Button>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Col xs={3}>
            <Form.Label column>Group By</Form.Label>
            <Col>
              <Form.Control
                as="select"
                value={groupByKey}
                onChange={(e) => {
                  dispatch(setGroupBy(e.target.value));
                }}
              >
                <option value="">None</option>
                {getGroupOptions()}
              </Form.Control>
            </Col>
          </Col>
          <Col xs={9} style={{ display: "flex", flexDirection: "column" }}>
            <Form.Label column>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search Tasks"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </Col>
        </Row>
      </div>
      <div className="container">
        <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
          <Tab eventKey="all" title="All">
            <TasksListing tasks={allTasks} {...tasksListingProps} />
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <TasksListing tasks={pendingTasks} {...tasksListingProps} />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <TasksListing tasks={completedTasks} {...tasksListingProps} />
          </Tab>
        </Tabs>
      </div>
      {showAddModal && (
        <TodoModal
          showDialog={showAddModal}
          modalType={MODAL_TYPES.ADD_TASK_MODAL}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default App;
