import React, { Component } from 'react';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }
    componentDidMount () {
        this.setState({isVisible:this.props.visible}, ()=>{
            if (this.state.isVisible) {
                this.show();
            }
        })
    }
    show () {
        this.setState({isVisible : true})
        this.dialog.showModal();
    }
    hide () {
        this.setState({isVisible : false})
        this.dialog.close();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.visible !== this.state.isVisible) {
            this.setState({isVisible:nextProps.visible}, ()=>{
                if (this.state.isVisible) {
                    this.show();
                } else {
                    this.hide();
                }
            })            
        }
    }
    handleKeyDown = (e)=>{
        if(e.keyCode==27){
            this.props.onClose()
        }
    }
    
   render () {
        
        return (
            <dialog ref={(ref) => this.dialog = ref} onKeyDown={this.handleKeyDown}>
                {this.props.children}
            </dialog>
        );
    }
};

export default Modal ;