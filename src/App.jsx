import React, { useReducer } from'react';
import AddTaskButton from './Components/AddTaskButton';
import TodoForm from './Components/TodoForm';
import TodoTabs from './Containers/TodoTabs';
import Alert from './Components/Alert';
import { useSelector, useDispatch } from 'react-redux';
import InputSearchBox from './Components/InputSearchBox';

import * as todoActionCreators from './store/actionCreators/todoActions';
import CustomBackdrop from './Components/Backdrop';
import { Typography } from '@material-ui/core';

const App = props => {
    // const [isFormOpen, setIsFormOpen] = React.useState(false);
    const {isFormOpen, data, isDataLoaded} = useSelector(state => state.todos);
    const dispatch = useDispatch();

    // const [isEditMode, setIsEditMode] = React.useState(true);
    const toggleOpenForm = () => dispatch(todoActionCreators.openTodoForm(null, true));

    const handleSearch = value =>  dispatch(todoActionCreators.searchTodoItems(value));

    React.useEffect(() => {
        if(isDataLoaded === false){
            dispatch(todoActionCreators.getAllTodos())
        }
    }, []);

    if(isDataLoaded === false) return <CustomBackdrop />;
    return (
        <div>
            {/* render tabs */}
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <InputSearchBox handleSearch={handleSearch}/>
                <div style={{
                    fontSize: '1.2rem',
                    color: "#03a9f4",
                    fontWeight: "500",
                    lineHeight: '10px',
                    padding: '10px'
                }}>                        
                        <div>
                            My Tasks
                        </div>

                        <sub style={{
                            color: "grey",
                            fontSize: '0.8rem',
                        }}>
                            Better to do, than to say
                        </sub>
                </div>
            </div>
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