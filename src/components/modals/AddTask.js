import React, { Component } from 'react';
import { Form, Modal } from 'antd';
import intl from 'react-intl-universal';
import AddTaskForm from '../forms/AddTaskForm';

class AddTaskModal extends Component {
  addTask = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addTask(values);
      }
    });
  };
  render() {
    return (
      <Modal
        destroyOnClose={true}
        title={intl.get('ADD_NEW_TASK')}
        okType="primary"
        visible={this.props.openAddTaskModal}
        onCancel={this.props.toggleTaskModal}
        onOk={this.addTask}
        className="add-task-modal"
      >
        <Form className="add-group-card-form ">
          <AddTaskForm form={this.props.form} />
        </Form>
      </Modal>
    );
  }
}
const AddTask = Form.create({ name: 'add_task' })(AddTaskModal);
export default AddTask;
