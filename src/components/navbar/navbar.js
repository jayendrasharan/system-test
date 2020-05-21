import React from 'react';
import classes from './navbar.module.scss'
import { Nav, Button } from 'react-bootstrap';

const Navbar = (props) => {
    return (
        <div className={classes.main_div}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: 10 }}>Search</label>
                <input className="form-control" onChange={(e) => props.search(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="outline-dark"
                    style={{ marginRight: 10, marginBottom: 12 }}
                    onClick={props.reset}>
                    Reset
                        </Button>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <select
                            value={props.groupel}
                            style={{ width: 150 }}
                            onChange={(e) => props.update_groupel(e.target.value)}
                            className="form-control">
                            <option value="">Group By</option>
                            <option value="summary">Summary</option>
                            <option value="priority">Priority</option>
                            <option value="due_date">Due Date</option>
                            <option value="createdon">Created On</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar