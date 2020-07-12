import React, {Component} from 'react';
import '../styles/styles.scss'
import '../../todo/components/TodoForm/TodoForm.scss';

class Modal extends React.Component{
    render(){
        if (!this.props.modalStore.show) {
            return null;
        }
        const title = this.props.modalStore.modalData.title || "";
        const content = this.props.modalStore.children ? React.createElement(this.props.modalStore.children, this.props.modalStore.modalData) : 'No Content';
        const clickOnDiloagWrapper = (evt)=>{
            evt.stopPropagation();
            this.props.closeModal();
        }
        const wrapperClass = this.props.modalStore.modalData.wrapperClass;
        return (
        <div className={`app-modal-wrapper ${wrapperClass}`} onClick={clickOnDiloagWrapper}>
            <div className="app-modal" onClick={(evt)=>{evt.stopPropagation()}}>
                <div className="modal-header">
                    <div className="modal-title">
                        {title}
                    </div>
                    <div className="app-button raised modal-close-button"  onClick={this.props.closeModal}>
                        <div className="close">X</div>
                    </div>
                </div>
                <div className="modal-content">
                    {content}
                </div>
            </div>
        </div>
        )
    }
};

export default Modal;