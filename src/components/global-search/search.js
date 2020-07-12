import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchByTodo } from "../../redux/actions";

//To create global Searchbar
function GlobalSearch() {
    let dispatch = useDispatch();
    const textInput = useRef(null);

    document.addEventListener('keydown', (event) => {
        event.stopPropagation();
        if (event.ctrlKey && event.shiftKey && event.key === "F") {
            textInput.current.focus();
        }
    });

    return (
        <div className="col-lg-2 search-input">
            <input
                ref={textInput}
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => dispatch(searchByTodo(e.target.value))}
            />
            <i className="material-icons search-icon">search</i>
        </div>
    );
}


export default GlobalSearch;