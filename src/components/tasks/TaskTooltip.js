import React, { useState, useRef } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const TaskTooltip = ({
    getTooltipContent,
    customClass
}) => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <div
                ref={target}
                className={`task-grid-check-col ${customClass || ''}`}
                onClick={(e) => { e.stopPropagation(); setShow(!show)}}
            >
                <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip
                        id="task-tooltip"
                        style={{
                            backgroundColor: '#FFF',
                        }}
                        {...props}
                    >
                        {getTooltipContent()}
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}

export default TaskTooltip;

