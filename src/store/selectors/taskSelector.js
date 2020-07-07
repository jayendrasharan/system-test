import isEmpty from 'lodash/isEmpty';
import { prepareColumn } from '../../components/table/tableWrapperComponent/TableUtil';
import { setTableData, taskListcolumnHeaders, getCustomColumnsTaskList } from '../../util/TableDataSelectorUtil';

const getTaskListSelector = state => {
  if (!isEmpty(state.taskList) && !isEmpty(state.taskList.apiResponse)) {
    let response = {};
    let columnHeaders = prepareColumn(taskListcolumnHeaders, getCustomColumnsTaskList());
    response = setTableData(columnHeaders, state.taskList.apiResponse);
    return response;
  }
  return {};
};

export { getTaskListSelector };
