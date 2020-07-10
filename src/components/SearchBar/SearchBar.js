import React, { useEffect, useRef } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchRef = useRef();
  const onKeyPress = (event) => {
    if (event.ctrlKey && event.shiftKey && event.keyCode == 70) {
      searchRef.current.focus();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, []);
  return (
    <div class={classes.Search}>
      <input
        type="text"
        class={classes.SearchInput}
        placeholder="Search..."
        value={props.searchText}
        onChange={props.onSearchTextChange}
        ref={searchRef}
      />
      <i class={"fas fa-search " + classes.SearchIcon} />
    </div>
  );
};

export default SearchBar;
