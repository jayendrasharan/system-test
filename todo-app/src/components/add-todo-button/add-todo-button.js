import React  from 'react';
import {IoIosAddCircle} from 'react-icons/io';

import './add-todo-button.css';

const AddTodoButton = ({show}) => {

    return (
        <div className="add-btn-cls">
        <IoIosAddCircle 
        onClick={show}
        />
        </div>
    )
}

export default AddTodoButton