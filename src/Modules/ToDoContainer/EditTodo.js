import React, { useState, useEffect } from 'react'
import TodoModal from '../../TodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function TaskBar({ todo }) {
    const [isModalOpen, setisModalOpen] = useState(false);
    const toggleModal = (e) => {
        e.preventDefault();
        setisModalOpen(!isModalOpen);
    }

    const escFunction = (keyDownEvent) => {
        if (keyDownEvent.keyCode === 27) {
            setisModalOpen(false)
        }
    }
    useEffect(() => {
        // append to root when the children of Modal are mounted
        document.addEventListener("keydown", escFunction, false);
        // do a cleanup
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);
    return (
        <>
            <FontAwesomeIcon icon={faEdit} onClick={toggleModal} />

            {isModalOpen ? <TodoModal isModalOpen={isModalOpen} isEditMode={true} todo={todo} /> : <></>}
        </>
    )
}

export default TaskBar;
