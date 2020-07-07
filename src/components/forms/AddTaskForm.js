import React, { Fragment } from 'react';
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
              initialValue: !isEmpty(props.data) ? props.data['title'] : '',
              rules: [{ required: true, message: intl.get('ERROR_MSG.TITLE_ERR'), whitespace: true }, { validator: validateTitle }]
            })(<Input name="title" placeholder="Enter Title" disabled={props.readOnly} />)}
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item label={'Description'}>
            {getFieldDecorator('description', {
              initialValue: !isEmpty(props.data) ? props.data['description'] : '',
              rules: [{ required: true, message: intl.get('ERROR_MSG.DESC_ERR'), whitespace: true }, { validator: validateDescription }]
            })(<TextArea name="description" allowClear={true} rows={4} disabled={props.readOnly} />)}
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item label={intl.get('PRIORITY')}>
            {getFieldDecorator('priority', {
              initialValue: !isEmpty(props.data) ? props.data['priority'] : undefined,
              rules: [{ required: true, message: intl.get('ERROR_MSG.PRIORITY_ERR') }]
            })(
              <Select placeholder="Select Priority" name="priority" disabled={props.readOnly}>
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
              initialValue: !isEmpty(props.data) ? moment(new Date(props.data['dueDate']), dateFormat) : undefined,
              rules: [{ required: true, message: intl.get('ERROR_MSG.DUE_DATE_ERR') }]
            })(<DatePicker disabled={props.readOnly} disabledDate={current => current && current < moment().startOf('day')} format={dateFormat} />)}
          </Form.Item>
        </Col>
        {props.readOnly && (
          <Fragment>
            <Col md={6}>
              <Form.Item label={intl.get('CURR_STATE')}>
                {getFieldDecorator('currentState', {
                  initialValue: !isEmpty(props.data) ? props.data['currentState'] : undefined
                })(
                  <Select placeholder="Select Priority" name="currentState" disabled={props.readOnly}>
                    <Option value="open">Open</Option>
                    <Option value="closed">Closed</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col md={6}></Col>
            <Col md={12}>
              <Form.Item label={intl.get('CREATED_AT')}>
                {getFieldDecorator('createdAt', {
                  initialValue: !isEmpty(props.data) ? moment(new Date(props.data['createdAt']), dateFormat) : undefined
                })(<DatePicker disabled={props.readOnly} disabledDate={current => current && current < moment().startOf('day')} format={dateFormat} />)}
              </Form.Item>
            </Col>
          </Fragment>
        )}
      </Row>
    </div>
  );
};

export default AddTaskForm;
