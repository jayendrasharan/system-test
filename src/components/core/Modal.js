import React, { useState, useEffect, useCallback, Fragment } from 'react';

const Modal = ({ onSave, onCancel, children, close, title, hideFooter=false }) => {
    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            close();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);
    return (<Fragment>
        <div onClick={close} className="modal fade show" tabindex="-1" role="dialog" style={{ display: 'block', paddingRight: '17px' }}>
            <div className="modal modal-form modal-dialog-centered db" tabindex="-1" role="dialog">
                <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> { title }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        { !hideFooter && <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel} data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={onSave}>Save </button>
                        </div> }
                    </div>
                </div>
            </div></div></Fragment>)
}

export default Modal;