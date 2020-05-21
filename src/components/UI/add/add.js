import React from 'react';
import classes from './add.module.scss'
const Add = (props) => {
    return (
        <div onClick={props.show} className={classes.main_div}>
            +
        </div>
    )
}

export default Add

