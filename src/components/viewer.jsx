import React from "react";
import CustModal from "./modal";
import Row from "./rows";
/* eslint-disable */

const Viewer = props => {
  const [currentTab, setTab] = React.useState("All Tasks");
  const [mode, setMode] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [currentRow, setcurrentRow] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sortElement, setSortElement] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [group, setGroup] = React.useState("none");

  const sorting = () => {
    props.data.sort(function(a, b) {
      var keyA = a[sortElement],
        keyB = b[sortElement];
      if (keyA < keyB)
        if (sortOrder === "asc") return -1;
        else return 1;
      if (keyA > keyB)
        if (sortOrder === "asc") return 1;
        else return -1;
      return 0;
    });
  };

  /*const groupBy = () => {
    let result;
    if (group !== "none") {
      result = props.data.reduce(function(r, a) {
        if (
          currentTab === "All Tasks" ||
          (currentTab === "Completed" && a["currentState"] === "close") ||
          (currentTab === "Pending" && a["currentState"] === "open")
        ) {
          r[a[group]] = r[a[group]] || [];
          r[a[group]].push(a);
        }
        return r;
      }, Object.create(null));
    }
    return result;
  };

  const getGroupByRows = () => {
    let data = groupBy();
    let res = Object.keys(data).map(key =>
      (<tr>key</tr>)(
        data[key].map(row => (
          <Row
            setMode={setMode}
            setRow={setcurrentRow}
            handleShow={handleShow}
            row={row}
            key={row.id}
            onChangeStatus={props.onChangeStatus}
            search={props.search}
          />
        ))
      )
    );
    console.log(res);
  };
*/
  return (
    <div className="viewer">
      <ul className="nav nav-tabs" style={{ cursor: "pointer" }}>
        <li className="nav-item">
          <a
            className={
              currentTab === "All Tasks" ? "nav-link active" : "nav-link"
            }
            onClick={() => setTab("All Tasks")}
          >
            All Tasks
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              currentTab === "Completed" ? "nav-link active" : "nav-link"
            }
            onClick={() => setTab("Completed")}
          >
            Completed
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              currentTab === "Pending" ? "nav-link active" : "nav-link"
            }
            onClick={() => setTab("Pending")}
          >
            Pending
          </a>
        </li>
      </ul>
      <table className="table">
        <thead>
          <tr style={{ cursor: "pointer" }}>
            <th
              scope="col"
              onClick={() => {
                setSortElement("title");
                sorting();
                sortOrder === "asc" ? setSortOrder("dsc") : setSortOrder("asc");
              }}
            >
              Summary
            </th>
            <th
              scope="col"
              onClick={() => {
                setSortElement("priority");
                sorting();
                sortOrder === "asc" ? setSortOrder("dsc") : setSortOrder("asc");
              }}
            >
              Priority
            </th>
            <th
              scope="col"
              onClick={() => {
                setSortElement("createdAt");
                sorting();
                sortOrder === "asc" ? setSortOrder("dsc") : setSortOrder("asc");
              }}
            >
              Created On
            </th>
            <th
              scope="col"
              onClick={() => {
                setSortElement("dueDate");
                sorting();
                sortOrder === "asc" ? setSortOrder("dsc") : setSortOrder("asc");
              }}
            >
              Due Date
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTab === "All Tasks"
            ? props.data.map(row => (
                <Row
                  setMode={setMode}
                  setRow={setcurrentRow}
                  handleShow={handleShow}
                  row={row}
                  key={row.id}
                  onChangeStatus={props.onChangeStatus}
                  search={props.search}
                />
              ))
            : currentTab === "Completed"
            ? props.data.map(row =>
                row.currentState === "close" ? (
                  <Row
                    setMode={setMode}
                    setRow={setcurrentRow}
                    handleShow={handleShow}
                    row={row}
                    key={row.id}
                    onChangeStatus={props.onChangeStatus}
                    search={props.search}
                  />
                ) : (
                  ""
                )
              )
            : props.data.map(row =>
                row.currentState === "open" ? (
                  <Row
                    setMode={setMode}
                    setRow={setcurrentRow}
                    handleShow={handleShow}
                    row={row}
                    key={row.id}
                    onChangeStatus={props.onChangeStatus}
                    search={props.search}
                  />
                ) : (
                  ""
                )
              )}
        </tbody>
      </table>
      {show === true ? (
        <CustModal
          type={mode}
          data={currentRow}
          show={show}
          onHide={handleClose}
          onUpdateTodo={props.onUpdateTodo}
          onDeleteTodo={props.onDeleteTodo}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Viewer;
