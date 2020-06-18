import React, {useEffect} from "react";
import {createPortal} from "react-dom"

import "./styles.css";

const modalRoot = document.getElementById("modal");

const Modal = ({ isOpen, children }) => {
    
  const el = document.createElement("div");
    
    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    }, [el]);

    if(!isOpen) return null;

    return createPortal( <div className="modal"><div className="modal-view">{children}</div></div>,el);
}

export default Modal;