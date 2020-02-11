import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import RichTextEditor from 'react-rte';
import DatePicker from 'react-datepicker';

import { priority } from './../../config';
import "react-datepicker/dist/react-datepicker.css";
import './CustomModal.css';

const CustomModal = props => {
  const { type, title, row } = props;
  const [modal, setModal] = useState(false);
  const [summary, setSummary] = useState((row && row.summary) || '');
  const [desc, setDesc] = useState(RichTextEditor.createEmptyValue(row && row.description));
  const [pri, setPri] = useState( (row && row.priority) || -1);
  const [dueDate, setDueDate] = useState((row && new Date(row.dueDate)) ||new Date());
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
      {type === "new" ? (
        <div className="justify-content-end row">
          <button className="btn" onClick={toggle}>
            <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      ) : (
        ``
      )}
      {type === "edit" ? (
        <i
          onClick={toggle}
          className="fa mx-2 fa-pencil-square-o"
          aria-hidden="true"
        ></i>
      ) : (
        ""
      )}
      {type === "view" ? (
        <i onClick={toggle} className="fa mx-2 fa-eye" aria-hidden="true"></i>
      ) : (
        ""
      )}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Summary :</label>
              <div className="col-sm-10">
                {type === "view" ? (
                  <span className="read-only-els">{summary}</span>
                ) : (
                  <input
                    type="text"
                    value={summary}
                    onChange={handleSummary}
                    className="w-75 form-control"
                  />
                )}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Description:</label>
              <div className="col-sm-10 rte">
                {type === "view" ? (
                  <p className="read-only-els">{row.description}</p>
                ) : (
                  <RichTextEditor
                    value={desc}
                    onChange={val => {
                      setDesc(val);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6 row">
                <label className="col-sm-2 col-form-label">Priority:</label>
                <div className="col-sm-10">
                  {type === "view" ? (
                    <span className="priority read-only-els"> {pri}</span>
                  ) : (
                    <select
                      className="form-control w-50"
                      onChange={e => setPri(e.target.value)}
                    >
                      <option defaultValue="-1">Select One</option>
                      {priority.map(opt => {
                        return (
                          <option
                            defaultValue={opt}
                            key={opt}
                            selected={opt === pri ? true : false}
                          >
                            {opt}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>

              <div className="col-sm-6 row">
                <label className="col-sm-4 col-form-label">Due date:</label>
                <div className="col-sm-8">
                  {type === "view" ? (
                    <span className="read-only-els due-date">
                      {row.dueDate}
                    </span> //FIXME: why not dueDate?
                  ) : (
                    <DatePicker
                      selected={dueDate}
                      onChange={date => setDueDate(date)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
        { type !== "view" ? (
        <ModalFooter>
            <Button color="secondary" onClick={toggle} className="btn-lg">
              Cancel
            </Button>
            <Button color="primary" className="btn-lg">
              Save
            </Button>
          </ModalFooter>
        ):('')}
      </Modal>
    </>
  );
}

export default CustomModal;