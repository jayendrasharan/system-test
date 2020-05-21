import React, { useState, useEffect } from 'react';
import classes from './table.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import * as actions from '../../../store/actions/index'

function Table(props) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState('asc')
    const [data, setData] = useState([])

    useEffect(() => {
        const search_task = props.data.filter(element => element.summary.includes(props.search_ele.toLowerCase()));
        setData(search_task)
    }, [props.data, props.search_ele]);

    useEffect(() => {
        setOrder(0)
        handleSort(props.groupel)

    }, [props.groupel]);


    const handleSort = col => {
        (order === 'asc') ? setOrder('desc') : setOrder('asc')
        let order_local = order === 'asc' ? 'desc' : 'asc'
        let tasklist = []
        switch (col) {
            case 'summary':
                if (order_local === 'asc') {
                    data.sort(function (a, b) {
                        return (a.summary < b.summary) ? -1 : ((b.summary > a.summary) ? -1 : 0);
                    });
                }
                else {
                    data.sort(function (a, b) {
                        return (a.summary > b.summary) ? -1 : ((b.summary < a.summary) ? 1 : 0);
                    });
                }
                dispatch(actions.onupdate_data(data))
                break;
            case 'priority':
                if (order_local === 'asc') {
                    tasklist = [
                        ...data.filter(task => task.priority === 'None'),
                        ...data.filter(task => task.priority === 'Low'),
                        ...data.filter(task => task.priority === 'Medium'),
                        ...data.filter(task => task.priority === 'High'),
                    ]
                } else {
                    tasklist = [
                        ...data.filter(task => task.priority === 'High'),
                        ...data.filter(task => task.priority === 'Medium'),
                        ...data.filter(task => task.priority === 'Low'),
                        ...data.filter(task => task.priority === 'None'),
                    ]
                }
                setData(tasklist)
                dispatch(actions.onupdate_data(tasklist))
                break;
            case 'createdon':
                if (order_local === 'asc') {
                    data.sort(function (a, b) {
                        return (a.created_date < b.created_date) ? -1 : ((b.created_date > a.created_date) ? -1 : 0);
                    });
                }
                else {
                    data.sort(function (a, b) {
                        return (a.created_date > b.created_date) ? -1 : ((b.created_date < a.created_date) ? 1 : 0);
                    });
                }
                dispatch(actions.onupdate_data(data))
                break;
            case 'due_date':
                tasklist = order_local === 'asc'
                    ? data.sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
                    : data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                setData(tasklist);
                dispatch(actions.onupdate_data(tasklist))
                break;
        }
    }

    let group_name = ''
    const set_sub_group = (value) => {
        if (group_name !== value) {
            group_name = value
            return true
        }
        else {
            return false
        }
    }


    const row_data = data.map((row_data) => (
        row_data.isComplete === props.isComplete || props.isComplete === "all" ?
            <tbody>
                {(props.groupel !== '' && set_sub_group(row_data[props.groupel])) ?
                    <tr scope="row" >
                        <td className={classes.group_row}>
                            {row_data[props.groupel]}
                        </td>
                    </tr> : null}
                <tr
                    style={{
                        backgroundColor: row_data.isComplete ? 'lightGreen' : 'white'
                    }}>
                    <td>{row_data.summary}</td>
                    <td>{row_data.priority}</td>
                    <td>{row_data.created_date}</td>
                    <td>{row_data.due_date}</td>
                    <td>
                        <FontAwesomeIcon icon={faEdit} onClick={() => props.clicked('edit', row_data.id)}
                            className={classes.icon_align} />
                        <FontAwesomeIcon onClick={() => props.clicked('delete', row_data.id)}
                            icon={faTrash}
                            className={classes.icon_align} />
                        {!row_data.isComplete ?
                            <Button onClick={() => props.clicked('done', row_data.id)}
                                variant="success" size="sm">Done</Button> :
                            <Button onClick={() => props.clicked('re-open', row_data.id)}
                                variant="danger" size="sm">Re-open</Button>}
                    </td>
                </tr>
            </tbody>
            : null
    ))


    return (
        props.data.length === 0 ? <div className={classes.no_task}>No Task, Please add the task using '+' button</div> :
            <table class="table" style={{ marginTop: 50 }}>
                <thead>
                    <tr style={{ backgroundColor: '#ccc' }}>
                        <th className={classes.header} scope="col" onClick={() => handleSort('summary')} >Summary</th>
                        <th className={classes.header} scope="col" onClick={() => handleSort('priority')}>Priority</th>
                        <th className={classes.header} scope="col" onClick={() => handleSort('createdon')}>Created On</th>
                        <th className={classes.header} scope="col" onClick={() => handleSort('due_date')}>Due Date</th>
                        <th className={classes.header} scope="col" >Actions</th>
                    </tr>
                </thead>
                {row_data}
            </table>
    )
}

export default Table