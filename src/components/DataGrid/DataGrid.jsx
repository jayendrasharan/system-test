import React from 'react';
import { connect } from 'react-redux';

import DataTable from "react-data-table-component";

import { deleteTodo, updateTodo } from './../../store/actions/actions'
import CustomModal from './../CustomModal/CustomModal';

import { 
  PriorityFormatter,
  CreatedOnFormatter,
  DuedateFormatter
} from './ColumnFormatters';

import './DataGrid.css';

const DataGrid = props =>{
  const { todoList, removeRow, updateRow } = props;

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
      cell: row => <CreatedOnFormatter row={row}/>
    },
    {
      name: "Due Date",
      selector: "dueDate",
      sortable: true,
      cell: row => <DuedateFormatter row={row}/>
    },
    {
      name: "Actions",
      selector: "",
      cell : row => {
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
              onClick={() => updateRow({...row, currentState: !currentState})}
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
  removeRow: row => dispatch(deleteTodo(row)),
  updateRow : row => dispatch(updateTodo(row))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);