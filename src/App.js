import "./App.css";
import React, { useState , useEffect } from "react";
import Button from "./components/Button/Button";
import Modal from "./components/Button/Modal/Modal";
import Form from "./components/Form/Form";
import Tabs from "./components/Tabs/Tabs";
import {useDispatch , useSelector} from 'react-redux'
import { deelteTodo, editTodo, onGroupDeleteTodo } from "./store/actions/index.action";
import Search from "./components/Search/Search";
import TabContent from "./components/TabContent/TabContent";
import DropDown from "./components/DropDown/DropDown";
import Loader from "./components/Loader/Loader";
const headerList = [{label:'Summary', value:'title'},{label:'Priority', value:'priority'},{label:'Created On', value:'createdAt'},{label:'Due Date', value:'dueDate'},{label:'Actions',value:'actions'}]
const tabList = [{label:'All tasks',value:'all'},{label:'Pending',value:'open'},{label:'Completed',value:'done'}]
function App() {
  const [showModal, setShowModal] = useState(false);
  const [todoList , setTodoList] = useState([]);
  const [statusFilter , setStatusFilter] = useState('all');
  const [searchString , setSearchString] = useState('');
  const [currentListView , setCurrentListView] = useState({});
  const [currentDropDownState , setCurrentDropDownState] = useState('');
  const [formMode , setFormMode] = useState('add')
  const [showDelete , setShowDelete] = useState(false)
  const [modalState , setModalState] =useState('')
  const [loading , setLoading] = useState(false)
  const [currentSort , setCurrentSort] = useState({label:'Summary',value:'title'})
  const [currentSortDirection , setCurrentSortDirection] = useState('ASC')
  const dispatch = useDispatch()
  const todos = useSelector((state) => {
    return state.todos;
  })

  useEffect(() => {
    const statusFilterX = todos.filter(x => {
      if(statusFilter == 'all'){
        return x
      }else {
        return x.currentState == statusFilter
      }
    })
    const searchFilter = statusFilterX.filter(x => {
        if(x.title.toLowerCase().indexOf(searchString.trim().toLowerCase()) != -1 || x.description.toLowerCase().indexOf(searchString.trim().toLowerCase()) != -1){
          return x
        }
    })

    const data = searchFilter.length > 0 ? searchFilter.slice().sort((a1,b1) => {
     
      if(currentSort.value != 'actions'){
        let comparison = 0;
        const a = a1[currentSort.value].toLowerCase()
        const b = b1[currentSort.value].toLowerCase()
        if(currentSortDirection == 'ASC'){
          if (a > b) {
            comparison = 1;
          } else if (a < b) {
            comparison = -1;
          }
          return comparison;
        }else {
          if (a < b) {
            comparison = 1;
          } else if (a > b) {
            comparison = -1;
          }
          return comparison;
        }
      }
    }) : []
    // console.log(data)
    setTodoList(data)
  }, [todos , statusFilter,searchString ,currentDropDownState ,currentSort ,currentSortDirection])

  const onClickTab = (tab) => {
       setStatusFilter(tab.value)
  }
  const onSearch = (event) => {
     setSearchString(event.target.value)
  }

  const onClickonList = (data , status) => {
      if(status == 'delete'){
         setShowDelete(true)
         setModalState(data)

      }else if(status == 'status'){
        setLoading(true)

         dispatch(editTodo({...data,currentState: data.currentState == 'open' ? 'done' :'open'})).then(x => {
          setLoading(false)

          })
      }else {
        setShowModal(true)
        setCurrentListView(data)
        setFormMode(status)
      }
     
  }
  const deleteRequest = (data) => {
    setLoading(true)
    dispatch(deelteTodo(data.createdAt)).then(() => {
       setLoading(false)
       setShowDelete(false)
       setModalState('')
    })
  }

  const onGroupDelete = (data) => {
      setLoading(true)
    dispatch(onGroupDeleteTodo(data)).then(() => {
     setLoading(false)
   })
  }

  const onChangeDropDown = (event) => {
    setCurrentDropDownState(event.target.value)
  }
  return (
    <>
     {loading ? <div style={{width:'100%',height:'100%',position:'absolute',zIndex:500}}><Loader /> </div>: null}

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <Form formMode={formMode} data={currentListView}  closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
       {showDelete && (
        <Modal closeModal={() => setShowModal(false)}>
          <h1>{modalState.title}</h1>
          <p>“Do you want to delete this task?”</p>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <button onClick={() => deleteRequest(modalState)} className="btn btn-danger">YES</button>
          <button onClick={() => {
            setShowDelete(false)
            setModalState('')
          }} className="btn btn-success">NO</button>
          </div>
        
        </Modal>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "100px",
          zIndex: 1,
        }}
      >
        <Button onClick={() => {
          setShowModal((status) => !status)
          setFormMode('add')
          setCurrentListView( {title:'',
          description:'',
          priority:'',
          dueDate:'',
          createdAt:'',
          currentState:''})

          }} />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}      >
      <Search value={setSearchString} search={onSearch} />
      <DropDown value={currentDropDownState} onChange={onChangeDropDown} />
      </div>
     
      <div>
        <Tabs onClick={onClickTab} tabs={tabList} />
        <TabContent onGroupDelete={onGroupDelete} groupBy={currentDropDownState} onSort={x => {
          setCurrentSort(x)
          if(currentSortDirection == 'ASC'){
            setCurrentSortDirection('DSC')
          }else{
            setCurrentSortDirection('ASC')
          }
          }} statusFilter={statusFilter} header={headerList} data={todoList} onClick={onClickonList} />
        {/* {JSON.stringify(todoList)} */}
      </div>
    </>
  );
}

export default App;
