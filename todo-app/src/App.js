import React, { Component } from "react";
import "./App.css";
import {
  Nav,
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  DropdownButton,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";
import short from "short-uuid";
import { FiEdit, FiTrash2, FiRefreshCcw, FiCheckSquare } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      modalOpen: false,
      summary: "",
      description: "",
      dueDate: null,
      priority: "None",
      priorityList: ["None", "High", "Medium", "Low"],
      createdon: moment().format(),
      isTodoOpen: true,
      id: "",
      viewOnly: false,
      currentTab: "all",
      isEdit: false,
      openDeleteModal: false,
      modalValidations: "",
      searchString: "",
      modifiedList: [],
    };
  }
  refreshToDoState = () => {
    this.setState({
      summary: "",
      description: "",
      dueDate: "",
      priority: "None",
      createdon: moment().format(),
      isTodoOpen: true,
      id: "",
      viewOnly: false,
      isEdit: false,
      openDeleteModal: false,
      modalValidations: "",
      searchString: "",
    });
  };
  setToDoState = (item) => {
    return {};
  };
  addTodoModalOpen = (e) => {
    this.setState({ modalOpen: true });
  };
  openDeleteModal = (e, id) => {
    this.setState({ openDeleteModal: true, id: id });
  };
  closeDeleteModal = (e) => {
    this.setState({ openDeleteModal: false });
  };
  deleteTodo = (e) => {
    const { todolist, id } = this.state;
    let list = _.cloneDeep(todolist);
    list = list.filter((item) => {
      return id !== item.id;
    });
    this.setState({ todolist: list, openDeleteModal: false });
  };
  addTodoModalClose = (e) => {
    this.setState({ modalOpen: false });
    this.refreshToDoState();
  };
  changeSummary = (e) => {
    this.setState({ summary: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  handleDueDateChange = (date) => {
    console.log(date);
    this.setState({ dueDate: date });
  };
  changePriority = (e) => {
    this.setState({ priority: e });
  };
  viewModal = (e, item) => {
    this.setState({
      modalOpen: true,
      id: item.id,
      summary: item.summary,
      description: item.description,
      dueDate: item.dueDate,
      priority: item.priority,
      createdon: item.createdon,
      isTodoOpen: item.isTodoOpen,
      viewOnly: true,
    });
  };
  editModal = (e, item) => {
    this.setState({
      modalOpen: true,
      id: item.id,
      summary: item.summary,
      description: item.description,
      dueDate: item.dueDate,
      priority: item.priority,
      createdon: item.createdon,
      isTodoOpen: item.isTodoOpen,
      isEdit: true,
    });
  };
  saveTodo = () => {
    const {
      id,
      summary,
      dueDate,
      priority,
      todolist,
      description,
      isTodoOpen,
      createdon,
      isEdit,
    } = this.state;
    let err = "";
    if (summary.length < 10) {
      err = "Minimum length of Title is 10 chars";
    } else if (summary.length > 140) {
      err = "Maximum length of Title is 140 chars";
    } else if (description < 10) {
      err = "Minimum length of Description is 10 chars";
    } else if (description > 500) {
      err = "Maximum length of Description is 500 chars";
    }
    this.setState({ modalValidations: err });
    if (err.length === 0) {
      let confirmAlert = window.confirm(
        "Are you sure you want to save these changes?"
      );
      if (confirmAlert) {
        let list = _.cloneDeep(todolist);
        if (isEdit) {
          list = list.map((item) => {
            if (item.id === id) {
              item.summary = summary;
              item.priority = priority;
              item.dueDate = dueDate;
              item.description = description;
            }
            return item;
          });
        } else {
          list.unshift({
            id: short.generate(),
            summary,
            priority,
            createdon,
            dueDate,
            isTodoOpen,
            description,
          });
        }
        this.setState(
          {
            todolist: list,
            modalOpen: false,
          },
          () => {
            this.refreshToDoState();
          }
        );
      }
    }
  };
  toggleOpen = (e, id) => {
    const { todolist } = this.state;
    let list = _.cloneDeep(todolist);
    list = list.map((item) => {
      if (item.id === id) {
        item.isTodoOpen = !item.isTodoOpen;
      }
      return item;
    });
    this.setState({ todolist: list });
  };
  handleTabChange = (e, tab) => {
    this.setState({ currentTab: tab });
  };
  handleSearch = (e) => {
    this.setState({ searchString: e.target.value });
  };
  render() {
    const {
      modalValidations,
      todolist,
      modalOpen,
      summary,
      description,
      dueDate,
      priority,
      priorityList,
      viewOnly,
      currentTab,
      openDeleteModal,
      searchString,
    } = this.state;

    let modifiedList = [];
    if (searchString) {
      modifiedList = todolist.filter((item) => {
        return (
          item.summary.indexOf(searchString) > -1 ||
          item.description.indexOf(searchString) > -1
        );
      });
    } else {
      modifiedList = todolist;
    }

    if (currentTab === "all") {
      // modifiedList = modifiedList;
    } else if (currentTab === "completed") {
      modifiedList = modifiedList.filter((item) => {
        return !item.isTodoOpen;
      });
    } else if (currentTab === "pending") {
      modifiedList = modifiedList.filter((item) => {
        return item.isTodoOpen;
      });
    }

    return (
      <div className="App">
        <React.Fragment>
          <Container >
            <Row style={{margin:"20px"}}>
              <Col>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    this.handleSearch(e);
                  }}
                  value={searchString}
                  placeholder="Global Search"
                  style={{ width: "50%" }}
                  className="mr-sm-2"
                />
              </Col>
              <Col>
                <Nav
                  className="justify-content-center"
                  variant="pills"
                  activeKey={currentTab}
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="all"
                      onClick={(e) => {
                        this.handleTabChange(e, "all");
                      }}
                    >
                      All Tasks
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="completed"
                      onClick={(e) => {
                        this.handleTabChange(e, "completed");
                      }}
                    >
                      Completed
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="pending"
                      onClick={(e) => {
                        this.handleTabChange(e, "pending");
                      }}
                    >
                      Pending
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row style={{margin:"20px"}}>
              <Table bordered hover size="sm" style={{ fontSize: "14px" }}>
                <thead>
                  <tr>
                    <th>Summary</th>
                    <th>Priority</th>
                    <th>Created On</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {modifiedList &&
                    modifiedList.map((listItem, index) => {
                      return (
                        <tr
                          key={index}
                          style={{
                            backgroundColor: listItem.isTodoOpen
                              ? null
                              : "#90EE90",
                          }}
                        >
                          <td
                            onClick={(e) => {
                              this.viewModal(e, listItem);
                            }}
                          >
                            {listItem.summary}
                          </td>
                          <td
                            onClick={(e) => {
                              this.viewModal(e, listItem);
                            }}
                          >
                            {listItem.priority}
                          </td>
                          <td
                            onClick={(e) => {
                              this.viewModal(e, listItem);
                            }}
                          >
                            {moment(listItem.createdon).format(
                              "MM[/]DD[/]YYYY"
                            )}
                          </td>
                          <td
                            onClick={(e) => {
                              this.viewModal(e, listItem);
                            }}
                          >
                            {moment(listItem.dueDate).format("MM[/]DD[/]YYYY")}
                          </td>
                          <td style={{ width: "20%" }}>
                            <FiEdit
                              size={20}
                              style={{ margin: "5px" }}
                              onClick={(e) => {
                                this.editModal(e, listItem);
                              }}
                            />
                            <FiTrash2
                              size={20}
                              style={{ margin: "5px" }}
                              onClick={(e) => {
                                this.openDeleteModal(e, listItem.id);
                              }}
                            />

                            {listItem.isTodoOpen ? (
                              <FiCheckSquare
                                size={20}
                                style={{ margin: "5px" }}
                                onClick={(e) => {
                                  this.toggleOpen(e, listItem.id);
                                }}
                              />
                            ) : (
                              <FiRefreshCcw
                                size={20}
                                style={{ margin: "5px" }}
                                onClick={(e) => {
                                  this.toggleOpen(e, listItem.id);
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Row>
            <Row className="justify-content-center">
              <Col sm={11}></Col>
              <Col sm={1}>
                <Button
                  variant="primary"
                  style={{ borderRadius: "50%" }}
                  onClick={(e) => {
                    this.addTodoModalOpen(e);
                  }}
                >
                  +
                </Button>{" "}
              </Col>
            </Row>
          </Container>
          <Modal show={modalOpen} onHide={this.addTodoModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New To-Do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Form style={{ fontSize: "12px", width: "100%" }}>
                    <Form.Group controlId="Summary">
                      <Form.Label size="sm">Summary</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Enter Summary"
                        onChange={(e) => this.changeSummary(e)}
                        value={summary}
                        disabled={viewOnly}
                      />
                    </Form.Group>
                    <Form.Group controlId="Description">
                      <Form.Label size="sm">Description</Form.Label>
                      <Form.Control
                        size="sm"
                        as="textarea"
                        rows="3"
                        placeholder="Enter Description"
                        onChange={(e) => this.changeDescription(e)}
                        value={description}
                        disabled={viewOnly}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Container>
                        <Row>
                          <Col>
                            <Form.Label size="sm">Priority</Form.Label>
                            <DropdownButton
                              size="sm"
                              key={priority}
                              id={`dropdown-variants-${priority}`}
                              title={priority}
                              disabled={viewOnly}
                            >
                              {priorityList.map((item, index) => {
                                return (
                                  <Dropdown.Item
                                    key={index}
                                    eventKey={item}
                                    onSelect={(e) => this.changePriority(e)}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {item}
                                  </Dropdown.Item>
                                );
                              })}
                            </DropdownButton>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label size="sm">Due Date</Form.Label>
                              <div style={{ fontSize: "14px" }}>
                                <DatePicker
                                  selected={dueDate}
                                  onChange={this.handleDueDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  disabled={viewOnly}
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    </Form.Group>
                    <Form.Label size="sm" style={{ color: "red" }}>
                      {modalValidations}
                    </Form.Label>
                  </Form>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={this.addTodoModalClose}
                size="sm"
              >
                Cancel
              </Button>
              {!viewOnly ? (
                <Button variant="primary" onClick={this.saveTodo} size="sm">
                  Save Task
                </Button>
              ) : null}
            </Modal.Footer>
          </Modal>
          <Modal
            show={openDeleteModal}
            onHide={(e) => this.closeDeleteModal(e)}
          >
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={(e) => {
                  this.deleteTodo(e);
                }}
                size="sm"
              >
                Yes
              </Button>
              <Button
                variant="primary"
                onClick={(e) => this.closeDeleteModal(e)}
                size="sm"
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
