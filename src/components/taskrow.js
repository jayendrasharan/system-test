import React from 'react';
import  Popup  from "./popup";
import { connect } from 'react-redux';
import {deleteTask,completedTask} from '../actions/task';
import * as moment from 'moment'
import clspng from '../assets/images/close.png';
import editpng from '../assets/images/edit.jpg';
import completed from '../assets/images/completed.png';

import '../App.css';

class TaskRow extends React.Component{
    constructor(props){
        super(props)
        this.state = { open: false, row:'' };
        
        this.openPopup = this.openPopup.bind(this);
        this.delTaskfun = this.delTaskfun.bind(this);
    }
    delTaskfun(id) {
        if (window.confirm("Are You Sure You  want to delete this Task?")) {
            this.props.delTask(id)
          } 
        
    }
    openPopup(row) {
        this.setState({ open: !this.state.open });
        if(row==='row') this.setState({row:'yes'}); else this.setState({row:'no'});
      }
    render(){
        let newDate = new Date(this.props.taskr.duedate);
         const NewDate = moment(newDate, 'DD-MM-YYYY').toISOString().slice(0,10);
        let cruDate = new Date(this.props.taskr.currdate);
        const curdate  =  moment(cruDate,'DD-MM-YYYY').toISOString().slice(0,10);
    return(
        <React.Fragment>
            {this.state.open ? <Popup closePopup={this.openPopup} row={this.state.row} {...this.props} /> : null}
            
                <tr className={ this.props.taskr.complete ? "tr linetrough" : "tr" }  key={this.props.ind} >
                    <td className="th" onClick={ () => this.openPopup('row') }><span>{this.props.taskr.name}</span></td>
                    <td className="th" onClick={ () => this.openPopup('row') }><span>{this.props.taskr.priority}</span></td>
                    <td className="th" onClick={ () => this.openPopup('row') }><span>{curdate}</span></td>
                    <td className="th" onClick={ () => this.openPopup('row') }><span>{NewDate}</span></td>
                <td>
                    <i class="fa fa-times" aria-hidden="true" onClick={ ()=>this.delTaskfun(this.props.taskr.id)} ></i>
                    <i class="fa fa-check" aria-hidden="true" onClick={ ()=>this.props.completed(this.props.taskr.id)}></i>
                    <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={ () => this.openPopup('edit')}></i>


                    {/*<img src={clspng} width="18" onClick={ ()=>this.delTaskfun(this.props.taskr.id)} className="closeImg"/>
                    <img src={completed} width="28" onClick={ ()=>this.props.completed(this.props.taskr.id)} className="closeImg"/>
    <img src={editpng} width="18" onClick={ () => this.openPopup('edit')} className="closeImg"/>*/}
                </td>
                </tr>
            
        </React.Fragment>    
    )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delTask: (id) => {
            dispatch(deleteTask(id))
        },
        completed:(val) => {
            dispatch(completedTask(val))
        }
    }
}

export default connect(null,mapDispatchToProps)(TaskRow);