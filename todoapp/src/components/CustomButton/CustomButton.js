import React from 'react'
import './CustomButton.css'
export default function CustomButton({onClick}) {
    return (
        <>
        {/* <button onClick={onClick} type="button" className="btn btn-primary rounded-circle floating-button">+</button> */}
        <a className="plusbtn" onClick={onClick} title="Add a task"><div className="text">+</div></a>
        </>
    )
}
