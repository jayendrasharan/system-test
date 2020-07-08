import React, { useReducer } from'react';
import AddTaskButton from './Components/AddTaskButton';
import TodoForm from './Components/TodoForm';
import TodoTabs from './Containers/TodoTabs';
import Alert from './Components/Alert';
import { useSelector, useDispatch } from 'react-redux';
import InputSearchBox from './Components/InputSearchBox';

import * as todoActionCreators from './store/actionCreators/todoActions';
import CustomBackdrop from './Components/Backdrop';

const App = props => {
    // const [isFormOpen, setIsFormOpen] = React.useState(false);
    const {isFormOpen} = useSelector(state => state.todos);
    const dispatch = useDispatch();

    // const [isEditMode, setIsEditMode] = React.useState(true);
    const toggleOpenForm = () => dispatch(todoActionCreators.openTodoForm(null, true));

    const handleSearch = value =>  dispatch(todoActionCreators.searchTodoItems(value));

    return (
        <div>
            {/* render tabs */}
            <InputSearchBox handleSearch={handleSearch}/>
            <TodoTabs />
            <AddTaskButton handleOpenForm={toggleOpenForm} />
            <TodoForm 
                handleClose={toggleOpenForm}
                isFormOpen={isFormOpen}
                // isEditMode={isEditMode}
            />
            <Alert />
            <CustomBackdrop />
        </div>
    )
};

export default App;