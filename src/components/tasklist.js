import React from 'react';
import { connect } from 'react-redux';
import TaskRow from './taskrow';
import { setSortingTask,addNewFilter } from '../actions/task';
import upimg from '../assets/images/up_arrow.jpg';
import downimg from '../assets/images/down_arrow.jpg';
import '../App.css';

class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            srtField : 'name',
            orderField:'desc',
            filterText:''
        }
       this.taskfilter = this.taskfilter.bind(this);
    }
    taskfilter(val){
         this.props.addFilter(val)
     }
   setSortingField=(sortField) => {
       
       if(this.state.orderField==='desc') {
           this.setState({orderField:'asc'})
       } else {
        this.setState({orderField:'desc'})
       }
        if(sortField!=="" ) {
            this.setState({srtField:sortField})
            let sortConf = {srtField:sortField,orderField:this.state.orderField}
            this.props.addSorting(sortConf);
        }
    }
    render(){
        const tasks = this.props.tasks;
        const filterText = this.props.filterText;
        let srtField =this.props.orderField.srtField;
        let orderField =this.props.orderField.orderField;
        let img='';
        return(
            <React.Fragment>
                <div className="container">
                    <ul className="tab">
                        <li className={filterText==='all'? "active":null} onClick={() => this.taskfilter('all')}>All</li>
                        <li  className={filterText==='completed'? "active":null} onClick={() => this.taskfilter('completed')}>Completed</li>
                        <li  className={filterText==='pending'? "active":null} onClick={() => this.taskfilter('pending')}>Pending</li>
                    </ul>
                </div>
                <table  className="container">
                    <tbody>
                    {    tasks.length>0 ?
                    <React.Fragment>
                    <tr ><td colSpan="5"><h2>Task Listing </h2></td></tr>
                    <tr className="tr">
                        <td className="th" onClick={()=>this.setSortingField("name")} ><strong>Summery</strong>
                        { srtField==='name'?
                            <img src={  orderField==='asc' ? img=upimg : img=downimg} width="8" />
                            : null 
                        }
                        </td>
                        <td className="th" onClick={()=>this.setSortingField("priority")}><strong>Priority</strong>
                        { srtField==='priority'?
                            <img src={  orderField==='asc' ? img=upimg : img=downimg} width="8" />
                            : null 
                        }
                        </td>
                        <td className="th" onClick={()=>this.setSortingField("currdate")}><strong>Created On</strong>
                        { srtField==='currdate'?
                            <img src={  orderField==='asc' ? img=upimg : img=downimg} width="8" />
                            : null 
                        }
                        </td>
                        <td className="th" onClick={()=>this.setSortingField("duedate")}><strong>Due Date</strong>
                        { srtField==='duedate'?
                            <img src={  orderField==='asc' ? img=upimg : img=downimg} width="8" />
                            : null 
                        }</td>
                        <td className="th" ><strong>Action</strong></td>
                        </tr>
                        </React.Fragment>
                        :
                        <tr className="tr"><td><h3>Sorry No Task Found!</h3></td></tr>
                       }

                        {
                        tasks.map( (task,i) =>(
                                <TaskRow taskr={task} ind={i} key={i}/>
                               )) 
                        }
                        </tbody>
                </table>    
                </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    const searchText = state.searchText;
    const filterText = state.filterText;
    return{
         tasks:state.tasks.filter( (newtask,i)=> {
                 if(newtask.name.toLowerCase().indexOf(searchText)!==-1 || newtask.description.toLowerCase().indexOf(searchText)!==-1|| newtask.priority.toLowerCase().indexOf(searchText)!==-1 ) { 
                        if(filterText=='completed') {
                             console.log("filterText- completed->",filterText+' , '+newtask.complete)
                            if(newtask.complete) {return newtask }else return false;
                        } else if(filterText==='pending'){
                            console.log("filterText- pending->",filterText)
                            if(!newtask.complete){ return {...newtask} } else return false;
                        } else if(filterText==='all') {
                            console.log("filterText- all->",filterText)
                            return {...newtask} 
                        }
                       console.log("filterText- all->",filterText)
                        return {...newtask}
                    } else { return false; }
                 }),
                 filterText : state.filterText ,
                 orderField: state.sortConf       
         
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSorting: (sortData) => {
            dispatch(setSortingTask(sortData))
        },
        addFilter:(val)=>{
            dispatch(addNewFilter(val))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList)