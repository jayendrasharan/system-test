import React from "react";
import Sort from "../../assets/sort.svg";

const TaskListHeader = ({ fieldSet, onSortColumnClick, handleGroupBy, groupByValue }) => {
  return (
    <div className="task-list-header">
      {fieldSet.map((item) => {
        return (
          <div
            key={item.name}
            className="task-list-header-column"
            onClick={() => item.allowSort && onSortColumnClick(item.name)}
          >
            <span>{item.label}</span>
            {item.allowSort && (
              <span>
                <img alt="icon" className="tab-icon" src={Sort} />
              </span>
            )}
          </div>
        );
      })}
      <select
        value={groupByValue || ""}
        className="select-group-by"
        onChange={(e) => handleGroupBy(e.target.value)}
      >
        <option value="null">Group By:</option>
        {fieldSet
          .filter((item) => item.groupBy)
          .map((item) => {
            return (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default TaskListHeader;
