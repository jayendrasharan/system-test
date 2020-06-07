import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import hotkeys from 'hotkeys-js';

import { searchTodo, groupBy } from '../../actions';
import { groups } from '../../constants';

const Search = () => {
    useEffect(()=>{
        hotkeys('shift+ctrl+F', () => document.querySelector('#summary').focus());
    }, [])
    const dispatch = useDispatch();
    const doSearch = (e) => dispatch(searchTodo(e.target.value))
    const groupBySearch = (e) => dispatch(groupBy(e.target.value))
    return (
        <div className="search flex  justify-content-between align-items-center pl-4">
            <input type="text" placeholder="search"  className="form-control col-2 flex" id="summary" onChange={doSearch} />
            <div className="form-group col-6 flex">
                <label for="Priority" className="col-form-label mr-2 col-4 pl-0 text-right">Group By:</label>
                <select className="form-control" id="Priority"  onChange={groupBySearch}>
                    { groups.map((group)=> <option key={group.value} value={group.value}> {group.name} </option>) }
                </select>
            </div>
        </div>
    )
}

export default Search;