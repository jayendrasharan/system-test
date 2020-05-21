import React, { Component } from 'react';
import { Card, Menu, Row, Col, Dropdown, Icon } from 'antd';
import intl from 'react-intl-universal';
import TableWrapper from '../table/tableWrapperComponent/TableWrapper';
import { filterData } from '../table/tableWrapperComponent/TableUtil';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import AddTask from '../modals/AddTask';
import { showDeleteConfirm } from '../modals/DeleteTask';

class ToDo extends Component {
  state = {
    taskList: {},
    openAddTaskModal: false,
    selectedTask: {},
    readOnly: false
  };
  componentDidMount() {
    this.props.fetchTaskList({});
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.taskList, this.props.taskList)) {
      this.setState({ ...this.state, taskList: this.props.taskList });
    }
  }
  openAddTaskModal = () => this.setState({ ...this.state, openAddTaskModal: true });
  toggleTaskModal = () => this.setState({ ...this.state, openAddTaskModal: !this.state.openAddTaskModal, selectedTask: {}, readOnly: false });

  openEditTaskModal = record => this.setState({ ...this.state, selectedTask: record, openAddTaskModal: true });

  handleMenuClick = ({ key }, record) => {
    if (key === 'viewTask') {
      this.viewTask(record);
    } else if (key === 'deleteTask') {
      this.openDeleteTaskModal(record);
    } else if (key === 'changeState') {
      this.props.changeTaskState({
        ...record,
        currentState: record.currentState === 'open' ? 'closed' : 'open'
      });
    }
  };

  viewTask = record => {
    this.setState({ ...this.state, selectedTask: record, readOnly: true, openAddTaskModal: true });
  };
  openDeleteTaskModal = task => {
    this.setState({ ...this.state, selectedTask: task }, () => showDeleteConfirm(this.deleteTask, this.resetSelectedTask));
  };

  createActionColumn = record => {
    const menu = (
      <Menu onClick={menuItem => this.handleMenuClick(menuItem, record)}>
        <Menu.Item key={'viewTask'}>{intl.get('VIEW_DETAIL_TITLE')}</Menu.Item>
        <Menu.Item key={'changeState'}>{record.currentState === 'open' ? intl.get('MARK_CLOSED') : intl.get('REOPEN_TASK')}</Menu.Item>
        <Menu.Item key={'deleteTask'}>{intl.get('DELETE_TASK')}</Menu.Item>
      </Menu>
    );
    return (
      <Row>
        <Col md={14}>
          <a className="link-override" onClick={() => this.openEditTaskModal(record)}>
            {intl.get('EDIT_TASK')}
          </a>
        </Col>
        <Col md={10}>
          <Dropdown key={record.key} overlay={menu}>
            <Icon className="ant-dropdown-link ml-1" type="ellipsis" />
          </Dropdown>
        </Col>
      </Row>
    );
  };
  addTask = payload => {
    this.props.addTask({
      ...payload,
      currentState: 'open',
      createdAt: new Date().toDateString(),
      dueDate: this.getDateString(payload)
    });
    this.toggleTaskModal();
  };
  editTask = payload => {
    const { currentState, createdAt, key } = this.state.selectedTask;
    this.props.editTask({
      ...payload,
      currentState,
      createdAt,
      key,
      dueDate: this.getDateString(payload)
    });
    this.toggleTaskModal();
  };
  deleteTask = () => {
    this.props.deleteTask(this.state.selectedTask);
    this.resetSelectedTask({ ...this.setState });
  };

  getDateString = payload => payload.dueDate.toDate().toDateString();

  resetSelectedTask = () => this.setState({ ...this.state, selectedTask: {} });

  getSaveTaskPayload(payload) {
    return {
      ...payload,
      currentState: 'open',
      createdAt: new Date().toDateString(),
      dueDate: payload.dueDate.toDate().toDateString()
    };
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center mt-2">
          {' '}
          <h3>{intl.get('APP_HEADER')}</h3>{' '}
        </div>
        <Card className="mt-4">
          {!isEmpty(this.state.taskList) && (
            <TableWrapper
              pagination={true}
              showFilterComponent={true}
              allowFilterToColumn={['title']}
              searchInputPlaceholder={'Search by Title'}
              columnHeaders={this.props.taskList.columnHeaders}
              dataSource={this.props.taskList.rowData}
              onButtonClick={this.openAddTaskModal}
              addButtonTitle={intl.get('ADD_TASK')}
              filter={filterData()}
              search={true}
              actionRequired={true}
              action={this.createActionColumn}
            />
          )}
          <AddTask
            context={this.props.context}
            openAddTaskModal={this.state.openAddTaskModal}
            selectedTask={this.state.selectedTask}
            readOnly={this.state.readOnly}
            toggleTaskModal={this.toggleTaskModal}
            addTask={this.addTask}
            editTask={this.editTask}
          />
        </Card>
      </div>
    );
  }
}

export default ToDo;
