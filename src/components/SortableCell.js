import React from "react";
import { Button } from "react-bootstrap";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import "./SortableCell.css";

const getSortIcon = (sortOrder, sortKey, dataKey) => {
  if (dataKey === sortKey) {
    switch (sortOrder) {
      case -1:
        return <FaSortDown />;
      case 1:
        return <FaSortUp />;
      default:
        return <FaSort />;
    }
  } else {
    return <FaSort />;
  }
};

const SortableCell = ({
  children,
  sortable,
  sortOrder = 0,
  dataKey,
  sortKey,
  handleSetSort,
}) => {
  return (
    <td>
      <div className="sortable-cell">
        {children}
        {sortable && (
          <Button
            size={"sm"}
            onClick={() => {
              handleSetSort({
                sortOrder: sortKey === dataKey ? ((sortOrder + 2) % 3) - 1 : -1,
                sortKey: dataKey,
              });
            }}
          >
            {getSortIcon(sortOrder, sortKey, dataKey)}
          </Button>
        )}
      </div>
    </td>
  );
};

export default SortableCell;
