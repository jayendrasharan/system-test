import React, {useState} from 'react';
import AddTodoButton from '../../components/add-todo-button/add-todo-button';
import './dashboard.css';
import FormModal from '../../components/form-modal/form-modal';
import TodoTabs from '../../components/tabs/tabs';
import {connect} from 'react-redux';
import SearchBox from '../../components/search-box/search-box';
import {addTodos, searchTodoText} from '../../redux/actions';
import * as configs from '../../utils/config';

const Dashboard  = ({onFormSubmit,onSearchText}) => {
    const [show, setShow] = useState(false)

    const handleOnShow = () => setShow(true)
    const handleOnClose = () => setShow(false);
    
    const [todoState, setTodoState] = useState({
        summary: '',
        description: '',
        priority: 'None',
        dueDate: ''
    })
   
    const handleSubmit = () => {
        if (configs.validate(todoState)) {
            return
         }
        console.log(todoState);
        if (window.confirm("Do you want to add data")) {
            handleOnClose();
            onFormSubmit(todoState)
            setTodoState({ summary: '', description: '', priority: 'None', dueDate: '' })
        }
    }

    const onChangeValue = (itemkey, itemvalue) => {
        setTodoState({ ...todoState, [itemkey]: itemvalue })    
    }

    const onSearchBoxChanges = (val) => {
            console.log(val)
            onSearchText(val);
    }

    return(
        <div>
            <SearchBox 
            placeholder= "Search Monsters"
            handleChange = {e => onSearchBoxChanges(e.target.value)}
            />
            <TodoTabs />
            <FormModal 
            show={show}
            handleOnClose={handleOnClose}
            onChangeValue={onChangeValue}
            handleSubmit={handleSubmit}
            todoState={todoState}
            btnText = 'Save'
            />
            <AddTodoButton
            show={handleOnShow}
            />
        </div>

    )
}


    const mapStateToProps = state => ({
        todos: state.todos,
    })
    
    const mapDispatchToProps = dispatch => ({
        onFormSubmit: todoState => dispatch(addTodos(todoState)),
        onSearchText: text => dispatch(searchTodoText(text))
    })

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);