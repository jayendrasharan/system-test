import React, { useEffect } from "react"
import "./modal.scss"

function Modal(props) {
  const { modalState, setModalState } = props

  return (
    <div id="myModal" className={`modal ${modalState}`}>
      <div className="modal-content">
        <button className="close" onClick={() => setModalState("modal-close")}>
          &times;
        </button>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
