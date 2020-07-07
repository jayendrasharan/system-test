import React from 'react'
import '../css/AddButton.css'
export default function CustomButton({onClick}) {
    return (
        <a className="addbtn" onClick={onClick} title="Add a task"><div className="text">+</div></a>
    )
}
