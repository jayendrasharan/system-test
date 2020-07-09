import React from "react";
import classes from "./Header.module.css";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className={classes.Header}>
      <Logo />
    </header>
  );
};

export default Header;
