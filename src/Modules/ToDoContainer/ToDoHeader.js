import React from 'react';
import { columnOptions } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";

export default function ToDoHeader() {
    const currentTab = useSelector(({ TODO }) => TODO.currentTab);
    const sortColumn = useSelector(({ TODO }) => TODO[currentTab].sortColumn);
    const sortOrder = useSelector(({ TODO }) => TODO[currentTab].sortOrder);


    const dispatch = useDispatch();

    const handleSort = (column) => {
        if (sortOrder === '' && sortColumn === '') {
            dispatch({
                type: 'UPDATE_SORT_BY',
                payload: { sortBy: { sortColumn: column.name, sortOrder: 'asc' } }
            }
            );
        } else if (sortColumn === column.name) {
            dispatch({
                type: 'UPDATE_SORT_BY',
                payload: { sortBy: { sortColumn: column.name, sortOrder: (sortOrder === 'asc' ? 'desc' : 'asc') } }
            }
            );
        } else if (sortColumn !== column.name) {
            dispatch({
                type: 'UPDATE_SORT_BY',
                payload: { sortBy: { sortColumn: column.name, sortOrder: 'asc' } }
            }
            );
        }

    }
    const getSortIcon = (sortOrder) => {
        return sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortAlphaUp} /> : <FontAwesomeIcon icon={faSortAlphaDown} />;
    };


    const getSort = (column) => {
        if (sortColumn && sortColumn === column.name) return <th name={column.name} onClick={() => handleSort(column)}>{column.label}{getSortIcon(sortOrder)}</th>

        return <th onClick={() => handleSort(column)}>{column.label}</th>;
    }
    return <>
        <thead>
            <tr>
                {columnOptions.map((column) => {
                    return column.showHeader ? (column.allowSort ? getSort(column) : <th >{column.label}</th>) : <></>

                })}
            </tr>
        </thead>

    </>;
}