import React, { useContext } from "react";
import { AppContext } from "./App";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function Pending() {
  var sample = {
    Summary: "ABC",
    Priority: "High",
    CreatedOn: "12PM",
    DueDate: "tomorrow",
    Actions: "Important",
  };
  var list = [sample, sample, sample, sample, sample];

  function click() {}

  var items = list.map((m) => {
    return (
      <TableRow>
        <TableCell>
          <input type="checkbox" name="name1" />
        </TableCell>

        <TableCell>{m.Summary}</TableCell>
        <TableCell>{m.Priority}</TableCell>
        <TableCell>{m.CreatedOn}</TableCell>
        <TableCell>{m.DueDate}</TableCell>
        <TableCell>{m.Actions}</TableCell>
      </TableRow>
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
export default Pending;
