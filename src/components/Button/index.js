import React from 'react';
import './styles.css'

const Button = (props) => <button className={`btn ${props.primary ? 'primary' : 'default'}`} {...props}>{props.children}</button>
export default Button;