import React from 'react'
import { Link } from 'react-router-dom';

const Tabs = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse mg-left">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/alltasks">All Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/completedtasks">Completed Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pendingtasks">Pending Tasks</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Tabs