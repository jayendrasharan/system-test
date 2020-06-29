import React, { Fragment, useState } from "react";
import TaskListHeader from "./TaskListHeader";
import TaskListRow from "./TaskListRow";
import { useDispatch } from "react-redux";
import { deleteTaskAction, closeTaskAction, updateTabState, toggleEditAction } from "../actions";
import "./styles.css";
import { fieldSet } from "../../config";
import useFilter from "./useFilter";
import Dialog from "../../components/Dialog";

const TaskList = ({ type }) => {
  const dispatch = useDispatch();
  const [list, searchResult, groupByList, groupByValue] = useFilter(type);

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (_id) => {
    setDeleteId(_id);
  };

  const handleClose = (_id) => dispatch(closeTaskAction(_id));
  const handleEdit = (_id) => dispatch(toggleEditAction(_id));

  const toggleSortedState = (key) => {
    dispatch(updateTabState({ type, sortBy: key }));
  };

  const handleGroupBy = (value) => {
    value = value === "null" ? null : value;
    dispatch(updateTabState({ type, groupBy: value }));
  };

  console.log(searchResult);

  const renderTaskList = () => {
    if (groupByList === null) {
      return list.map((item) => (
        <TaskListRow
          searchResult={searchResult}
          onEditClick={handleEdit}
          onCloseClick={handleClose}
          onDeleteClick={handleDelete}
          key={item._id}
          fieldSet={fieldSet}
          rowData={item}
        />
      ));
    } else {
      return Object.keys(groupByList).map((groupKey) => {
        return (
          <div key={groupKey} className="tab-list-group-item">
            <div className="tab-list-group-item-title">{groupKey}</div>
            {groupByList[groupKey].map((item) => (
              <TaskListRow
                searchResult={searchResult}
                onEditClick={handleEdit}
                onCloseClick={handleClose}
                onDeleteClick={handleDelete}
                key={item._id}
                fieldSet={fieldSet}
                rowData={item}
              />
            ))}
          </div>
        );
      });
    }
  };

  return (
    <Fragment>
      <div className="task-list">
        <TaskListHeader
          fieldSet={fieldSet}
          onSortColumnClick={toggleSortedState}
          groupByValue={groupByValue}
          handleGroupBy={handleGroupBy}
        />
        {renderTaskList()}
      </div>
      <Dialog
        message="Are you sure you want to delete the Task?"
        onProceed={() => {
          dispatch(deleteTaskAction(deleteId));
          setDeleteId(null);
        }}
        isVisible={deleteId !== null}
        onCancel={() => setDeleteId(null)}
      />
    </Fragment>
  );
};

export default TaskList;
