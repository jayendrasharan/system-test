import React from 'react';
import '../styles/modal.css';

const Modal = ({ children, show, hideModal }) => {
  return (
    <>
      {show && (
        <>
          <div className="overflow">
            <div className="form-modal">{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
