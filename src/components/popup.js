import React from "react";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {editOpenTask} from '../actions/task';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),id:'',name:'', description:'', priority:'None', complete: false, currdate:new Date(),frmElementName:'',duedate:''
    };
    this.editTask = this.editTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }
  handleChangeFrm= (e)=>{
    let frmElementName = e.target.name;
    this.setState({ [frmElementName]: e.target.value });
}

  escFunction(event){
    if(event.keyCode === 27) {
      this.props.closePopup();
    }
  }
  editTask(e){
    e.preventDefault();    
    const { id,name,description,priority,complete,currdate,duedate } = this.state;
    const task_info = { id,name,description,priority,complete,currdate,duedate };
    this.props.editOpenTask(task_info); 
    this.props.closePopup();
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount(){
   let id = this.props.taskr.id;
   let rtask= this.props.tasks.filter( (task,i,arr) => (task.id===id) )
   this.setState({id:rtask[0].id, name:rtask[0].name,description:rtask[0].description, complete:rtask[0].complete})
   this.setState({priority:rtask[0].priority, duedate:rtask[0].duedate, currdate:rtask[0].currdate})
   document.addEventListener("keydown", this.escFunction, false);
}
 
  render() {
    const dis= this.props.row;
    const id= this.props.taskr.id;
      console.log("this.props",this.props.taskr);
      console.log("this.props",this.props.row);

    return (
      <div className="popup">
        <div className="popup_inner">
          <h2>Task Form</h2>
<form  onSubmit={ this.editTask }  id="add_task" >
      
 <div className="form-group">
    <label>Title:</label>
    <span>
    { dis === 'yes'? 
    <input type="text" placeholder="" value={this.state.name} disabled="disabled" />
    :
    <input type="text" name="name" value={this.state.name}  onChange={this.handleChangeFrm.bind(this)} />
    }       
      </span>
    </div>
    <div className="form-group textarea">
    <span>
    <label>Description:</label>
    { dis === 'yes'? 
    
    <textarea as="textarea" name="description"   disabled= "disabled" >{this.props.taskr.description}</textarea>
    :
   
    <textarea as="textarea" name="description" value={this.state.description} onChange={this.handleChangeFrm.bind(this)} >{this.state.description}</textarea>
    }   
   </span>
    </div>
    <div className="row">
    <div className="col-sm-6">
    <div className="form-group">
    <label>Priority:</label>
    <span><select className="dropdown"  disabled={ dis === 'yes'? "disabled" :null} name="priority" onChange={this.handleChangeFrm.bind(this)}>
      <option selected={this.props.taskr.priority==='None'? "selected":null} >None </option>
      <option selected={this.props.taskr.priority==='low'? "selected":null}>low</option>
      <option selected={this.props.taskr.priority==='medium'? "selected":null}>medium</option>
      <option selected={this.props.taskr.priority==='high'? "selected":null}>high</option>      
      </select>
      </span>
   
</div>
  </div>
  <div className="col-sm-6">
  <div className="form-group">
  <label>Due date:</label>
  <DatePicker selected={this.state.startDate} onChange={this.handleChange} disabled={ dis === 'yes'? "disabled" :null}   />
  </div>
  </div>
    {
        this.props.row!=='yes'? 
        <button className="btn space">Edit Task</button>
        : null
    }
   <button id="clsbtn" onClick={this.props.closePopup} className="btn btn-primary"> Close </button>
  </div>
 
</form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
      tasks:state.tasks      
 }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editOpenTask:(task_info) => {
           dispatch(editOpenTask(task_info))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Popup);