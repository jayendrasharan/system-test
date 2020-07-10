import React from "react";
import classes from "./Header.module.css";
import Logo from "./Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <SearchBar
        searchText={props.searchText}
        onSearchTextChange={props.onSearchTextChange}
      />
      <Logo />
    </header>
  );
};

export default Header;
