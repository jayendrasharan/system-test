import React from 'react';
import { connect } from 'react-redux';

import CustomModal from './../CustomModal/CustomModal';
import { deleteRow } from './../../store/actions/actions'

const DataRow = props =>{
  const { row, removeRow } = props;
  const { currentState, summary, priority, createdAt, dueDate} = row;

  return (
    <tr className={currentState ? "" : "completed"}>
      <td>{summary}</td>
      <td className="priority">{priority}</td>
      <td>{createdAt}</td>
      <td>{dueDate}</td>
      <td>
        <CustomModal type="edit" title="Edit Todo" row={row} />
        <CustomModal type="view" title="View Todo" row={row} />
        {/* <i className="fa mx-2 fa-pencil-square-o" aria-hidden="true"></i> */}
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
      </td>
    </tr>
  );
}

const mapDispatchToProps = dispatch => ({
  removeRow: row => dispatch(deleteRow(row))
})

export default connect(null, mapDispatchToProps)(DataRow);