import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from './Modal';
import { addTodo, editTodo, toggleModal, confirmDelete, loader } from '../../actions';
import { priorities } from '../../constants';

const TodoForm = (props) => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const [todo, setTodo] = useState(todos.modal.todo);

    const updateTodo = (name, event) => setTodo({
        ...todo,
        [name]: event.target.value
    });
    const onCancel = () => setTodo(intialState)

    const onSave = () => {
        dispatch(loader());
        setTimeout(()=>{
            if(todos.modal.isEdit) {
                dispatch(editTodo(todo))
            } else {
                dispatch(addTodo(todo))
            } 
        }, 1000);               
    }

    const onDelete = (flag) => {
        if(flag) {
            dispatch(confirmDelete(todo));
        }
        dispatch(toggleModal());
    }

    const close = () => dispatch(toggleModal())

    return (
        <Modal
            close={close}
            onSave={onSave}
            onCancel={onCancel}
            title={todos.modal.title}
            hideFooter={todos.modal.isReadOnly}
        >
            {
                todos.modal.isDeleteModal && <React.Fragment>
                    <button type="button" className="btn btn-danger mr-2" onClick={() => onDelete(true)}>Yes</button>
                    <button type="button" className="btn btn-primary" onClick={() => onDelete(false)}>No</button>
                </React.Fragment>
            }
            {
                !todos.modal.isDeleteModal && <form style={{ pointerEvents: todos.modal.isReadOnly ? 'none': 'auto' }}>
                <div className="form-group row">
                    <label for="summary" className="col-sm-2 col-form-label">Summary</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="summary" value={todo.title} onChange={(e) => updateTodo('title', e)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="desc" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="desc" rows="3" value={todo.description} onChange={(e) => updateTodo('description', e)}></textarea>
                    </div>
                </div>
                <div className="row flex justify-content-between">
                    <div className="form-group col-6 flex">
                        <label for="Priority" className="col-form-label mr-2 col-sm-4 pl-0">Priority</label>
                        <select className="form-control" id="Priority" value={todo.priority} onChange={(e) => updateTodo('priority', e)}>
                           {
                               priorities.map((priority) => <option>{priority}</option>)
                           }
                        </select>
                    </div>
                    <div className="form-group col-6 flex pl-0">
                        <label for="Duedate" className="col-form-label col-sm-4 pr-0">Due date</label>
                        <input type="date" value={todo.dueDate} onChange={(e) => updateTodo('dueDate', e)} />
                    </div>
                </div>
                { todos.modal.isReadOnly &&  <div className="row flex justify-content-between">
                    <div className="form-group col-12 flex">
                        <label for="Priority" className="col-form-label mr-2 col-sm-2 pl-0">Created on</label>
                        <label for="Priority" className="col-form-label col-sm-10 mr-2 pl-0">{todo.createdAt.toString()}</label>
                    </div>
                    <div className="form-group col-12 flex pl-0">
                        <label for="status" className="col-form-label col-sm-2 pr-0">Status</label>
                        <label for="status" className="col-form-label col-sm-10 pr-0">{todo.currentState} </label>
                    </div>
                </div> }
            </form> }
        </Modal>
    )
}

export default TodoForm;