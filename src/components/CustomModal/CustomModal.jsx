import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import RichTextEditor from 'react-rte';

import { priority } from './../../config'
import './CustomModal.css';

const CustomModal = props => {
  const { type, title, row } = props;
  const [modal, setModal] = useState(false);
  const [summary, setSummary] = useState((row && row.summary) || '');
  const [desc, setDesc] = useState(RichTextEditor.createEmptyValue(row && row.description));
  const toggle = () => setModal(!modal);

  const handleSummary = e =>{
    console.log(e.target.value.length)
    if(e.target.value.length < 140){
      setSummary(e.target.value);
    }else{
      return false;
    }
  };

  return (
    <>
      {type ==='new' ?
        <div className='justify-content-end row'> 
          <button className='btn' onClick={toggle}>
            <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
          </button>
        </div>:``
      }
      {type === 'edit'? <i onClick={toggle} className="fa mx-2 fa-pencil-square-o" aria-hidden="true"></i> : ''}
      {type === 'view'? <i onClick={toggle} className="fa mx-2 fa-eye" aria-hidden="true"></i> : ''}
      

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
        <Form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Summary :</label>
            <div className="col-sm-10">
              {type === 'view' ? <span>{summary}</span>:
                <input
                  type="text"
                  value={summary}
                  onChange = {handleSummary}
                  className="w-75 form-control"
                />
              }
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description:</label>
            <div className="col-sm-10 rte">
              <RichTextEditor value={desc} onChange={val => {setDesc(val)}}/>
            </div>
          </div>

          {/*<div className="form-group row">
            <div className="col-sm-6 row">
              <label className="col-sm-2 col-form-label">Priority:</label>
              <div className="col-sm-10">
                <select className="form-control w-50">
                  <option value='-1'>Select One</option>
                  {priority.map(x=>{
                    return <option value={x} key={x}>{x}</option>
                  })}
                </select>
              </div>
            </div>

              <div className="col-sm-6 row">
                <label className="col-sm-4 col-form-label">Due date:</label>
                <div className="col-sm-8">
                  <input type="date" className="form-control w-75"/>
                </div>
              </div>

            </div> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} className="btn-lg">
            Cancel
          </Button>
          <Button color="primary" className="btn-lg">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CustomModal;