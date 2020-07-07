import React, { Component } from 'react';
import { Form, Modal } from 'antd';
import intl from 'react-intl-universal';
import AddTaskForm from '../forms/AddTaskForm';
import isEmpty from 'lodash/isEmpty';

class AddTaskModal extends Component {
  addTask = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.readOnly) {
          this.props.toggleTaskModal();
        } else if (!isEmpty(this.props.selectedTask)) {
          this.props.editTask(values);
        } else {
          this.props.addTask(values);
        }
      }
    });
  };
  render() {
    return (
      <Modal
        destroyOnClose={true}
        title={this.props.readOnly ? intl.get('VIEW_TASK') : intl.get('ADD_NEW_TASK')}
        okType="primary"
        visible={this.props.openAddTaskModal}
        onCancel={this.props.toggleTaskModal}
        onOk={this.addTask}
        className="add-task-modal"
      >
        <Form className="add-group-card-form ">
          <AddTaskForm form={this.props.form} data={this.props.selectedTask} readOnly={this.props.readOnly} />
        </Form>
      </Modal>
    );
  }
}
const AddTask = Form.create({ name: 'add_task' })(AddTaskModal);
export default AddTask;
