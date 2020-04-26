import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css';
import {hData} from '../../constants';
import { TableHead } from './TableHead'
import {Tablebody} from './Tablebody';
import {Table} from './Tableview'
import * as actions from '../../constants'
import Tabs from '../Tab';
import Searchbar from '../SearchBar';
import {Groupby} from '../Groupby';
import TaskForm from '../TaskForm';


class Tableview extends Component {
    constructor(props){
        super(props);
        this.state = this.props.rowData;
    }
    handleModalButton = (e) => {
        e.preventDefault();
        this.props.openModel(true);

    }

    tableAction = (e,type,rowData) => {
        e.preventDefault();
        console.log(type,"type");
        console.log(rowData,'rowData');

        switch(type){
            case actions.Edit :
                this.props.updateTask(rowData);
                this.props.history.push('/editTask');
                break;
            case actions.Delete:
                this.props.deleteTask(rowData.taskId);
                this.props.history.push('/allTasks');

                break;
            case actions.Done:
                this.props.doneTask(rowData.taskId);
                this.props.history.push('/allTasks');
                break;
            default :
            return false

        }
        
    }
    gotoLandingPage = () => {
        this.props.history.push('/')
        window.location.reload(false);
    };
    render() {
        const {rowData,editedRow,match,location,onGroupBy,groupByObj,showModal,showViews} = this.props;
        const {pendings,completed,allTasks,onSearch,searchResult,onSrchBtnCls,onGrpBtnCls} = this.props;
        console.log(allTasks,"ALLTASKS");
        const {path} = match;
        let formedRowData;
        switch(path) {
            case "/pendingTasks":
                formedRowData = pendings;
            break
            case "/completedTasks":
                formedRowData = completed;
            break
            case "/allTasks":
                formedRowData = rowData;
            break
            default:
                formedRowData = rowData;
        }

        return (
            <div className="myContent">
            <h1 onClick={this.gotoLandingPage} className="myToDoApp">ToDo App </h1>
            {showViews && showViews.showSrch && 
            <Searchbar
                    onSearch={onSearch}
                    searchResult={searchResult}
                    headerData={hData}
                    disableButtons={true}
                    rowData={rowData}
                    onSrchBtn={onSrchBtnCls}
            />}
             
            {showViews && showViews.showGroupBy && 
            <Groupby onGroupby={e => onGroupBy(e.target.value)}
                     groupByObj={groupByObj}     
                     attributes={Object.keys(groupByObj)}
                     attriLen={Object.keys(groupByObj).length}
                     onGrpBtn={onGrpBtnCls}
                     rowData={rowData}
            />  
            }
            
            <br/>
            <Tabs history={this.props.history} 
                  location={match.path}/>
            <hr/>
            <Table>
                <TableHead data={hData} 
                           sortAction={(e,val) => this.props.doSort(e,val)}
                           disableButtons={false}
                />
                <Tablebody rowData={formedRowData}    
                           doEdit={this.doEdit}
                           doDelete={this.doDelete}
                           doDone={this.doDone}
                           tableAction={this.tableAction}
                           disableButtons={false}
                />
            </Table>
            <button id="modalBtn" className="myPlusbutton" onClick={(e) => this.handleModalButton(e)}/>
            { showModal && <TaskForm {...this.props}/>}
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        rowData: state.taskReducer.taskDetails || [],
        editedRow: state.taskReducer.editedRow,
        allTasks: state.taskReducer.AllTasks || [],
        completed:state.taskReducer.Completed || [],
        pendings:state.taskReducer.Pendings || [],
        taskId: state.taskReducer.taskIdVal || [],
        searchResult: state.taskReducer.SearchTasks,
        groupByObj:state.taskReducer.groupByData || {},
        showModal: state.modalReducer.showModal,
        showViews:state.modalReducer,
    }
}

export const mapDispatchtoProps = dispatch => {
    return {
        openModel: (data) => {
            dispatch({type:"EDIT_ROW_DELETE"})
            return (dispatch({type:"MODAL_ON",payload:data}))},
        updateTask: (data) => {
            (dispatch({type:"MODAL_ON",payload:true}))
            return (dispatch({type:"UPDATE_START",payload:data}))
        },
        deleteTask : (data) => {dispatch({type:"DELETE_TASK",payload:data})},
        doSort : (e,key) => {
            if (!(key === "Description" || key === "createdAt" || key === "Action" ))
            return  (dispatch({type:"DO_SORT",payload:key}))
        },
        doneTask: (key) => {
            return (dispatch({type:"TASK_COMPLETE",payload:key}))
        },
        onSearch: (data) => {
            return (dispatch({type:"DO_SEARCH",payload:data}))
        },
        onGroupBy: (data) => (dispatch({type:"DO_GROUP_BY",payload:data}))
        ,
        onGrpBtnCls: () => (dispatch({type:"CLOSE_GRP",payload:false})),
        onSrchBtnCls: () => (dispatch({type:"CLOSE_SRCH",payload:false})),
    }
}
export default connect(mapStateToProps,mapDispatchtoProps)(Tableview)