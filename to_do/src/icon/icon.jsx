import React from 'react';

function Icon(props) {

    const { className,
        fontSize } = props;

    return (
        <i className={className} style={{ fontSize: fontSize }}></i>
    );
}

export default Icon;
