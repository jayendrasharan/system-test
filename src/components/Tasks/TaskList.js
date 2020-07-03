import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleTaskStatus } from "../../redux/actions/tasksAction";
import SortableCell from "../SortableCell";
import "./TaskList.css";
import DeleteModal from "../Modal/DeleteModal";
import TodoModal from "../Modal/TodoModal";
import { MODAL_TYPES } from "../../models/modalType";

import { TaskModel } from "../../models/task";
import RichText from "../RichText";

const modalType = [];

const TaskList = ({
  tasks,
  sortKey,
  sortOrder,
  groupByKey,
  handleSetSort,
  searchText,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleClose = () => {
    setShowModal(null);
  };

  console.log(showModal);

  const getTaskRows = () => {
    let groupedTasks = tasks.reduce((result, item) => {
      (result[item[groupByKey]] = result[item[groupByKey]] || []).push(item);
      return result;
    }, {});
    let taskRow = [];
    Object.keys(groupedTasks).forEach((group, index) => {
      if (groupByKey) {
        taskRow.push(
          <tr key={"group-" + index}>
            <td className="priority-row" colSpan={6}>
              {group}
            </td>
          </tr>
        );
      }

      groupedTasks[group].forEach((taskItem) => {
        const { completed, id, title, priority, createdOn, dueDate } = taskItem;
        let item = (
          <tr
            onClick={() => {
              setShowModal(MODAL_TYPES.VIEW_TASK_MODAL);
              setSelectedTodo(taskItem);
            }}
            key={id}
          >
            <td className={`cell ${!completed ? "pending" : ""}`}>
              <RichText
                value={title}
                searchText={searchText}
                isSearchable={TaskModel.title.allowSearch}
              />
            </td>
            <td className={`cell ${!completed ? "pending" : ""}`}>
              <RichText
                value={priority}
                searchText={searchText}
                isSearchable={TaskModel.priority.allowSearch}
              />
            </td>
            <td className={`cell ${!completed ? "pending" : ""}`}>
              <RichText
                value={createdOn}
                searchText={searchText}
                isSearchable={TaskModel.createdOn.allowSearch}
              />
            </td>
            <td className={`cell ${!completed ? "pending" : ""}`}>
              <RichText
                value={dueDate}
                searchText={searchText}
                isSearchable={TaskModel.dueDate.allowSearch}
              />
            </td>
            <td
              className="cell"
              style={{ display: "flex", flexDirection: "row", alignItems:'center' }}
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(MODAL_TYPES.EDIT_TASK_MODAL);
                  setSelectedTodo(taskItem);
                }}
                title={"Edit Task"}
                style={{ marginRight: 6, marginLeft: 6 }}
              >
                <FiEdit />
              </Button>
              <Button
                title={`Mark as ${completed ? "Completed" : "Pending"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTaskStatus([id]));
                }}
                
                style={{ marginRight: 3, marginLeft: 3, textDecorationLine:'none' }}
                variant={completed ? "success" : "info"}
              ><div className='done-button'>{completed ? "Done" : "Re-Open"}</div>
                
              </Button>
              <Button
                title={"Delete Task"}
                style={{ marginLeft: 6 }}
                variant={"danger"}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(MODAL_TYPES.DELETE_TASK_MODAL);
                  setSelectedTodo(taskItem);
                }}
              >
                <FiTrash />
              </Button>
            </td>
          </tr>
        );
        taskRow.push(item);
      });
    });
    return taskRow;
  };

  return (
    <>
      {tasks.length === 0 && (
        <div style={{ margin: "auto", padding: 32 }}>
          <h5>No Tasks here</h5>
        </div>
      )}
      {tasks.length > 0 && (
        <Table responsive size="sm" bordered style={{ marginTop: 12 }}>
          <thead>
            <tr className="table-header">
              {Object.keys(TaskModel).map((taskDataKey, index) => {
                if (TaskModel[taskDataKey].hidden) {
                  return null;
                }
                let currentItem = TaskModel[taskDataKey];
                return (
                  <SortableCell
                    handleSetSort={handleSetSort}
                    key={"header-" + index}
                    sortable={currentItem.allowSort}
                    dataKey={taskDataKey}
                    sortOrder={sortOrder}
                    sortKey={sortKey}
                  >
                    {currentItem.label}
                  </SortableCell>
                );
              })}
              <td className="cell">
                Actions
              </td>
            </tr>
          </thead>
          <tbody>{getTaskRows()}</tbody>
        </Table>
      )}
      {showModal === MODAL_TYPES.DELETE_TASK_MODAL && (
        <DeleteModal
          showDialog={showModal === MODAL_TYPES.DELETE_TASK_MODAL}
          modalType={modalType}
          handleClose={handleClose}
          selectedTask={selectedTodo}
        />
      )}

      {showModal && showModal !== MODAL_TYPES.DELETE_TASK_MODAL && (
        <TodoModal
          showDialog={showModal && showModal !== MODAL_TYPES.DELETE_TASK_MODAL}
          modalType={showModal}
          handleClose={handleClose}
          selectedTask={selectedTodo}
        />
      )}
    </>
  );
};

export default TaskList;
