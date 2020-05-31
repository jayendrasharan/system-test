import React from 'react'
import { Link } from 'react-router-dom';

const Tabs = () => {

    const [activeTab, setActiveTab] = React.useState("alltasks")

    const handleNavClick = (item) => {
        setActiveTab(item);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse mg-left">
                    <ul className="navbar-nav">
                        <li className={activeTab === "alltasks" ? "nav-item active" : "nav-item"} onClick={() => handleNavClick("alltasks")}>
                            <Link className="nav-link" to="/alltasks">All Tasks</Link>
                        </li>
                        <li className={activeTab === "completed" ? "nav-item active" : "nav-item"} onClick={() => handleNavClick("completed")}>
                            <Link className="nav-link" to="/completedtasks">Completed Tasks</Link>
                        </li>
                        <li className={activeTab === "pending" ? "nav-item active" : "nav-item"} onClick={() => handleNavClick("pending")}>
                            <Link className="nav-link" to="/pendingtasks">Pending Tasks</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Tabs