import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustModal from "./modal";

function Compose({ onAddTodo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="secondary" onClick={handleShow} id="sticky">
        <img src={require("../static/plus.png")} alt="plus" /> Compose
      </Button>
      <CustModal
        type="create"
        show={show}
        onHide={handleClose}
        submit={onAddTodo}
      />
    </div>
  );
}

export default Compose;
