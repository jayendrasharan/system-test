import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import View from "./View";

function AllTask(props) {
  //const [val, setVal] = useState(props.list);
  const [value, setValue] = useState({ isActive: false });
  var temp = {};
  function click(pos) {
    // console.log(props.list[pos].title);
    temp = props.list[pos];
    setValue({ isActive: true });
    console.log(temp);
  }

  function onCancelFun() {
    setValue({ isActive: false });
  }
  var items = props.list.map((m, i) => {
    return (
      <>
        {value.isActive ? <View cancel={onCancelFun} send={m} /> : null}
        <TableRow>
          <TableCell>
            <input type="checkbox" name="name1" />
          </TableCell>

          <TableCell
            onClick={() => {
              click(i);
            }}
          >
            {m.title}
          </TableCell>
          <TableCell
            onClick={() => {
              click(i);
            }}
          >
            {m.priority}
          </TableCell>
          <TableCell
            onClick={() => {
              click(i);
            }}
          >
            {m.createdOn}
          </TableCell>
          <TableCell
            onClick={() => {
              click(i);
            }}
          >
            {m.date}
          </TableCell>
          <TableCell
            onClick={() => {
              click(i);
            }}
          >
            {m.action}
          </TableCell>
        </TableRow>
      </>
    );
  });
  return (
    <>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#fef" }}>
            <TableCell> </TableCell>
            <TableCell>
              <a>Summary</a>
            </TableCell>
            <TableCell>
              <a>Priority</a>
            </TableCell>
            <TableCell>
              <a>Created On</a>
            </TableCell>
            <TableCell>
              <a>Due Date</a>
            </TableCell>
            <TableCell>
              <a>Actions</a>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{/**Other Rowss */ items}</TableBody>
      </Table>
    </>
  );
}
export default AllTask;
