import React from "react";
import { connect } from "react-redux";

import {
  sortBySummary,
  sortByPriority,
  sortByCreatedOn,
  sortByDueDate,
  sortByActions
} from "../store/sort";

const TableHeader = ({
  sortBySummary,
  sortByPriority,
  sortByCreatedOn,
  sortByDueDate,
  sortByActions
}) => {
  return (
    <thead>
      <tr>
        <th onClick={sortBySummary}>Summary</th>
        <th onClick={sortByPriority}>Priority</th>
        <th onClick={sortByCreatedOn}>Created On</th>
        <th onClick={sortByDueDate}>Due Date</th>
        <th onClick={sortByActions}>Actions</th>
      </tr>
    </thead>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    sortBySummary: () => dispatch(sortBySummary()),
    sortByPriority: () => dispatch(sortByPriority()),
    sortByCreatedOn: () => dispatch(sortByCreatedOn()),
    sortByDueDate: () => dispatch(sortByDueDate()),
    sortByActions: () => dispatch(sortByActions())
  };
};

export default connect(null, mapDispatchToProps)(TableHeader);
