import React from "react";
import { Button } from "react-bootstrap";
//import { Highlight } from "react-highlighter";

const Row = props => {
  const row = props.row;
  const handleRow = mode => {
    props.setMode(mode);
    props.setRow(row);
    props.handleShow();
  };
  return (
    <tr
      style={{ cursor: "pointer" }}
      bgcolor={row.currentState === "close" ? "springgreen" : "white"}
    >
      <td onClick={() => handleRow("view")}>{row.title}</td>
      <td onClick={() => handleRow("view")}>{row.priority}</td>
      <td onClick={() => handleRow("view")}>{row.createdAt}</td>
      <td onClick={() => handleRow("view")}>{row.dueDate}</td>
      <td>
        <Button variant="light" onClick={() => handleRow("update")}>
          <img src={require("../static/edit.png")} alt="edit" />
        </Button>
        <Button variant="light" onClick={() => handleRow("delete")}>
          <img src={require("../static/trash.png")} alt="delete" />
        </Button>
        <Button variant="light" onClick={() => props.onChangeStatus(row.id)}>
          <img
            src={
              row.currentState === "close"
                ? require("../static/re-open.png")
                : require("../static/done.png")
            }
            alt={row.currentState === "close" ? "re-open" : "Done"}
          />
        </Button>
      </td>
    </tr>
  );
};

export default Row;
