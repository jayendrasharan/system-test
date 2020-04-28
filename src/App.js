import React, { useState } from 'react';
import './App.css';
import ModalComponent from './components/ModalComponent';
import TaskListView from './components/TaskListView';
let taskDetailData = [];
let taskList = [
  {id:(Math.floor(Math.random() * 999999)).toString(),title:"complete to do app",summary:"1 This is an assignment from sureify",description:"this is decsription",priority:"low",createdOn:"2020-04-20",dueDate:"2020-05-20",currentStatus:"Open"},
  {id:(Math.floor(Math.random() * 999999)).toString(),title:"complete to do app",summary:"2 This is an assignment from sureify",description:"this is decsription",priority:"medium",createdOn:"2020-04-20",dueDate:"2020-05-20",currentStatus:"Completed"},
  {id:(Math.floor(Math.random() * 999999)).toString(),title:"complete to do app",summary:"3 This is an assignment from sureify",description:"this is decsription",priority:"high",createdOn:"2020-04-20",dueDate:"2020-05-20",currentStatus:"Open"},
  {id:(Math.floor(Math.random() * 999999)).toString(),title:"complete to do app",summary:"4 This is an assignment from sureify",description:"this is decsription",priority:"none",createdOn:"2020-04-20",dueDate:"2020-05-22",currentStatus:"Completed"},
  {id:(Math.floor(Math.random() * 999999)).toString(),title:"complete to do app",summary:"5 This is an assignment from sureify",description:"this is decsription",priority:"high",createdOn:"2020-04-20",dueDate:"2020-05-22",currentStatus:"Open"},

];
function App() {

  let [toDoList, setstateToDoList] = useState(taskList);
  const [openModal, setstateOpenModal] = useState(false);


  function addTask(summary, description,dueDate,priority, id) {
    if (id === '') {
      taskList.push({ id: (Math.floor(Math.random() * 999999)).toString(), title: "", summary: summary, description: description, priority: priority, createdOn: getCurrentDate(), dueDate: dueDate, currentStatus: "Open" })
    } else {
      let editList = toDoList.filter((row) => {
        if (row.id === id) {
          row.summary = summary;
          row.description = description;
          row.dueDate = dueDate;
          row.priority = priority;

        }
        return row;

      });
      taskList = [...editList]
      setstateToDoList(editList);
    }
    setstateOpenModal(false)
  }

  function closeModal() {
    setstateOpenModal(false)
  }

  function clickHandler(e) {
    console.log("task Liat ", taskList.length)
    let filterList = taskList.filter((itr) => {
      if (e.target.name === 'all') {
        return itr;
      } else if (e.target.name === 'pending') {
        if (itr.currentStatus === 'Open') {
          return itr
        }
      } else if (e.target.name === 'completed') {
        if (itr.currentStatus === 'Completed') {
          return itr
        }
      }

    });
    
    setstateToDoList(filterList)
  }



  function onClickAction(e) {
    if (e.target.name === 'delete') {
      const list = toDoList.filter((row) => row.id !== e.target.value);
      taskList = [...list]
      setstateToDoList(list)
    } else if (e.target.name === 'edit') {

      taskDetailData = toDoList.filter((row) => row.id === e.target.value);
      setstateOpenModal(true);
    } else if (e.target.name === 'Mark as Complete') {
      const taskList = toDoList.filter((row) => {
        if (row.id === e.target.value) {
          row.currentStatus = 'Completed'

        }
        return row;
      });
      setstateToDoList(taskList);
    } else if (e.target.name === 'Re-Open') {
      const taskList = toDoList.filter((row) => {
        if (row.id === e.target.value) {
          row.currentStatus = 'Open'
        }
        return row
      });
      setstateToDoList(taskList)
    }
  } 
  function sorting(item,sortBy) {
    let sortedList = [...toDoList]
    
    if (item === 'priorityNumber') {
      sortedList = sortByPriority(sortedList,item,sortBy)
    } else if (item === 'dueDate' || item === 'createdOn') {
      sortedList =  sortByDate(sortedList,item,sortBy)
    } 
    setstateToDoList(sortedList)
  }

  return (
    <div className="App">

      <h1 className='title'>ToDo Tasks</h1>
      <div>
        {/* <input type='search' name='search' placeholder='Search' onChange={onHandleSearch}></input> */}
      </div>
      <div>
        <button className='btn-task' name='all' onClick={clickHandler}>All Tasks</button>
        <button className='btn-task' name='pending' onClick={clickHandler}>Pending Tasks</button>
        <button className='btn-task' name='completed' onClick={clickHandler}>Completed Tasks</button>
      </div>
      <TaskListView data={toDoList} onClickAction={onClickAction} sorting={sorting} />
      <div id="add">
        <button className="addplus" onClick={() => { taskDetailData = []; setstateOpenModal(true); }}>+</button>
      </div>
      {openModal ? <ModalComponent taskDetailData={taskDetailData} isOpen={true} addTask={addTask} closeModal={closeModal} /> : null}

    </div>
  );
}



export default App;

function getCurrentDate() {
  var today = new Date();

  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '-' + mm + '-' + dd;
}

function sortByDate(sortedList,id, orderBy) {
  if (orderBy) {
    sortedList.sort(function (a, b) {

      return new Date(a[id]) - new Date(b[id]);

    });
  } else {
    sortedList.sort(function (a, b) {

      return new Date(b[id]) - new Date(a[id]);

    });
  }
  return sortedList;
}

function sortByPriority(sortedList,id, orderBy) {
  if (orderBy) {
    sortedList.sort(function (a, b) {
      return a[id] - b[id]
    })
  } else {
    sortedList.sort(function (a, b) {
      return b[id] - a[id]
    })
  }
  return sortedList;
}