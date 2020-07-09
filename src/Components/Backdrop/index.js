import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBackdrop } from '../../store/actionCreators/todoActions';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CustomBackdrop = props => {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const { isBackdropOpen } = useSelector(state => state.ui);
    return (
        <Backdrop className={classes.backdrop} open={isBackdropOpen} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default CustomBackdrop;