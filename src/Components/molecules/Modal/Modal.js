import React from 'react';

import './Modal.scss';
import Backdrop from '../../atoms/Backdrop';

const Modal = ({ children, show, modalClosed }) => {
  let modalContent = null;
  if(show) {
    modalContent = (
      <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className="modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </React.Fragment>
    )
  }
  return modalContent;
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children,
);
