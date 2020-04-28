import React, { Component } from 'react'

class EditTask extends Component {
    render() {
        return (
            <div>
                 <Modal isOpen={this.state.isOpen} className='modal'>
                              
                              <p>Edit Task</p>
                              <div>
                                   <input type='text' name='summary' placeholder='Summary' ref={this.inputSummaryRef}></input>
                              </div>
                              <div>
                                   <input type='text' name='description' placeholder='Description' ref={this.inputDescriptionRef}></input>
                              </div>
                              <div>
                                  <button onClick={this.onAdd}>Add</button>
                                  <button onClick={this.closeModal}>Cancel</button>
                              </div>
                             
                          </Modal>
            </div>
        )
    }
}

export default EditTask
