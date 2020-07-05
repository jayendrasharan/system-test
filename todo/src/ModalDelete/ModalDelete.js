import React from 'react';
import './ModalDelete.css'

class ModalDelete extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    deleteTheTask = () => {
        console.log("we are here");
        this.props.onEvent('modalDelete', this.props.task);
    }

    render() {
        console.log('modal delete');
        return (
            <div id="openModal" class="modalDialog1">
                   <h3>Are you sure you want to delete?</h3>
                   <button onClick={this.deleteTheTask}>Yes</button>
                   <button onClick={(e, value) => this.props.onEvent('exitModal', '')}>No</button>
            </div>
        )
    }
}

export default ModalDelete

