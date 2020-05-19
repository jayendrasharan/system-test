import React from 'react';
import { Form, Input, Col, Row, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const { Option } = Select;
const { TextArea } = Input;
export const dateFormat = 'MM/DD/YYYY';

const AddTaskForm = props => {
  const { getFieldDecorator } = props.form;
  function validateTitle(rule, value, callback) {
    if (!isEmpty(value) && value.length < 10) {
      callback(intl.get('ERROR_MSG.TITLE_LENGTH_SHORT_ERR'));
    } else if (!isEmpty(value) && value.length > 140) {
      callback(intl.get('ERROR_MSG.TITLE_LENGTH_LONG_ERR'));
    } else {
      callback();
    }
  }
  function validateDescription(rule, value, callback) {
    if (!isEmpty(value) && value.length < 10) {
      callback(intl.get('ERROR_MSG.DESC_LENGTH_SHORT_ERR'));
    } else if (!isEmpty(value) && value.length > 500) {
      callback(intl.get('ERROR_MSG.DESC_LENGTH_LONG_ERR'));
    } else {
      callback();
    }
  }
  return (
    <div className="add-group-card-form ">
      <Row gutter={16}>
        <Col md={24}>
          <Form.Item label={intl.get('TITLE')}>
            {getFieldDecorator('title', {
              initialValue: props.data ? props.data['title'] : '',
              rules: [{ required: true, message: intl.get('ERROR_MSG.TITLE_ERR'), whitespace: true }, { validator: validateTitle }]
            })(<Input name="title" placeholder="Enter a Title" />)}
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item label={'Description'}>
            {getFieldDecorator('description', {
              initialValue: props.data ? props.data['description'] : '',
              rules: [{ required: true, message: intl.get('ERROR_MSG.DESC_ERR'), whitespace: true }, { validator: validateDescription }]
            })(<TextArea name="description" allowClear={true} rows={4} />)}
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item label={intl.get('PRIORITY')}>
            {getFieldDecorator('priority', {
              initialValue: props.data ? props.data['priority'] : undefined,
              rules: [{ required: true, message: intl.get('ERROR_MSG.PRIORITY_ERR') }]
            })(
              <Select placeholder="Please select a Priority" name="priority">
                <Option value="Low">Low</Option>
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="None">None</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={6}></Col>
        <Col md={12}>
          <Form.Item label={intl.get('DUE_DATE')}>
            {getFieldDecorator('dueDate', {
              rules: [{ required: true, message: intl.get('CONFIG_AVAILABILITY.ERROR_MESSAGE.EFFECTIVE_DATE') }]
            })(<DatePicker disabledDate={current => current && current < moment().startOf('day')} format={dateFormat} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default AddTaskForm;
