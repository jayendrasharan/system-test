import React from 'react';
import '../styles/modal.css';

const Modal = ({children, show}) => {
  return (
    <>
      {show &&
        <>
          <div className="overflow">
          <div className="form-modal">{children}</div>
          </div>
        </>}
    </>
  );
};

export default Modal;
