import React from "react";
import { enumState, hasValue, enumClick } from "../../utils/constants";
import { Button } from "react-bootstrap";
import {FaPen,FaTrash} from 'react-icons/fa'

const filterAndAttachRow = (header, innerItem, search) => {
    let strData = (header.type === "date" ?
        new Date(innerItem[header.field]).toLocaleDateString() :
        innerItem[header.field]);

    if (header.filterable && hasValue(search) && hasValue(strData)) {
        const start = strData.toLowerCase().indexOf(search.toLowerCase());
        const middle = search.length;
        const end = start + middle;
        if (start > -1) {
            strData = <>
                <span>{strData.substr(0, start)}</span>
                <span className="higlight">{strData.substr(start, middle)}</span>
                <span>{strData.substr(end)}</span>
            </>;
        }
    }

    return strData;
};

const Grid = (props) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {props.gridColumns.map((header, headerIndex) => {
                            return !header.hidden ? <th key={`grid-header-${headerIndex}`}
                                onClick={() => header.sortable ? props.onSort(header.field, header.type) : null}>
                                <span>{header.title}</span>
                                {header.sortable ? <span className={props.setArrow(header.field)}></span> : <></>}
                            </th> : null
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.tasksList).map((item) => {
                        return props.tasksList[item].map((innerItem, innerIndex) => {
                            return (
                                <React.Fragment key={`fragment-${innerItem.taskId}`}>
                                    {item !== undefined && innerIndex === 0 && props.groupBy && (
                                        <tr className="grouping-headers" >
                                            <td colSpan={props.gridColumns.filter(item => item.hidden !== true).length}>
                                                {props.groupBy && props.gridColumns.filter(item => item.field === props.groupBy)[0].type === "date"
                                                    ? new Date(item).toLocaleDateString()
                                                    : item}
                                            </td>
                                        </tr>
                                    )}
                                    <tr className={(innerItem.state === enumState.Done) && props.tabName==='All' ? "strikeout" : ""}
                                        onClick={(event) => props.handleClick(event, innerItem, enumClick.View)}>
                                        {props.gridColumns.map((header, headerIndex) => {
                                            return !header.template ?
                                                (!header.hidden ? <td key={`grid-data-${headerIndex}-${innerIndex}`}>
                                                    {filterAndAttachRow(header, innerItem, props.filterVal)}
                                                </td> : <></>) : (
                                                    <td>                                                       
                                                            <React.Fragment key={`btn-${innerItem.taskId}`}>
                                                                 <span  onClick={(event) => props.handleClick(event, innerItem, enumClick.Edit)}><FaPen /></span> 
                                                                 <span className="p-l-8" onClick={(event) => props.handleClick(event, innerItem, enumClick.Delete)}><FaTrash className="color-red" /></span>                                                              
                                                                 {innerItem.state === enumState.Open &&                                                                 
                                                                
                                                                <Button  className="m-l-12" size="sm" variant="primary" onClick={(event) => props.handleClick(event, innerItem, enumClick.Done)}>
                                                                    Done
                                                             </Button>}
                                                               
                                                            </React.Fragment>
                                                            {!(innerItem.state === enumState.Open) && 
                                                              <Button  className= "m-l-12" size="sm" variant="primary" onClick={(event) => props.handleClick(event, innerItem, enumClick.ReOpen)}>
                                                              Re-open
                                                                  </Button>
                                                            }
                                                            
                                                       
                                                              
                                                            
                                                    </td>
                                                )
                                        })}
                                    </tr>
                                </React.Fragment>
                            );
                        });
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Grid;