import React from 'react';

const tab = (props) => (
       <button className={props.selected ?"tablinks active":"tablinks" } onClick={props.openTab}>{props.tabName}</button>
     )

export default tab;