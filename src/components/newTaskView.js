import React from "react";
import Popup from "reactjs-popup";
import AddtaskModal from "./AddtaskModal";
const NewTaskView = props => (
  <div>
    <Popup modal trigger={<button className="myStyle" />}>
      {close => (
        <AddtaskModal close={close} totalTasksAdded={props.totalTasksAdded} />
      )}
    </Popup>
  </div>
);

export default NewTaskView;
