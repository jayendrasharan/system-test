import React from "react";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src="" alt="" className="logo__image" />
      <p className={classes.LogoText}>Sureify Todo App</p>
    </div>
  );
};

export default Logo;
