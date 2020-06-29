import React from 'react';
import './styles.css'

const Select = (props) =>  {
    let classNames = 'select-input'
    if(props.size){
        classNames+=` select-input-${props.size}`
    }
    if(props.size && props.size === 'full'){
        classNames+=' select-input-full'
    }
    if(props.light){
        classNames+=' select-input-light'
    }

    return (
        <select {...props} className={classNames}>
            {props.children}
        </select>
    )
}

export default Select;