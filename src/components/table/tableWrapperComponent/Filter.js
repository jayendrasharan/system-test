import React, { Component } from 'react';
import ButtonGroup from 'antd/lib/button/button-group';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'antd';

class Filter extends Component {
  render() {
    return (
      !isEmpty(this.props.data) && (
        <ButtonGroup>
          <Button
            type={this.props.selectedFilter === 'All' ? 'primary' : ''}
            onClick={() => this.props.filterMethod(this.props.data.filterKey, this.props.data.filterDefaultValue)}
          >
            {this.props.data.filterDefaultTitle}
          </Button>
          <Button
            type={this.props.selectedFilter === 'Active' ? 'primary' : ''}
            onClick={() => this.props.filterMethod(this.props.data.filterKey, this.props.data.filterPrimaryValue)}
          >
            {this.props.data.filterPrimaryTitle}
          </Button>
          <Button
            type={this.props.selectedFilter === 'Inactive' ? 'primary' : ''}
            onClick={() => this.props.filterMethod(this.props.data.filterKey, this.props.data.filterSecondaryValue)}
          >
            {this.props.data.filterSecondaryTitle}
          </Button>
        </ButtonGroup>
      )
    );
  }
}
export default Filter;
