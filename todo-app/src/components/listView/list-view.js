import React, {useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import {IoMdCreate, IoMdTrash} from 'react-icons/io';
import FormModal from '../../components/form-modal/form-modal';
import {connect} from 'react-redux';

import {editTodos, removeTodos, todoStatusUpdate} from '../../redux/actions';
import ConfirmModal from '../confirm-model/confirm-model';
const ListView = ({todos, keyData, onEditFormSubmit, onDeleteTodo, onMarkAsCompleted}) => {
    const [show, setShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)
    const [removeTodo, setRemoveTodo] = useState({})

console.log('keyData', keyData)
    const handleOnShow = () => setShow(true)
    const handleOnClose = () => setShow(false);
    const handleConfirmModalOpen = () => setConfirmShow(true);

    const handleConfirmModalClose = () => setConfirmShow(false);
    const [todoState, setTodoState] = useState({
        summary: '',
        description: '',
        priority: 'None',
        dueDate: ''
    })


   
    const handleSubmit = () => {
    
        if (window.confirm("Do you want to add data")) {
            handleOnClose();
            onEditFormSubmit(todoState)
            setTodoState({ summary: '', description: '', priority: 'None', dueDate: '' })
        }
    }

    const handleYes =() => {
        onDeleteTodo(removeTodo)
        handleConfirmModalClose();
    }

    const onChangeValue = (itemkey, itemvalue) => {
        setTodoState({ ...todoState, [itemkey]: itemvalue })    
    }

    const rowStyle2 = (row) => {
        const style = {};
        if (row.isCompleted === true) {
          style.backgroundColor = '#c8e6c9';
        } else {
          style.backgroundColor = '#ffffff';
        }
        return style;
      };

      const onEditClicked = (todo) => {
        setTodoState(todo)
        handleOnShow()
      }

      const onDeleteClicked = (todo) => {
        handleConfirmModalOpen()
        setRemoveTodo(todo);
      }

      const onDoneClicked =(todo) => {
        onMarkAsCompleted(todo)
      }

      const filteredTodos = () => {
            
        if(keyData === 'pending') {
            return todos.filter(todo => todo.isCompleted === false);
        } else if(keyData === 'completed') {
        return todos.filter(todo => todo.isCompleted === true);
        }
          return todos;
      }

const columns = [{
        dataField: 'summary',
        text: 'Summary',
        sort: true
    }, {
        dataField: 'priority',
        text: 'Priority',
        sort: true
    },{
        dataField: 'createdAt',
        text: 'Created On',
        sort: true
    }, {
        dataField: 'dueDate',
        text: 'Due Date',
        sort: true
    }, {
        dataField: '',
        text: 'Actions',
        formatter: (cell, row) => {
            let btnName = row.isCompleted ? 'Re-Open': 'Done'; 
            return (
              <div>
                  <IoMdCreate onClick={() => onEditClicked(row)}/>
                  <IoMdTrash onClick={() => onDeleteClicked(row)}/>
                  <Button className="primary"
                  onClick={()=> onDoneClicked(row)}
                  > {btnName}</Button>
              </div>
            );
          }
        
    },
];



return (
    <div>
           <BootstrapTable keyField='id' 
           data={ filteredTodos() } 
           columns={ columns } 
           key={columns.dataField}
           rowStyle={ rowStyle2 }
           />
             <FormModal 
             show={show}
             handleOnClose={handleOnClose}
             onChangeValue={onChangeValue}
             handleSubmit={handleSubmit}
             todoState={todoState}
             btnText = 'Edit'
            />
            <ConfirmModal 
            show={confirmShow}
            handleClose={handleConfirmModalClose}
            handleYes = {handleYes}/>
        </div>
    )
}


const mapStateToProps = state => ({
    todos: state.todos,
})


const mapDispatchToProps = dispatch => ({
    onEditFormSubmit: todoState => dispatch(editTodos(todoState)),
    onDeleteTodo: todoState => dispatch(removeTodos(todoState)),
    onMarkAsCompleted: todoState => dispatch(todoStatusUpdate(todoState))
})


export default connect(mapStateToProps,mapDispatchToProps)(ListView);
