import React from'react';
import AddTaskButton from './Components/AddTaskButton';
import TodoForm from './Components/TodoForm';
import TodoTabs from './Containers/TodoTabs';


const App = props => {
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(true);

    const toggleOpenForm = React.useCallback(() => {
        setIsFormOpen(!isFormOpen);
    }, [isFormOpen]);

    return (
        <div>
            {/* render tabs */}
            <TodoTabs />
            <AddTaskButton handleOpenForm={toggleOpenForm} />
            <TodoForm 
                handleClose={toggleOpenForm}
                isFormOpen={isFormOpen}
                isEditMode={isEditMode}
            />
        </div>
    )
};

export default App;