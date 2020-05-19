import React from 'react';
import { Col, Row, Menu, Dropdown, Button } from 'antd';
import Search from 'antd/lib/input/Search';
import isEmpty from 'lodash/isEmpty';
import Filter from './Filter';

export const textSearch = props => {
  return (
    <Search
      placeholder={!isEmpty(props.searchInputPlaceholder) ? props.searchInputPlaceholder : 'Input search text'}
      onChange={props.onSearchChange}
      name="searchString"
      value={props.searchString}
    />
  );
};

export const FunctionButton = props => {
  return props.isDropdownButton ? (
    <Dropdown overlay={menu(props.handleMenuClick, props.dropdownOptions)}>
      <Button type="primary" size="default" onClick={event => event.stopPropagation()}>
        {props.addButtonTitle}
      </Button>
    </Dropdown>
  ) : (
    <Button type="primary" size="default" onClick={props.onButtonClick}>
      {props.addButtonTitle}
    </Button>
  );
};

const menu = (handleMenuClick, dropdownOptions) => {
  return (
    <Menu onClick={handleMenuClick}>
      {dropdownOptions.map(option => (
        <Menu.Item key={option.key}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );
};

export const FilterTableData = props => {
  return (
    <Row className="mt-1">
      <Col md={6} className="pl-2">
        {textSearch(props)}
      </Col>
      {!isEmpty(props.filter) && (
        <Col md={7} className="pl-3">
          <Filter data={props.filter} filterMethod={props.onFilterClick} selectedFilter={props.selectedFilter} />
        </Col>
      )}
      <Col md={6} />
      {props.extra ? (
        props.extra
      ) : (
        <Col md={5} className="d-flex justify-content-end" offset={isEmpty(props.filter) ? 7 : 0}>
          {FunctionButton(props)}
        </Col>
      )}
    </Row>
  );
};
