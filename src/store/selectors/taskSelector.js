import isEmpty from 'lodash/isEmpty';
import { prepareColumn } from '../../components/table/tableWrapperComponent/TableUtil';

const getTaskListSelector = state => {
  if (!isEmpty(state.taskList) && !isEmpty(state.taskList.apiResponse)) {
    let response = {};
    let columnHeaders = prepareColumn(taskListcolumnHeaders);
    response = setTableData(columnHeaders, state.taskList.apiResponse);
    return response;
  }
  return {};
};

const taskListcolumnHeaders = [
  { key: 'title', title: 'Title' },
  { key: 'currentState', title: 'Current State' },
  { key: 'createdAt', title: 'Created At' },
  { key: 'dueDate', title: 'Due Date' },
  { key: 'priority', title: 'Priority' }
];

const setTableData = (columnHeaders, responseData) => {
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

export { getTaskListSelector };
