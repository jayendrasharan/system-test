import React, { useState, useEffect } from 'react'
import './taskBar.css';
import TodoModal from '../../TodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


function TaskBar() {
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
        <div className="footer">
            <button className="modal-toggle-button"
                onClick={toggleModal}
            > Add Todo <FontAwesomeIcon icon={faPlusCircle} onClick={toggleModal} /></button>
            {isModalOpen ? <TodoModal isModalOpen={isModalOpen} /> : <></>}
        </div>
    )
}

export default TaskBar;
