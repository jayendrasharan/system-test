import React, {Component} from 'react';
import './AddToDoCss.css';
import ModalComponent from '../ModalComponent/ModalComponent';
class AddToDo extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.addTask = this.addTask.bind(this);
    }

    addTask = (...val) => {
        this.props.addTask(val);
        this.props.toggleModal();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyBoardEvent, true);
    }

    handleKeyBoardEvent = (event) => {
        if(event.keyCode === 27) {
            if (this.props.showModal) {
                this.props.toggleModal();
            }
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.showModal ?
                        <button
                            type="button"
                            className="btn btn-primary addButton"
                            onClick={this.props.toggleModal}
                        >
                            +
                        </button> :
                        <ModalComponent
                            buttonClicked='add'
                            showModal={this.props.showModal}
                            toggleModal={this.props.toggleModal}
                            addTask={this.addTask}
                        />
                }
            </div>
        );
    }
}
export default AddToDo;