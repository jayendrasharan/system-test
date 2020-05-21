import React from 'react';
import classes from './navbar.module.scss'
import { Nav } from 'react-bootstrap';

const Navbar = (props) => {
    return (
        <div className={classes.main_div}>
            <div>
                <label style={{marginRight:10}}>Search</label>
                <input className="form-control" onChange={(e) => props.search(e.target.value)} />
            </div>
        </div>
    )
}


export default Navbar