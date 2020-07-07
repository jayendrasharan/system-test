import React from 'react';
import isEmpty from 'lodash/isEmpty';
import intl from 'react-intl-universal';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';

export const createActionColumn = action => {
  return {
    title: intl.get('ACTION_COLUMN_TITLE'),
    dataIndex: 'actions',
    render: (text, record) => {
      return <div key={`action_${record.key}`}>{action(record)}</div>;
    }
  };
};
export const addActionColumn = (columnHeaders, actionRequired, action) => {
  let newColumnHeaders = cloneDeep(columnHeaders);
  if (!isEmpty(columnHeaders)) {
    if (actionRequired) {
      newColumnHeaders.push(createActionColumn(action));
    }
  }
  return newColumnHeaders;
};
export const prepareColumn = (columnHeaders, customColumns) => {
  let newColumnHeaders = [];
  if (!isEmpty(columnHeaders)) {
    newColumnHeaders = [...createColumnProps(columnHeaders, customColumns)];
  }
  return newColumnHeaders;
};
const createColumnProps = (columnHeaders, customColumns) => {
  return columnHeaders.map(element => {
    let foundCustomColumn = !isEmpty(customColumns) && customColumns.find(customColumn => customColumn.key === element.key);
    if (!isEmpty(customColumns) && !isEmpty(foundCustomColumn)) {
      return {
        ...element,
        ...foundCustomColumn.columnValue,
        dataIndex: element.key
      };
    } else {
      return {
        ...element,
        dataIndex: element.key
      };
    }
  });
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
export const setPagination = (givenArray, pageSize) => {
  if (!isEmpty(givenArray) && givenArray.length < pageSize + 1) {
    return false;
  } else return { pageSize: pageSize };
};
/*
 * The below function  makes sure that:
 *   Given input query string doesnt escape special chars
 */
export const escapeRegExp = inputString => {
  let val = inputString.replace(/[~`*!@#$%^&()_={}[\]:;,.<>+\/?-]/g, '\\$&');
  return val;
};
/*
 * The below function  makes sure that:
 *   Given input query string doesnt escape special chars
 *   Trims all the unwanted starting and trailing spaces
 *   General undefined and null check
 */
export const createFilterRegEx = queryString => {
  const words = queryString
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(s => !!s);
  return new RegExp(
    words
      .map((word, i) => {
        return `(?=.*${escapeRegExp(word)})`;
      })
      .join('') + '.+',
    'i'
  );
};
export const filterList = (queryString, list, filterKeys) => {
  const words = queryString
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(s => !!s);
  const searchRegex = new RegExp(
    words
      .map((word, i) => {
        return `(?=.*${escapeRegExp(word)})`;
      })
      .join('') + '.+',
    'i'
  );
  let filteredList = [];
  for (let record of list) {
    let isConditionMatched = false;
    if (!isEmpty(filterKeys)) {
      for (let key of filterKeys) {
        isConditionMatched = checkMatchForEntry(isConditionMatched, record[key], searchRegex);
        if (isConditionMatched) {
          break;
        }
      }
    } else {
      for (let entry of Object.values(record)) {
        isConditionMatched = checkMatchForEntry(isConditionMatched, entry, searchRegex);
        if (isConditionMatched) {
          break;
        }
      }
    }
    if (isConditionMatched) {
      filteredList.push(record);
    }
  }
  return filteredList;
};

const checkMatchForEntry = (isConditionMatched, entry, searchRegex) => {
  if (typeof entry === 'object' && !isEmpty(entry)) {
    if (isArray(entry)) {
      isConditionMatched = checkMatchForArray(entry, searchRegex);
    } else {
      isConditionMatched = checkMatchForObject(entry, searchRegex);
    }
  } else if (searchRegex.test(entry)) {
    isConditionMatched = true;
  }
  return isConditionMatched;
};

const checkMatchForObject = (givenObject, searchRegex) => {
  let isConditionMatched = false;
  for (let i of Object.values(givenObject)) {
    if (searchRegex.test(i)) {
      isConditionMatched = true;
      break;
    }
  }
  return isConditionMatched;
};
const checkMatchForArray = (entry, searchRegex) => {
  let isConditionMatched = false;
  for (let item of entry) {
    if (typeof item === 'object') {
      isConditionMatched = checkMatchForObject(item, searchRegex);
    } else if (searchRegex.test(item)) {
      isConditionMatched = true;
      break;
    }
    if (isConditionMatched) {
      break;
    }
  }
  return isConditionMatched;
};
/*
 * The below function is used to filter options by label and value(key) for multi-select dropdown
 */
export const filterOnLabel = (inputValue, option) => {
  const searchRegex = createFilterRegEx(inputValue);
  return searchRegex.test(option.props.label) || searchRegex.test(option.props.value);
};
export const filterData = () => {
  return {
    filterKey: 'currentState',
    filterDefaultValue: '',
    filterPrimaryValue: 'open',
    filterSecondaryValue: 'closed',
    filterDefaultTitle: intl.get('DEFAULT_FILTER_TITLE'),
    filterPrimaryTitle: intl.get('OPEN_FILTER_TITLE'),
    filterSecondaryTitle: intl.get('CLOSED_FILTER_TITLE')
  };
};
