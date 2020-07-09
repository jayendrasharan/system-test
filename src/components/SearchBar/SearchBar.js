import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div class={classes.Search}>
      <input
        type="text"
        class={classes.SearchInput}
        placeholder="Search for transactions..."
        value={props.searchText}
        onChange={props.onSearchTextChange}
      />
      <i class={"fas fa-search " + classes.SearchIcon} />
    </div>
  );
};

export default SearchBar;
