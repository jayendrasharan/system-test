import React from 'react';
import { connect } from 'react-redux';

import DataRow from './DataRow'

import './DataGrid.css';

const DataGrid = props =>{
  const { todoList } = props;
  return (
    <table className='table table-stripped table-hover table-sm table-bordered'>
      <thead>
        <tr>
          <th>Summary <i className="fa fa-arrow-down" aria-hidden="true"></i></th>
          <th>Priority</th>
          <th>Created On</th>
          <th>Due date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map(row=>{
          return <DataRow key={row.id} row={row}/>
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = state =>({
  todoList: state.combReducer.todos
})

export default connect(mapStateToProps, null)(DataGrid);