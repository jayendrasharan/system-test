import React from "react";
import DelIcon from "../../assets/delete.svg";
import EditIcon from "../../assets/edit.svg";

const TaskListRow = ({
  fieldSet,
  rowData,
  onEditClick,
  onDeleteClick,
  onCloseClick,
  searchResult,
}) => {
  return (
    <div className="task-list-item">
      {fieldSet.map(
        (item) =>
          !item.isAction && (
            <div
              key={rowData[item.name]}
              className={`task-list-column ${
                searchResult.hasOwnProperty(rowData._id) && searchResult[rowData._id] === true
                  ? " task-list-hightlight"
                  : ""
              }`}
            >
              {rowData[item.name]}
            </div>
          )
      )}
      {
        <div className="task-list-column">
          <div className="task-list-action-set">
            <button
              type="button"
              onClick={() => onEditClick(rowData._id)}
              className="btn task-list-action"
            >
              <img alt="icon" src={EditIcon} />
            </button>
            <button
              type="button"
              onClick={() => onDeleteClick(rowData._id)}
              className="btn task-list-action"
            >
              <img alt="icon" src={DelIcon} />
            </button>
            <button
              type="button"
              onClick={() => onCloseClick(rowData._id)}
              className="btn task-list-action"
            >
              c
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default TaskListRow;
