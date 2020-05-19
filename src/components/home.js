import React from 'react';
import { connect } from 'react-redux';
import { addNewTask } from '../actions/task';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

class Home extends React.Component {
    
        constructor(){
            super();
            this.state = {
                name:'', description:'', priority:'None', open: false, duedate:new Date()
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.openPopup = this.openPopup.bind(this);
            this.handleChangeDate = this.handleChangeDate.bind(this);
            this.escFunction = this.escFunction.bind(this);
        }
    
        openPopup() {
            this.setState({ open: !this.state.open });
          }
          escFunction(event){
            if(event.keyCode === 27) {
             this.openPopup();
            }
          }
        handleChange= (e)=>{
            this.setState({[e.target.name]:e.target.value});
        }
        handleChangeDate = (date)=>{
            this.setState({duedate:date})
        }
        componentWillUnmount(){ document.removeEventListener("keydown", this.escFunction, false); }
        componentDidMount(){ document.addEventListener("keydown", this.escFunction, false); }  
        handleSubmit(e){
            e.preventDefault();
            const { name,description,priority,duedate } = this.state;
            const task_info =  { name,description,priority,duedate }
            if(name){
                this.props.addTask(task_info);
            }
        }
        
        add_form(){
            return( 
                
                <div className="popup">
                   
                <div className="popup_inner"> <h2>Add New Task</h2>
                <form   method="post" onSubmit={this.handleSubmit} id="taskfrm" >

                <div className="form-group">
                <label>Summary:</label>
                <span><input type="text" required placeholder="" name="name" onChange={this.handleChange.bind(this)}/></span>
                </div>
                <div className="form-group textarea">
                <span>
                <label>Description:</label>
            
                <textarea as="textarea"  name="description" onChange={this.handleChange.bind(this)}></textarea></span>
                </div>
                <div className="row">
                <div className="col-sm-6">
                <div className="form-group">
                <label>Priority:</label>
                    <span><select className="dropdown" name="priority" onChange={this.handleChange.bind(this)}>
                    <option value='None'>None </option>
                    <option value='low'>low</option>
                    <option value='medium'>medium</option>
                    <option value='high'>high</option>      
                    </select>
                    </span>
                </div>
             </div>
                <div className="col-sm-6">
                <div className="form-group">
                <label>Due date:</label>
                <DatePicker selected={this.state.duedate} onChange={this.handleChangeDate}   />
                </div>
                </div>
                <div className="col-sm-6 m-t">
                <label>
                        <button type="submit" name="btnsubmit" value="submit" className="btn space">Save Task</button>
                </label>
                    <button onClick={this.openPopup} className="btn">
                        Close
                    </button>
                    </div>
                </div>
                
                </form>
                </div>
                </div>        
                        );
        }
        render(){
           
            return(
                <React.Fragment>
                   { this.state.open ? this.add_form() : null }
                <div className="circle" onClick={ () => this.openPopup('row')}><i class="fa fa-plus" aria-hidden="true"></i></div>
                </React.Fragment>
            )
        }
    }
    
    const mapStateToProps = (state) =>{
        return{
             tasks:state.tasks   
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            addTask: (task_info) => {
                dispatch(addNewTask(task_info))
            }
        }
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(Home)