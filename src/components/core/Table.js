import React, { useState, useEffect } from 'react';
import { Pencil, Remove } from './Icons';

const Table = ({ columns, data = [], actions, onActionClick, searchKeyword='', groupBy='' }) => {
    console.log(data)
    const [rows, setRows] = useState({ '': data});
    const [sortBy, setSortBy] = useState('ASC');
    const defaultSort = (key) => rows.sort((a,b)=> {
        let value1 = a[key].toUpperCase(),
        value2 = b[key].toUpperCase();
        if(sortBy==='ASC') {
            return value1 == value2 ? 0 : value1 > value2 ? 1 : -1;
        } else {
            return value1 == value2 ? 0 : value1 < value2 ? 1 : -1;
        }        
    }) 

    const manipulateData = () => {
        let results = data;
        if(searchKeyword && searchKeyword!='') {
            let fielsToSearch = columns.filter((column)=> column.allowSearch).map((column)=> column.apiKey);
            if(fielsToSearch.length>0) {
                results = results.filter((row) => fielsToSearch.some((field)=> row[field].includes(searchKeyword)))
            }            
        }
        results = results.reduce((acc, todo) => {
            let key = todo[groupBy] || '';
            if (!acc[key]) acc[key] = [];
            acc[key].push(todo);
            return acc;
        }, {})
        setRows(results);
    }

    useEffect(()=>{ manipulateData(data) }, [searchKeyword, data])

    const sortFn = (column)=>{
        let sort = sortBy === 'ASC' ? 'DEC' : 'ASC';
        setSortBy(sort)
        if(column.allowSort) {
            let sortedRows = column.sortFn ? column.sortFn(rows, sort) : defaultSort(column.apiKey);
            setRows(sortedRows);
        }
    }

    return (<table className="table table-bordered">
    <thead>       
      <tr>
        {
            columns.map((column)=> {
                if(!column.isHidden) {
                    return <th key={column.name+'head'} scope="col" onClick={()=> sortFn(column)}>{column.name}</th>
                }
                return null;
            })            
        }
        { actions && <th key={'actions'} scope="col">Actions</th> }
      </tr>
    </thead>
    <tbody>
        {
            Object.keys(rows).map((row)=>{
                return (<React.Fragment>
                { row!='' && <tr key={row}><td colspan="5">{row}</td></tr> }
                { rows[row].map((todo)=> {
                    return (<tr className={todo.currentState ? 'red-bg' : 'green-bg'} key={todo.title+todo.id} onClick={() => onActionClick('VIEW', todo)}>
                        {
                            columns.map((column)=>{
                                if(!column.isHidden) {
                                    let value  = todo[column.apiKey]
                                    if(typeof value !== 'string') {
                                        return <td key={column.apiKey}>{value.toJSON()}</td>
                                    }
                                    return <td  key={column.apiKey}>
                                        { searchKeyword!='' && value.includes(searchKeyword) ? <mark> {value} </mark>:  value }
                                    </td>   
                                }                        
                            })
                        }
                        { actions && <td onClick={(e)=>e.stopPropagation()} key={'Action'+todo.id}>
                            <div className="flex align-items-baseline">
                                { 
                                    actions.map((action)=>{
                                        if(action.type==='EDIT') {
                                            return <div className="pr-4" key="edit" onClick={() => onActionClick(action.type, todo)}> <Pencil/> </div>
                                        } else if(action.type==='DELETE') {
                                            return <div className="pr-4" key="delete" onClick={() => onActionClick(action.type, todo)}> <Remove /> </div>
                                        } else {
                                            return <button key="toggle" type="button" className="btn btn-info" onClick={() => onActionClick(action.type, todo)}>{ todo.currentState ? 'Done' : 'Re-open' }</button>
                                        }
                                    })                        
                                }   
                            </div>
                        </td> }
                    </tr>)
                })}</React.Fragment>)
            })
        }
              
    </tbody>
  </table>)
}

export default Table;