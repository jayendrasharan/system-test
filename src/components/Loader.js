import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 999999,
    color: "#fff"
  }
}));

const Loader = ({ isLoading }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { todoReducer } = state;
  return {
    isLoading: todoReducer?.apiInProgress
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
