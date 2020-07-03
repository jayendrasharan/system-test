import React from 'react'
import './Button.css'
export default function Button({onClick}) {
    return (
        <button onClick={onClick} type="button" className="btn btn-primary rounded-circle floating-button">+</button>
    )
}
