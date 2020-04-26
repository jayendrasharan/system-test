import React, { Fragment } from 'react'
import {uniqId} from '../../constants/index';
import {Tabledatarow} from './Tablebodyrow';


export const Tablebody = ({rowData,tableAction,disableButtons,isSearch}) => {
    let rowKeys;
    if (rowData.length > 0){
        rowKeys = Object.keys(rowData[0]);
        rowKeys.pop();
        rowKeys.push("node");
    }
    console.log(rowKeys,"rowKEYS");
    return (
        <tbody>
        {rowData && rowData.map(
            (row,ind) => (   
                <Tabledatarow 
                    rowElement={row} 
                    rowkeys={rowKeys}
                    tableAction={tableAction}
                    key={uniqId}
                    rowInd={ind}
                    disableButtons={disableButtons}
                    isSearch={isSearch}
                 />
            )) 
        }
    </tbody>
    )
}
