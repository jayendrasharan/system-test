import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { addTask, errorSum, errorDes } from '../actions/todoActions'

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isCompleted: false,
            summary: '',
            description: '',
            priority: 'None',
            dueDate: ''
        }

    }
    showModal = () => {
        this.setState({ visible: true });
    }
    hideModal = () => {
        this.setState({ visible: false });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, ()=>{
            this.state.summary.length<10 ? this.props.errorSum("Minimum 10 chars required"):
        this.state.summary.length>140 ? this.props.errorSum("Max length(140 chars) exceeded"):this.props.errorSum("")
        this.state.description.length<10 ? this.props.errorDes("Minimum 10 chars required"):
        this.state.description.length>500 ? this.props.errorDes("Max length(500 chars) exceeded. "):this.props.errorDes("");
        });
    }

    onSubmit = () => {
        if(!this.props.errorMsgSum && !this.props.errorMsgDes){
            let conf = window.confirm("Do you want to save this task?")
        if (conf) {
            const data = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                currentState: this.state.isCompleted,
                summary: this.state.summary,
                description: this.state.description,
                priority: this.state.priority ? this.state.priority : 'None',
                dueDate: this.state.dueDate,
                createdAt: new Date().toISOString().split("T")[0]
            };
            this.props.addTask(data);
            this.hideModal();
            this.setState({
                visible: false,
                summary: '',
                description: '',
                priority: '',
                dueDate: ''
            })
        } else {
            this.hideModal()
            this.setState({
                visible: false,
                summary: '',
                description: '',
                priority: '',
                dueDate: ''
            })
        }
        }
        
    }

    render() {
        return (
            <section>
                <nav role="navigation">
                    <button type="button" onClick={this.showModal} className="btn">
                        <i className="fa fa-plus fa-2x"></i>
                    </button>
                </nav>
                <Modal visible={this.state.visible} onClose={this.hideModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Task</h4></div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Summary</label></div>
                                    <div className="col-8">
                                        <input type="text" name="summary" onChange={this.handleChange} value={this.state.summary} />
                                        <br/>
                                        {this.props.errorMsgSum && (<small className='alert-danger'>{this.props.errorMsgSum}</small>)}
                                    </div>
                                    <div className="col-4">
                                        <label>Description</label></div>
                                    <div className="col-8">
                                        <textarea type="text" name="description" rows='3' cols="23" onChange={this.handleChange} value={this.state.description} />
                                        <br/>
                                        {this.props.errorMsgDes && (<small className='alert-danger'>{this.props.errorMsgDes}</small>)}
                                    </div>
                                    <div className="col-4">
                                        <label>Priority</label>
                                    </div>
                                    <div className="col-8">
                                        <select name="priority" onChange={this.handleChange} value={this.state.priority}>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select></div>
                                    <div className="col-4">
                                        <label>Due Date</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="date" name="dueDate" onChange={this.handleChange} value={this.state.dueDate}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.hideModal} type="button" className="btn">
                                    Cancel
                                </button>
                                <button onClick={this.onSubmit} type="button" className="btn">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        );
    }
};

const mapStateToProps = (state) => {
    return {
      errorMsgSum : state.todoData.errorSum,
      errorMsgDes : state.todoData.errorDes,
    }
  }

export default connect(mapStateToProps, { addTask, errorSum, errorDes })(AddTask);