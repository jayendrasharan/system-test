import React from 'react';
import { connect } from 'react-redux';

import DataTable from "react-data-table-component";

import { deleteRow } from './../../store/actions/actions'
import DataRow from './DataRow'
import CustomModal from './../CustomModal/CustomModal';

import { 
  PriorityFormatter
} from './ColumnFormatters';

import './DataGrid.css';

const DataGrid = props =>{
  const { todoList, removeRow } = props;

  const columns = [
    {
      name: "Summary",
      selector: "summary",
      sortable: true,
    },
    {
      name: "Priority",
      selector: "priority",
      sortable: true,
      cell : row => <PriorityFormatter row={row} />
    },
    {
      name: "Created On",
      selector: "createdAt",
      sortable: true,
    },
    {
      name: "Due Date",
      selector: "dueDate",
      sortable: true,
    },
    {
      name: "Actions",
      selector: "",
      cell : row => {
        console.log(row);
        const { currentState } = row;
        return (
          <>
            <CustomModal type="edit" title="Edit Todo" row={row} />
            <CustomModal type="view" title="View Todo" row={row} />
            <i
              className="fa mx-2 fa-trash"
              aria-hidden="true"
              onClick={() => removeRow(row)}
            ></i>
            <input
              type="button"
              className="btn btn-sm btn-link"
              value={currentState ? 'Done' : 'Re-Open'}
            />
          </>
        );
      }
    }
  ]

  const conditionalRowStyles = [
    {
      when: row => !row.currentState,
      style: {
        backgroundColor: '#defade',
      },
    }
  ]
  return (
    <DataTable
      title="TODo List"
      columns={columns}
      data={todoList}
      fixedHeader
      dense
      fixedHeaderScrollHeight="350px"
      highlightOnHover
      className='todolist-component'
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

const mapStateToProps = state =>({
  todoList: state.combReducer.todos
})

const mapDispatchToProps = dispatch =>({
  removeRow: row => dispatch(deleteRow(row))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);