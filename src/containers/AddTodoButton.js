import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddTodo from './AddTodo'

const styles = {
  fontFamily: "sans-serif",
  textAlign: "right",
  color: 'blue',
};


const modalStyle = {
  modal: {
    paddingTop: '30px',
    borderRadius: '10px'
  }
}

class AddTodoButton extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <button className="btn btn-outline-success" onClick={this.onOpenModal}><span className="glyphicon glyphicon-plus"></span>  Add a Task</button>
        <Modal open={open} onClose={this.onCloseModal} center styles={modalStyle} >
          <AddTodo  close={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

export default AddTodoButton;
