import React, { useState, useEffect } from 'react';
import { columnOptions } from '../../config';
import './searchBar.css';
import { useDispatch, useSelector } from "react-redux";


function SearchBar() {
    const [searchKey, setsearchKey] = useState('');
    const [groupBy, setGroupBy] = useState(null);
    const dispatch = useDispatch();

    const groupByKey = useSelector(({ TODO }) => TODO[TODO.currentTab].groupBy);

    useEffect(() => {
        setGroupBy(groupByKey)
    }, [groupByKey])

    useEffect(() => {
        dispatch(
            {
                type: 'UPDATE_SEARCH_KEY',
                payload: searchKey
            }
        );
    }, [searchKey]);

    useEffect(() => {
        dispatch(
            {
                type: 'UPDATE_GROUP_BY',
                payload: groupBy
            }
        );
    }, [groupBy]);

    return (
        <span className="filter-bar">
            <div className="search-bar">
                <input type="text" onChange={(e) => setsearchKey(e.target.value)} name="searchKey " placeholder="Search Todo" />
            </div>
            <span className='groupBy'>
                <select onChange={e => setGroupBy(e.target.value)} value={groupByKey === null ? 'none' : groupByKey}>
                    <option key={0} value="none" default={true}>none</option>
                    {
                        columnOptions ? columnOptions.map((column, index) => {
                            return column.groupBy ? <option key={index} value={column.name}>{column.name}</option> : null;
                        }) : null
                    }

                </select>
            </span>
        </span>
    )
}

export default SearchBar
