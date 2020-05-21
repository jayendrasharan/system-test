import React, { Component, Fragment } from 'react';
import { Table, Row } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { FilterTableData } from './FilterTableData';
import { filterList, setPagination, addActionColumn } from './TableUtil';

class TableWrapper extends Component {
  state = {
    tableColumns: [],
    displayDataSource: [],
    selectedFilter: 'All',
    filteredDataSource: [],
    searchString: ''
  };
  componentDidMount() {
    this.setState({
      tableColumns: this.props.columnHeaders,
      filteredDataSource: this.props.dataSource,
      displayDataSource: this.props.dataSource
    });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.dataSource, this.props.dataSource)) {
      this.setState({
        tableColumns: this.props.columnHeaders,
        filteredDataSource: this.props.dataSource,
        displayDataSource: this.props.dataSource,
        selectedFilter: 'All'
      });
    }
  }
  onSearchChange = event => {
    const value = event.target.value;
    this.setState({
      searchString: value,
      displayDataSource: value ? filterList(value, this.state.filteredDataSource, this.props.allowFilterToColumn) : this.state.filteredDataSource
    });
  };
  setSelectedFilter(value) {
    return value === 'true' ? 'Active' : 'Inactive';
  }
  onFilterClick = (key, value) => {
    let newDataSource = value ? filterList(value, this.props.dataSource, [key]) : this.props.dataSource;
    this.setState({
      displayDataSource: newDataSource,
      selectedFilter: !isEmpty(value) ? this.setSelectedFilter(value) : 'All',
      filteredDataSource: newDataSource,
      searchString: ''
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.showFilterComponent && (
          <FilterTableData
            searchInputPlaceholder={this.props.searchInputPlaceholder}
            onSearchChange={this.onSearchChange}
            searchString={this.state.searchString}
            selectedFilter={this.state.selectedFilter}
            onFilterClick={this.onFilterClick}
            filter={this.props.filter}
            addButtonTitle={this.props.addButtonTitle}
            onButtonClick={this.props.onButtonClick}
            extra={this.props.extra}
          />
        )}
        <Row className="mt-3">
          <Table
            className={this.props.className}
            indentSize={10}
            columns={addActionColumn(this.props.columnHeaders, this.props.actionRequired, this.props.action)}
            dataSource={this.state.displayDataSource}
            pagination={this.props.pagination ? setPagination(this.state.displayDataSource, 10) : false}
            expandedRowRender={record => <p>{record.description}</p>}
          />
        </Row>
      </Fragment>
    );
  }
}

export default TableWrapper;
