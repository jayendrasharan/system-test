import React, { useEffect } from "react"
import "./modal.scss"

function Modal(props) {
  const { modalState, setModalState } = props

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      setModalState("modal-close")
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [modalState]);

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
