import React from 'react';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import { Tag } from 'antd';
import intl from 'react-intl-universal';

const sortString = (a, b, col) => {
  if (a[col] < b[col]) return -1;
  if (a[col] > b[col]) return 1;
  return 0;
};

const sortDate = (a, b, col) => {
  return new Date(a[col]) - new Date(b[col]);
};

export const taskListcolumnHeaders = [
  {
    key: 'title',
    title: 'Title',
    sorter: (a, b) => sortString(a, b, 'title')
  },
  {
    key: 'currentState',
    title: 'Current State',
    sorter: (a, b) => sortString(a, b, 'currentState')
  },
  {
    key: 'createdAt',
    title: 'Created At',
    sorter: (a, b) => sortDate(a, b, 'createdAt')
  },
  {
    key: 'dueDate',
    title: 'Due Date',
    sorter: (a, b) => sortDate(a, b, 'dueDate')
  },
  {
    key: 'priority',
    title: 'Priority',
    sorter: (a, b) => sortString(a, b, 'priority')
  }
];

export const setTableData = (columnHeaders, responseData) => {
  let rowData = prepareDataSource(responseData);
  return {
    rowData: rowData,
    columnHeaders: [...columnHeaders]
  };
};

export const prepareDataSource = responseData => {
  let rowData = [];
  if (!isEmpty(responseData)) {
    rowData = [
      ...responseData.map((element, index) => {
        return { ...element, key: index };
      })
    ];
  }
  return rowData;
};

const statusColumn = () => ({
  title: intl.get('CURR_STATE'),
  key: 'currentState',
  dataIndex: 'currentState',
  render: record => (
    <span>
      <Tag color={record === 'open' ? 'volcano' : 'green'}>{capitalize(record)}</Tag>
    </span>
  )
});

export const getCustomColumnsTaskList = () => {
  return [{ key: 'currentState', columnValue: statusColumn() }];
};
