import React, { Component } from 'react';
import { Card } from 'antd';
import intl from 'react-intl-universal';
import TableWrapper from '../table/tableWrapperComponent/TableWrapper';
import { filterData } from '../table/tableWrapperComponent/TableUtil';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import AddTask from '../modals/AddTask';

class ToDo extends Component {
  state = {
    taskList: {},
    openAddTaskModal: false
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
  toggleTaskModal = () => this.setState({ ...this.state, openAddTaskModal: !this.state.openAddTaskModal });
  onClickAddCarrierGroup = () => {
    this.props.routeToAddCarrierGroup({});
  };
  createActionColumn = record => (
    <div key={`actionColumn_${record.key}`}>
      <a className="link-override">{intl.get('VIEW_DETAIL_TITLE')}</a>
    </div>
  );
  addTask = payload => {
    this.props.saveTask({
      ...payload,
      currentState: 'open',
      createdAt: new Date().toDateString(),
      dueDate: payload.dueDate.toDate().toDateString()
    });
    this.toggleTaskModal();
  };
  render() {
    return (
      <div className="container">
        <Card className="mt-4">
          {!isEmpty(this.state.taskList) && (
            <TableWrapper
              pagination={true}
              showFilterComponent={true}
              allowFilterToColumn={['title']}
              searchInputPlaceholder={'Search by title'}
              columnHeaders={this.props.taskList.columnHeaders}
              dataSource={this.props.taskList.rowData}
              onButtonClick={this.openAddTaskModal}
              addButtonTitle={intl.get('ADD_TASK')}
              // filter={filterData()}
              search={true}
              actionRequired={true}
              action={this.createActionColumn}
            />
          )}
          <AddTask
            carrierLobs={this.props.carrierLobs}
            context={this.props.context}
            allUsers={this.props.allUsers}
            getCarrierLobs={this.props.getCarrierLobs}
            openAddTaskModal={this.state.openAddTaskModal}
            toggleTaskModal={this.toggleTaskModal}
            addTask={this.addTask}
          />
        </Card>
      </div>
    );
  }
}

export default ToDo;
