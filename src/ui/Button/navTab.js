import React from 'react';

import './Button.css';

const navTab = (props) => (
    <span
        className={['navTab', [props.active ? 'active' : '']].join(' ')}
        onClick={props.clicked}>{props.children}</span>
);

export default navTab;