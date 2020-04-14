import React from "react";

import { ToDoConsumer } from "../context";

export default function GlobalSearch() {
  const inputEl = React.useRef(null);
  React.useEffect(() => {
    document.onkeyup = function (e) {
      if (e.ctrlKey && e.shiftKey && e.which === 70) {
        inputEl.current.focus();
      }
    };
  }, []);
  return (
    <ToDoConsumer>
      {({ searchStr, handleStrChange }) => (
        <div className="input-group border rounded-pill">
          <input
            type="search"
            ref={inputEl}
            placeholder="Search with 'ctli+shift+f'"
            aria-describedby="button-addon3"
            className="form-control bg-none border-0"
            id="search"
            value={searchStr}
            onChange={(e) => {
              handleStrChange(e);
            }}
          />
          <div className="input-group-append border-0">
            <button
              id="button-addon3"
              type="button"
              className="btn btn-link text-success"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      )}
    </ToDoConsumer>
  );
}
