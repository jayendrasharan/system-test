import React from "react";

import TableHeader from "./TableHeader";
import TableList from "./TableList";

const Table = () => {
  return (
    <div>
      <table>
        <TableHeader />
        <TableList />
      </table>
    </div>
  );
};

export default Table;
