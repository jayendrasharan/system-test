import React, { Component } from 'react'
import Modal from 'react-modal'
class ModalComponent extends Component {
     constructor(props) {
         super(props)
         this.state = {
              isOpen : this.props.isOpen,
              summary : this.props.taskDetailData.length>0 ? this.props.taskDetailData[0].summary:"",
              description:this.props.taskDetailData.length>0 ? this.props.taskDetailData[0].description:"",
              id:this.props.taskDetailData.length>0 ? this.props.taskDetailData[0].id:"",
              priority:this.props.taskDetailData.length>0 ? this.props.taskDetailData[0].priority:"",
              dueDate:this.props.taskDetailData.length>0 ? this.props.taskDetailData[0].dueDate:"",
              
         }
      
     }
     
    closeModal=()=>{
        this.props.closeModal();
    }
    onAdd=(e)=>{
        e.preventDefault();
        this.props.addTask(this.state.summary,this.state.description,this.state.dueDate,this.state.priority,this.state.id)
    }
    onChangeHandler =(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
           
        
    }
   
    
    render() {
        return (
            <div>
                <Modal isOpen={this.state.isOpen} className='modal' onRequestClose={this.closeModal}>
                              
                    <p className='modal-title'>{this.props.taskDetailData.length>0?"Edit Task":"Add Task"}</p>
                    <div>
                        <label htmlFor="summary">Summary:</label><br/>
                        <input type='text' id="summary" name='summary' className="txt-task" onChange={this.onChangeHandler}  value={this.state.summary} ></input>
                    </div>
                    <div>
                         <label htmlFor="description">Description:</label><br/>
                         <input type='text' id = "description" name='description'  className="txt-task" onChange={this.onChangeHandler} value={this.state.description} ></input>
                    </div>
                    <div>
                        <label htmlFor="priority">Priority</label><br/>
                            <select  name='priority' id = 'priority' value={this.state.priority} onChange={this.onChangeHandler}>
                                <option value='none'>None</option>
                                <option value='low'>Low</option>
                                <option value='medium'>Medium</option>
                                <option value='high'>High</option>
                            </select>
                    </div>
                    <div>
                        <label htmlFor="due">Due date:</label><br/>
                        <input type="date" id="due" name="dueDate" value={this.state.dueDate} onChange={this.onChangeHandler} max="2021-12-31"/>            
                    </div>
                    <div>
                        <button className='btn-add' onClick={this.onAdd}>Add</button>
                        <button className='btn-cancel' onClick={this.closeModal}>Cancel</button>
                    </div>
                   
                </Modal>
            </div>
        )
    }
}

export default ModalComponent
Modal.setAppElement('#root');

