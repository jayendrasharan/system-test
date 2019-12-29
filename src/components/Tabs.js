import React from "react";
import { connect } from "react-redux";

import Button from "./Button";
import { showAll, showPending, showCompleted } from "../store/filter";

const Tabs = ({ showAll, showPending, showCompleted, filter }) => {
  return (
    <div className="tab-section">
      <ul>
        <li onClick={showAll}>
          <Button
            class_={"tab-button " + (filter.showAll ? "active" : null)}
            name="SHOW ALL"
          />
        </li>
        <li onClick={showPending}>
          <Button
            class_={"tab-button " + (filter.showPending ? "active" : null)}
            name="PENDING"
          />
        </li>
        <li onClick={showCompleted}>
          <Button
            class_={"tab-button " + (filter.showCompleted ? "active" : null)}
            name="COMPLETED"
          />
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAll: () => dispatch(showAll()),
    showPending: () => dispatch(showPending()),
    showCompleted: () => dispatch(showCompleted())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
