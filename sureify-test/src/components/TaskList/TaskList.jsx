import React, { useEffect, useReducer, useState,Fragment } from "react";
import { enumState, applySearchSortGroupOnData, EntryWindowMode, hasValue, enumClick } from "../../utils/constants";
import "./TaskList.scss";
import { connect } from "react-redux";
import { actions as taskActions } from "../../reducers/actions/tasks";
import { Button } from "react-bootstrap";
import ModalPopup from '../Modal/ModalPopup';
import Task from '../Tasks/Task';
import Form from 'react-bootstrap/Form';
import Grid from "../Grid/Grid";

function reducer(state, action) {
  if (hasValue(action.type)) {
    return { ...state, [action.type]: action.payload };
  }
  else {
    throw new Error();
  }
};

const initialState = {
  selectedGroupBy: "",
  selectedStatus: "",
  selectedSort: {
    column: null,
    direction: "desc",
    type: ""
  },
  searchVal: "",
  data: {},
  showEdit: false,
  showView: false,
  showDelete:false,
  selectedItem: null
};

const TaskList = ({ getListOfTasks, ...props }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [tabName, setTabName] = useState('All');
  const[showdeleteModal,setDelete]=useState(false)
  const[deletedItem,setDeletedItem]=useState()

  const viewEditTask = (val) => {
    dispatch({ type: 'showEdit', payload: val });
  };

  const viewTaskDetails = (val) => {
    dispatch({ type: 'showView', payload: val });
  };

  const viewDeleteTask = (val) => {
    dispatch({ type: 'showDelete', payload: val });
  };
  const deleteSelectedTask = ()=>{
    props.deleteTask(deletedItem);
    viewDeleteTask(false)
  }

  useEffect(() => {
    getListOfTasks();
  }, [getListOfTasks]);

  useEffect(() => {
    dispatch({ type: 'data', payload: applySearchSortGroupOnData(props.tasksList, state.searchVal, getSearchPropsInGrid(), state.selectedGroupBy, state.selectedSort, state.selectedStatus) });
  }, [props.tasksList]);

  const onSort = (column, type) => {

    if (props.configData.GridColumns.filter(item => item.field === column && item.sortable).length === 0) return;

    let sortDetails = {
      column,
      direction: state.selectedSort.column
        ? state.selectedSort.direction === "asc"
          ? "desc"
          : "asc"
        : "desc",
      type
    }

    dispatch({ type: 'selectedSort', payload: sortDetails });
    dispatch({ type: 'data', payload: applySearchSortGroupOnData(props.tasksList, state.searchVal, getSearchPropsInGrid(), state.selectedGroupBy, sortDetails, state.selectedStatus) });
  };

  const setArrow = (column) => {

    if (props.configData.GridColumns.filter(item => item.field === column && item.sortable).length === 0) return;

    let className = "sort-direction";

    if (state.selectedSort.column === column) {
      className += state.selectedSort.direction === "asc" ? " asc" : " desc";
    }

    return className;
  };

  const onGroupSelect = (event) => {
    dispatch({ type: 'selectedGroupBy', payload: event.target.value });
    dispatch({ type: 'data', payload: applySearchSortGroupOnData(props.tasksList, state.searchVal, getSearchPropsInGrid(), event.target.value, state.selectedSort, state.selectedStatus) });
  };

  const handleClick = (event, item, clickType) => {
    event.persist();
    event.stopPropagation();
    switch (clickType) {
      case enumClick.Edit:
        viewEditTask(true);
        dispatch({ type: 'selectedItem', payload: item });
        break;
      case enumClick.View:
        viewTaskDetails(true);
        dispatch({ type: 'selectedItem', payload: item });
        break;
      case enumClick.Delete:
        viewDeleteTask(true)
        setDeletedItem(item)
        break;
      case enumClick.Done:
        props.updateTask({
          ...item,
          state: enumState.Done,
        });
        break;
      case enumClick.ReOpen:
        props.updateTask({
          ...item,
          state: enumState.Open,
        });
        break;
      default:
        throw new Error();
    }
  };

  const onSearchChange = (event) => {
    dispatch({ type: 'searchVal', payload: event.target.value });
    dispatch({ type: 'data', payload: applySearchSortGroupOnData(props.tasksList, event.target.value, getSearchPropsInGrid(), state.selectedGroupBy, state.selectedSort, state.selectedStatus) });
  };

  const onSetStatusChange = (selectedStatus,TabName) => {
   setTabName(TabName)
    dispatch({ type: 'selectedStatus', payload: selectedStatus });
    dispatch({ type: 'data', payload: applySearchSortGroupOnData(props.tasksList, state.searchVal, getSearchPropsInGrid(), state.selectedGroupBy, state.selectedSort, selectedStatus) });
  };

  const getSearchPropsInGrid = () => {
    return props.configData.GridColumns.map(item => { return item.filterable ? item.field : null }).filter(item => item !== null);
  }

  return ( 
    <>   
     <Fragment>
     <div className="global-fields">
     <Form.Group className="search-section" controlId="search">
       <Form.Label>Global Search</Form.Label>
       <Form.Control type="text" placeholder="Search" onChange={(e) => onSearchChange(e)} />
     </Form.Group>


     <Form.Group className="grouping-section" controlId="group-by">
       <Form.Label className="groupby-text">Group By</Form.Label>
       <Form.Control as="select" className="groupby-dropdown" onChange={(e) => onGroupSelect(e)}>
         <option value="">None</option>
         {
           props.configData.GridColumns.map((groupProp,index) => (
             groupProp.groupable ? <option key={groupProp.field} value={groupProp.field} >{groupProp.title}</option> : <></>
           ))
         }
       </Form.Control>
     </Form.Group>
   </div>
   <div className="tabs">
     <Button variant={state.selectedStatus === "" ? "primary" : "light"} onClick={() => onSetStatusChange("",'All')}>All</Button>{' '}
     <Button variant={state.selectedStatus === enumState.Open ? "primary" : "light"} onClick={() => onSetStatusChange(enumState.Open,'Pending')}>Pending</Button>{' '}
     <Button variant={state.selectedStatus === enumState.Done ? "primary" : "light"} onClick={() => onSetStatusChange(enumState.Done,'Completed')}>Completed</Button>
   </div>

   <div className="content-box">
   <Grid
     tasksList={state.data}
     filterVal={state.searchVal}
     gridColumns={props.configData.GridColumns}
     onSort={onSort}
     setArrow={setArrow}
     groupBy={state.selectedGroupBy}
     handleClick={handleClick} 
     tabName={tabName}/>
 </div>
   
   <ModalPopup showModal={state.showEdit} onClose={() => viewEditTask(false)}>
     <Task mode={EntryWindowMode.Edit} taskItem={state.selectedItem} onClose={viewEditTask} />
   </ModalPopup>
   <ModalPopup showModal={state.showView} onClose={() => viewTaskDetails(false)}>
     <Task mode={EntryWindowMode.View} taskItem={state.selectedItem} onClose={viewTaskDetails} />
   </ModalPopup>

   <ModalPopup showModal={state.showDelete} onClose={()=>viewDeleteTask(false)}>
   <Task mode={EntryWindowMode.Delete} onClose={viewDeleteTask} onConfirmDelete ={()=>deleteSelectedTask()}/>
   </ModalPopup>
   </Fragment>  
    
     </>
   
   
  );
};

const mapDispatchToProps = {
  ...taskActions,
};

const mapStateToProps = (state) => ({
  tasksList: state.tasks.tasksList,
  configData: state.config.configData,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
