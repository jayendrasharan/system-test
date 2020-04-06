import _ from 'lodash'
import React from "react";
import { reduxForm, Field } from 'redux-form';
import '../App.css';

const FIELDS = {
  Summary: {
    type: 'input',
    label: 'summary of task'
  },
  Description:{ 
    type: 'textarea',
    label: 'description of task'
},
  Priority: {
    type: 'select',
    label: 'priority of task'
    
  },
  dueDate:{
    type: 'date',
    label: 'due date of task'
  }
}

let TodoTask = props => {
  const { handleSubmit, close } = props;
  const submitForm = (props) => {
    return props.close
  }
  

  return <form onSubmit={props => handleSubmit(props)} className="form" >
    <div className="field">
      <div className="control">
        <Field name="Summary" component={renderField} type="text" label="Summary"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Description: </label>
        <Field name="description" component="textarea"/>
      </div>
    </div>

    <div className="field">
    <div className="control">
        <label className="label">Priority: </label>
        <Field
          name="Priority"
          label="Priority"
          component={DropDownSelect}
          className="form-control"
        />
      </div>
      </div>

    <div className="field" style={{ marginLeft: "15px",left:"0px", position:"relative"}}>
      <div className="control">
        <Field className="date" name="dueDate" label="Due Date" component={renderField} type="Date"/>
      </div>
    </div>

    <div className="field" style={{ marginLeft: "15px",float:"right" }}>
      <div className="control">
        <button className="submitbtn" type="submit" onClick={submitForm}>Save</button>
      </div>
    </div>

    <div className="field" style={{ marginLeft: "15px",float:"right" }} >
      <div className="control">
        <button className="button" onClick={close}>Cancel</button>
      </div>
    </div>


  </form>;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="control">
      <label className="label">{label}: </label>
      <input className="input" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class DropDownSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderSelectOptions = (opt) => (
    <option key={opt} value={opt}>{opt}</option>
  )

  render() {
    const { input } = this.props;
    const priorityOptions = ["Low","Medium","High"]
    return (
        <select {...input}>
          <option key="None" value="None" default>None</option>
          {priorityOptions.map(this.renderSelectOptions)}
        </select>

    );
  }
}

TodoTask = reduxForm({
  form: 'form',
  fields: _.keys(FIELDS),
  enableReinitialize : true

})(TodoTask);

export default class AddtaskModal extends React.Component {

  handleSubmit = (task) => {
    console.log(task)
    this.props.close()
}
  render() {
    return (
      <div className="modal">
          <span className="close" onClick={this.props.close}>
            &times;
          </span>
          <TodoTask onSubmit={this.handleSubmit.bind(this)} close={this.props.close}/>
      </div>
    );
  }
}
